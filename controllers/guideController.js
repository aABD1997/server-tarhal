const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;
const Guide = require("../models/guideModel");
const unlinkfile = require("../utils/unlinkFile");

// get all guides
const getAllGuides = async (req, res) => {
  try {
    const guides = await Guide.find().populate("city");

    res.status(200).json({ guides });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};


const getGuidesByCitytId = async (req, res) => {
  try {
    const cityId = req.params.id;

    const guides = await Guide.find({ city: cityId });

    if (guides.length > 0) {
      res.status(200).json({
        message: "guides retrieved successfully",
        guides: guides,
      });
    } else {
      res.status(404).json({ message: "guides by city id not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// get a guide by ID
const getGuideById = async (req, res) => {
  const guideId = req.params.id;

  try {
    const guide = await Guide.findById(guideId);

    if (!guide) {
      return res.status(404).json({ message: "Guide not found" });
    }

    res.status(200).json({ guide });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// create a new guide
const createGuide = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      description,
      phoneNumber,
      location,
      languages,
      drivingLicense,
      available,
      city,
      price
    } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const guide = new Guide({
      name,
      email,
      password: hashedPassword, // Save the hashed password
      description,
      phoneNumber,
      location,
      languages,
      drivingLicense: drivingLicense === "true",
      available: available === "true",
      price,
      city,
      image: req.file.filename,
    });

    const savedGuide = await guide.save();

    if (savedGuide) {
      // Generate JWT token
      const token = jwt.sign(
        { id: savedGuide._id, role: savedGuide.role },
        process.env.JWT_SECRET
      );

      res.status(201).json({
        message: "Guide created successfully",
        guide: savedGuide,
        role: savedGuide.role,
        id: savedGuide._id,
        token: token, // Include the token in the response
      });
    } else {
      res.status(500).json({ message: "Failed to create guide" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// update a guide by ID
const updateGuide = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      description,
      phoneNumber,
      location,
      languages,
      drivingLicense,
      available,
      city,
      price,
    } = req.body;

    const guideId = req.params.id;
    const guide = await Guide.findById(guideId);

    if (!guide) {
      return res.status(404).json({ message: "Guide not found" });
    }

    guide.name = name;
    guide.email = email;

    // Check if a new password is provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      guide.password = hashedPassword;
    }

    guide.description = description;
    guide.phoneNumber = phoneNumber;
    guide.location = location;
    guide.languages = languages;
    guide.drivingLicense = drivingLicense === "true";
    guide.available = available === "true";
    guide.price = price;
    guide.city = city;

    if (req.file.filename) {
      unlinkfile(guide.image);
      guide.image = req.file.filename;
    }

    const updatedGuide = await guide.save();

    res
      .status(200)
      .json({ message: "Guide updated successfully", guide: updatedGuide });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// delete a guide by ID
const deleteGuide = async (req, res) => {
  const guideId = req.params.id;

  try {
    const guide = await Guide.findByIdAndDelete(guideId);

    if (!guide) {
      return res.status(404).json({ message: "Guide not found" });
    }

    unlinkfile(guide.image); // Delete the associated file using the unlinkfile function

    res.status(200).json({ message: "Guide deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

module.exports = {
  getAllGuides,
  getGuideById,
  createGuide,
  updateGuide,
  deleteGuide,
  getGuidesByCitytId,
};
