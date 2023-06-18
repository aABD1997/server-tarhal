const mongoose = require("mongoose");

const touristSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  languages: {
    type: [String],
  },
  role: {
    type: String,
    default: "user",
  },
  image: {
    type: String,
  },
});

const Tourist = mongoose.model("Tourist", touristSchema);

module.exports = Tourist;
