const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;
const Tourist = require("../models/touristModel");
const unlinkfile = require("../utils/unlinkFile");

// get all tourists
const getAllTourists = async (req, res) => {
  try {
    const tourists = await Tourist.find();

    res.status(200).json({ tourists });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// get a tourist by ID
const getTouristById = async (req, res) => {
  const touristId = req.params.id;

  try {
    const tourist = await Tourist.findById(touristId);

    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found" });
    }

    res.status(200).json({ tourist });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// create a new tourist
const createTourist = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phoneNumber,
    } = req.body;
    console.log(req.body);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const tourist = new Tourist({
      name,
      email,
      password: hashedPassword, // Save the hashed password
      phoneNumber,
    });
    

    const savedTourist = await tourist.save();
    console.log(savedTourist);

    if (savedTourist) {
      // Generate JWT token
      const token = jwt.sign(
        { touristId: savedTourist._id },
        process.env.JWT_SECRET
      );
      

      res.status(201).json({
        message: "Tourist created successfully",
        tourist: savedTourist,
        token: token,
      });
    } else {
      res.status(500).json({ message: "Failed to create tourist" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// update a tourist by ID
const updateTourist = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      description,
      phoneNumber,
      location,
      languages,
    } = req.body;

    const touristId = req.params.id;
    const tourist = await Tourist.findById(touristId);

    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found" });
    }

    tourist.name = name;
    tourist.email = email;

    // Check if a new password is provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      tourist.password = hashedPassword;
    }

    tourist.description = description;
    tourist.phoneNumber = phoneNumber;
    tourist.location = location;
    tourist.languages = languages;

    if (req.file.filename) {
      unlinkfile(tourist.image);
      tourist.image = req.file.filename;
    }

    const updatedTourist = await tourist.save();

    res.status(200).json({
      message: "Tourist updated successfully",
      tourist: updatedTourist,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// delete a tourist by ID
const deleteTourist = async (req, res) => {
  const touristId = req.params.id;

  try {
    const tourist = await Tourist.findByIdAndDelete(touristId);

    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found" });
    }

    unlinkfile(tourist.image); // Delete the associated file using the unlinkfile function

    res.status(200).json({ message: "Tourist deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

module.exports = {
  getAllTourists,
  getTouristById,
  createTourist,
  updateTourist,
  deleteTourist,
};
 