//Creating schema for otp model
const mongoose = require("mongoose");
const collection = require("../connect/collections");
const ObjectId = mongoose.Types.ObjectId;

//Creating schema
const otpSchema = mongoose.Schema(
  {
    otp: {
      type: String,
      required: true,
    },
    userId: {
      type: ObjectId,
      ref: collection.userCollection,
    },
    expire_at: {
      type: Date,
      default: Date.now(),
      expires: 1800,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(collection.otpCollection, otpSchema);
