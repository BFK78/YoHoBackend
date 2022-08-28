const mongoose = require("mongoose");
const collection = require("../connect/collections");
const ObjectId = mongoose.Types.ObjectId;

const meetingSchema = mongoose.Schema({
  meetingId: {
    type: String,
  },
  meetingTopic: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Join",
  },
  timeZone: {
    type: String,
    required: true,
  },
  repeat: {
    type: String,
    required: true,
  },
  waitingRoom: {
    type: Boolean,
  },
  meetingLink: {
    type: String,
  },
  owner: {
    type: ObjectId,
    ref: collection.userCollection,
  },
});

module.exports = mongoose.model(collection.meetingCollection, meetingSchema);
