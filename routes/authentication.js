//Requiring Modules
const express = require("express");

const verifyToken = require("../middlewares/verify-token");
const {
  registerUser,
  loginUser,
  sentOtp,
  verifyOtp,
  sendEmailOtp,
  verifyEmail,
} = require("../controller/authentication");

//Global variables
const router = express.Router();

//Assigning controller to the routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/sent-otp").post(sentOtp);
router.route("/verify-otp").post(verifyOtp);
router.route("/email-verification").post(sendEmailOtp);
router.route("/verify-email").post(verifyEmail);
router.route("/verify-token").post(verifyToken);

//Exporting the router
module.exports = router;
