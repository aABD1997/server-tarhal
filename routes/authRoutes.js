const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Authentication Routes
router.post("/login", authController.login);

module.exports = router;
