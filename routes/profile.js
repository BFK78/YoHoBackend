//Requiring Modules
const express = require("express");

const verifyToken = require("../middlewares/verify-token");
const {
  updateProfile,
  updatePin,
  getUser,
  updatePassword,
} = require("../controller/profile");

//Global variables
const router = express.Router();

//Assigning controller to the routes
router.route("/profile-update").post(updateProfile);
router.route("/create-pin").post(updatePin);
router.route("/get-user").get(getUser);
router.route("/update-password").post(verifyToken, updatePassword);

//Exporting the router
module.exports = router;
