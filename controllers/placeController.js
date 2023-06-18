const Place = require("../models/placeModel");
const unlinkfile = require("../utils/unlinkFile");


const getPlacesByCitytId = async (req, res) => {
  try {
    const cityId = req.params.id;

    const places = await Place.find({ city: cityId });

    if (places.length > 0) {
      res.status(200).json({
        message: "places retrieved successfully",
        places: places,
      });
    } else {
      res.status(404).json({ message: "places by city id not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};


// get all places
const getAllPlaces = async (req, res) => {
  try {
    const places = await Place.find().populate("city");

    res.status(200).json({ places });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// get a place by ID
const getPlaceById = async (req, res) => {
  const placeId = req.params.id;

  try {
    const place = await Place.findById(placeId);

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    res.status(200).json({ place });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// create a new place
const createPlace = async (req, res) => {
  try {
    const { name, description, location,city } = req.body;

    const place = new Place({
      name,
      description,
      location,
      city,
      image: req.file.filename,
    });

    const savedPlace = await place.save();

    if (savedPlace) {
      res.status(201).json({
        message: "Place created successfully",
        place: savedPlace,
      });
    } else {
      res.status(500).json({ message: "Failed to create place" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// update a place by ID
const updatePlace = async (req, res) => {
  try {
    const { name, description, location, city } = req.body;

    const placeId = req.params.id;
    const place = await Place.findById(placeId);

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    place.name = name;
    place.description = description;
    place.location = location;
    place.city = city;

    if (req.file.filename) {
      unlinkfile(place.image);
      place.image = req.file.filename;
    }

    const updatedPlace = await place.save();

    res
      .status(200)
      .json({ message: "Place updated successfully", place: updatedPlace });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// delete a place by ID
const deletePlace = async (req, res) => {
  const placeId = req.params.id;

  try {
    const place = await Place.findByIdAndDelete(placeId);

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    unlinkfile(place.image); // Delete the associated file using the unlinkfile function

    res.status(200).json({ message: "Place deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

module.exports = {
  getAllPlaces,
  getPlaceById,
  createPlace,
  updatePlace,
  deletePlace,
  getPlacesByCitytId,
};
