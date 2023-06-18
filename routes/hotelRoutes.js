const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotelController");
const upload = require("../middleware/uploadMiddleware");

// GET all hotels
router.get("/", hotelController.getAllHotels);

// GET a single hotel by ID
router.get("/:id", hotelController.getHotelById);

router.get("/city/:id", hotelController.getHotelsByCitytId);

// POST create a new hotel
router.post("/", upload.single("image"), hotelController.createHotel);

// PUT update a hotel by ID
router.put("/:id", upload.single("image"), hotelController.updateHotel);

// DELETE a hotel by ID
router.delete("/:id", hotelController.deleteHotel);

module.exports = router;
