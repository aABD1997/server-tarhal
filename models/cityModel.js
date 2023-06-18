const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  weather: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

const City = mongoose.model("City", citySchema);

module.exports = City;
