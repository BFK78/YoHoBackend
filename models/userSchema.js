//Requiring Modules
const mongoose = require("mongoose");
const collection = require("../connect/collections");

//Creating Schema for the user
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    min: 8,
    max: 255,
    required: true,
  },
  fullName: {
    type: String,
    min: 8,
    max: 255,
  },
  nickName: {
    type: String,
    min: 5,
    max: 255,
  },
  dob: {
    type: String,
  },
  number: {
    type: String,
    min: 10,
    max: 15,
  },
  image: {
    type: String, //required is false since user can update it later creating the account
  },
  pinCode: {
    type: String,
  },
});

//Exporting the user model
module.exports = mongoose.model(collection.userCollection, userSchema);
