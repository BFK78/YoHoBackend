//Requiring modules
const userModel = require("../models/userSchema");
const otp = require("../util/otp-util");
const { asyncWrapper } = require("../middlewares/async-wrapper");
const { transporter, otp: randomOTP } = require("../util/email-otp");
const emailTemplate = require("../view/email-otp");
const otpModel = require("../models/OtpSchema");
const verifyToken = require("../middlewares/verify-token");

require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

//Exporting the controller
module.exports = {
  registerUser: asyncWrapper(async (req, res) => {
    console.log(req.body);
    const existingUser = await userModel.findOne({
      email: req.body.email,
    });

    console.log("reaching here", existingUser);

    //Checking the email exist or not.
    if (existingUser) {
      res.status(200).json({ status: false, message: "Email already exist." });
      return;
    }

    //Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = await userModel.create({
      email: req.body.email,
      password: hashedPassword,
    });

    res.status(201).json({
      status: true,
      message: "Account created successfully",
      data: { userId: user._id, token: null },
    });
  }),

  loginUser: asyncWrapper(async (req, res) => {
    console.log(req.body);
    const user = await userModel.findOne({
      email: req.body.email,
    });

    //Check if user exist
    if (!user) {
      res.status(200).json({ status: false, message: "Enter a valid email." });
      return;
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      res.status(200).json({
        status: false,
        message: "Incorrect Password",
      });
      return;
    }

    //Creating Token
    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.TOKEN_SECRET
    );

    res.header("auth-token", token).json({
      status: true,
      message: "Logined Successfully",
      data: {
        userId: user._id,
        token: token,
      },
    });
  }),

  sentOtp: asyncWrapper(async (req, res) => {
    const userId = req.body.userId;
    const user = await userModel.findOne({ _id: userId });
    await otp.doSms(user.number);
    res.status(200).json({
      status: true,
      message: "Otp sent successfully",
    });
  }),

  verifyOtp: asyncWrapper(async (req, res) => {
    const userId = req.body.userId;
    const code = req.body.otp;
    const user = await userModel.findOne({ _id: userId });
    const verify = await otp.otpVerify(user.number, code);

    //Verfting Otp
    if (verify.valid) {
      const token = jwt.sign(
        {
          _id: user._id,
        },
        process.env.TOKEN_SECRET
      );

      res.header("auth-token", token).json({
        status: true,
        message: "OTP-verified successfully",
        data: {
          token: token,
          userId: user._id,
          user: user,
        },
      });
    } else {
      res.status(200).json({
        status: false,
        message: "Entered the Wrong OTP",
      });
    }
  }),
  sendEmailOtp: asyncWrapper(async (req, res) => {
    const userId = req.body.userId;
    const user = await userModel.findOne({ _id: userId });
    const generatedOTP = randomOTP();
    await otpModel.create({
      userId: userId,
      otp: generatedOTP,
    });

    const mailOption = {
      to: user.email,
      title: "OTP for Verification is: ",
      html: emailTemplate(generatedOTP),
    };

    transporter.sendMail(mailOption, (err, info) => {
      if (err) {
        res.status(200).json({
          status: 400,
          message: "Some error happened: " + err.message.toString(),
        });
        console.log(err);
      } else {
        console.log("message Id", info.messageId);
        console.log("url", nodemailer.getTestMessageUrl(info));
        res.status(200).json({
          status: true,
          message: "Verification email sent successfully",
        });
      }
    });
  }),
  verifyEmail: asyncWrapper(async (req, res) => {
    const code = req.body.otp;
    const userId = req.body.userId;
    const user = await userModel.findOne({ _id: userId });

    const otpCollection = await otpModel
      .findOne({ userId: userId })
      .sort({ _id: -1 });

    console.log(otpCollection);

    if (otpCollection) {
      if (code == otpCollection.otp) {
        const token = jwt.sign(
          {
            _id: user._id,
          },
          process.env.TOKEN_SECRET
        );

        await otpModel.deleteOne({
          _id: otpCollection._id,
        });

        res.header("auth-token").json({
          status: true,
          message: "Successfully verified",
          data: {
            token: token,
            userId: user._id,
            user: user,
          },
        });
      } else {
        res.status(200).json({
          status: false,
          message: "Sorry incorrect OTP",
        });
      }
    } else {
      res.status(200).json({
        status: false,
        message: "OTP expired",
      });
    }
  }),

  verifyToken: asyncWrapper(async (req, res) => {
    const token = req.body.token;
    const verify = jwt.verify(token, process.env.TOKEN_SECRET);
    if (verify) {
      res.status(200).json({
        status: true,
        message: "Token verified successfully",
      });
    } else {
      res.status(400).json({
        status: false,
        message: "Invalid Token",
      });
    }
  }),
};
