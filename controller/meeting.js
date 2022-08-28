//Requiring Modules
const meetingModel = require("../models/meetingSchema");
const { asyncWrapper } = require("../middlewares/async-wrapper");

//Exporting Module
module.exports = {
  scheduleMeeting: asyncWrapper(async (req, res) => {
    const meeting = await meetingModel.create(req.body);
    console.log(meeting._id.toHexString());
    await meetingModel.updateOne(
      { _id: meeting._id._id },
      { $set: { meetingId: meeting._id.toHexString().substring(3, 12) } }
    );
    res.status(201).json({
      status: true,
      message: "Successfully scheduled meeting",
    });
  }),
  getAllCompletedMeeting: asyncWrapper(async (req, res) => {
    const completedMeetings = await meetingModel
      .find({
        status: "Completed",
      })
      .lean();
    res.status(200).json({
      status: true,
      message: "Successfully fetched data",
      data: completedMeetings,
    });
  }),
  getAllScheduledMeetings: asyncWrapper(async (req, res) => {
    const scheduledMeetings = await meetingModel
      .find({
        status: "Join",
      })
      .lean();

    res.status(200).json({
      status: true,
      message: "Successfully fetched data",
      data: scheduledMeetings,
    });
  }),
};
