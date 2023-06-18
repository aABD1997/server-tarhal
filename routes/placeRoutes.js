const express = require("express");
const router = express.Router();
const placeController = require("../controllers/placeController");
const upload = require("../middleware/uploadMiddleware");
// GET all places
router.get("/", placeController.getAllPlaces);

// GET a single place by ID
router.get("/:id", placeController.getPlaceById);

// GET  places by city ID
router.get("/city/:id", placeController.getPlacesByCitytId);

// POST create a new place
router.post("/", upload.single("image"), placeController.createPlace);

// PUT update a place by ID
router.put("/:id", upload.single("image"), placeController.updatePlace);

// DELETE a place by ID
router.delete("/:id", placeController.deletePlace);

module.exports = router;
