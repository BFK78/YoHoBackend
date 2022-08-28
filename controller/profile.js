//Requiring Modules
const { asyncWrapper } = require("../middlewares/async-wrapper");
const userModel = require("../models/userSchema");

const bcrypt = require("bcryptjs");

module.exports = {
  //Updating UserModel
  updateProfile: asyncWrapper(async (req, res) => {
    console.log(req.body);
    const userData = req.body;
    const user = await userModel.findOne({
      number: userData.number,
    });
    if (user) {
      res.status(200).json({
        status: false,
        message: "Mobile number exist",
      });
    } else {
      await userModel.updateOne(
        {
          _id: req.body._id,
        },
        {
          fullName: userData.fullName,
          nickName: userData.nickName,
          dob: userData.dob,
          number: userData.number,
          image: userData.image,
        }
      );

      res.status(200).json({
        status: true,
        message: "Updated Successfully",
      });
    }
  }),
  updatePin: asyncWrapper(async (req, res) => {
    console.log(req.body);
    const pin = req.body.pin;
    const updatePin = await userModel.updateOne(
      {
        _id: req.body.userId,
      },
      {
        pinCode: pin,
      }
    );
    res.status(200).json({
      status: true,
      message: "Updated Successfully",
    });
  }),
  getUser: asyncWrapper(async (req, res) => {
    console.log(req.query);
    const email = req.query.email;
    const user = await userModel.findOne({
      email: email,
    });
    if (user) {
      res.status(200).json({
        status: true,
        message: "Successfully retrieved the user",
        data: {
          user: user,
          userId: user._id,
        },
      });
    } else {
      res.status(400).json({
        status: false,
        message: "User dosen't exist",
      });
    }
  }),
  updatePassword: asyncWrapper(async (req, res) => {
    const password = req.body.password;
    const userId = req.body.userId;

    //hasing passsowrd
    const salt = await bcrypt.genSalt(10);
    const ecncryptPassword = await bcrypt.hash(password, salt);
    await userModel.updateOne(
      {
        _id: userId,
      },
      {
        $set: {
          password: ecncryptPassword,
        },
      }
    );
    res.status(200).json({
      status: true,
      message: "Password Updated Successfully",
    });
  }),
};
