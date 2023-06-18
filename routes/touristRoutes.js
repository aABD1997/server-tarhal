const express = require("express");
const router = express.Router();
const touristController = require("../controllers/touristController");
const upload = require("../middleware/uploadMiddleware")

// GET all tourists
router.get("/", touristController.getAllTourists);

// GET a single tourist by ID
router.get("/:id", touristController.getTouristById);

// POST create a new tourist
router.post("/",  touristController.createTourist);

// PUT update a tourist by ID
router.put("/:id", upload.single("image"), touristController.updateTourist);

// DELETE a tourist by ID
router.delete("/:id", touristController.deleteTourist);

module.exports = router;
