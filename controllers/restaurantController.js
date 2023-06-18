const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;
const Restaurant = require("../models/restaurantModel");
const unlinkfile = require("../utils/unlinkFile");

// get all restaurants
const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().populate("city");

    res.status(200).json({ restaurants });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

const getRestaurantsByCitytId = async (req, res) => {
  try {
    const cityId = req.params.id;

    const restaurants = await Restaurant.find({ city: cityId });

    if (restaurants.length > 0) {
      res.status(200).json({
        message: "restaurants retrieved successfully",
        restaurants: restaurants,
      });
    } else {
      res.status(404).json({ message: "restaurants by city id not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// get a restaurant by ID
const getRestaurantById = async (req, res) => {
  const restaurantId = req.params.id;

  try {
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.status(200).json({ restaurant });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// create a new restaurant
const createRestaurant = async (req, res) => {
  try {
    const { name, description, location, city } = req.body;

    const restaurant = new Restaurant({
      name,
      description,
      location,
      city,
      image: req.file.filename,
    });

    const savedRestaurant = await restaurant.save();

    if (savedRestaurant) {
      res.status(201).json({
        message: "Restaurant created successfully",
        restaurant: savedRestaurant,
      });
    } else {
      res.status(500).json({ message: "Failed to create restaurant" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// update a restaurant by ID
const updateRestaurant = async (req, res) => {
  try {
    const { name, description, location, city } = req.body;

    const restaurantId = req.params.id;
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    restaurant.name = name;
    restaurant.description = description;
    restaurant.location = location;
    restaurant.city = city;

    if (req.file.filename) {
      unlinkfile(restaurant.image);
      restaurant.image = req.file.filename;
    }

    const updatedRestaurant = await restaurant.save();

    res.status(200).json({
      message: "Restaurant updated successfully",
      restaurant: updatedRestaurant,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// delete a restaurant by ID
const deleteRestaurant = async (req, res) => {
  const restaurantId = req.params.id;

  try {
    const restaurant = await Restaurant.findByIdAndDelete(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    unlinkfile(restaurant.image); // Delete the associated file using the unlinkfile function

    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

module.exports = {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  getRestaurantsByCitytId,
  deleteRestaurant,
};
