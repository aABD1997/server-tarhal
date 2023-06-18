const asyncHandler = require("express-async-handler");
const Admin = require("../models/adminModel");
const Guide = require("../models/guideModel");
const Tourist = require("../models/touristModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    let user;

    // Check if the user is an admin
    user = await Admin.findOne({ email });
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const token = jwt.sign(
          { id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1y" }
        );
        return res.json({ token, info: user, userType: "admin" });
      }
    }

    // Check if the user is a guide
    user = await Guide.findOne({ email });
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const token = jwt.sign(
          { id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1y" }
        );
        return res.json({ token, info: user, userType: "guide" });
      }
    }

    // Check if the user is a tourist
    user = await Tourist.findOne({ email });
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const token = jwt.sign(
          { id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1y" }
        );
        return res.json({ token, info: user, userType: "tourist" });
      }
    }

    // If no user is found in any model
    return res.status(401).json({ message: "Invalid credentials" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = {
  login,
};
