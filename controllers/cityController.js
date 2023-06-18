const City = require("../models/cityModel");
const Guide = require("../models/guideModel");
const Hotel = require("../models/hotelModel");
const Place = require("../models/placeModel");
const Restaurant = require("../models/restaurantModel");
const unlinkfile = require("../utils/unlinkFile");

// get all cities
const getAllCities = async (req, res) => {
  try {
    const cities = await City.find();

    res.status(200).json({ cities });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// get a city by ID
const getCityById = async (req, res) => {
  const cityId = req.params.id;

  try {
    const city = await City.findById(cityId);
    const places = await Place.find({ city: cityId });
    const restraunts = await Restaurant.find({ city: cityId });
    const hotels = await Hotel.find({ city: cityId });
    const guides = await Guide.find({ city: cityId });

    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }

    res.status(200).json({ city, places, restraunts, hotels, guides });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// create a new city
const createCity = async (req, res) => {
  try {
    const { name, description, weather } = req.body;

    const city = new City({
      name,
      description,
      weather,
      image: req.file.filename,
    });

    const savedCity = await city.save();

    if (savedCity) {
      res.status(201).json({
        message: "City created successfully",
        city: savedCity,
      });
    } else {
      res.status(500).json({ message: "Failed to create city" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// update a city by ID
const updateCity = async (req, res) => {
  try {
    const { name, description, weather } = req.body;

    const cityId = req.params.id;
    const city = await City.findById(cityId);

    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }

    city.name = name;
    city.description = description;
    city.weather = weather;

    

    // Check if new images are provided
    if (req.files && req.files.length > 0) {
      // Remove the old images from the uploads directory

      unlinkfile(city.image);
      console.log("+++++++++++++++++++++++++++++")
      console.log(req.file.filename);
      // Update the images array with the new filenames
      city.image = req.file.filename;
    }

    const updatedCity = await city.save();

    res
      .status(200)
      .json({ message: "City updated successfully", city: updatedCity });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// delete a city by ID
const deleteCity = async (req, res) => {
  const cityId = req.params.id;

  try {
    const city = await City.findByIdAndDelete(cityId);

    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }

    // Remove the associated images from the uploads directory
    unlinkfile(city.image);

    res.status(200).json({ message: "City deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

module.exports = {
  getAllCities,
  getCityById,
  createCity,
  updateCity,
  deleteCity,
};
