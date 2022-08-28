//Requiring Modules
const express = require("express");

const verifyToken = require("../middlewares/verify-token");
const {
  scheduleMeeting,
  getAllScheduledMeetings,
  getAllCompletedMeeting,
} = require("../controller/meeting");

//Global variables
const router = express.Router();

//Assigning controller to routes
router.route("/schedule-meeting").post(scheduleMeeting);
router.route("/scheduled-meeting").get(getAllScheduledMeetings);
router.route("/completed-meeting").get(getAllCompletedMeeting);

module.exports = router;
