const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");
const upload = require("../middleware/uploadMiddleware");

// GET all restaurants
router.get("/", restaurantController.getAllRestaurants);

// GET a single restaurant by ID
router.get("/:id", restaurantController.getRestaurantById);

router.get("/city/:id", restaurantController.getRestaurantsByCitytId);


// POST create a new restaurant
router.post("/", upload.single("image"), restaurantController.createRestaurant);

// PUT update a restaurant by ID
router.put(
  "/:id",
  upload.single("image"),
  restaurantController.updateRestaurant
);

// DELETE a restaurant by ID
router.delete("/:id", restaurantController.deleteRestaurant);

module.exports = router;
