const Appointment = require("../models/appointmentModel");


//   get all appointments
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("guide").populate("tourist");

    res.status(200).json({
      message: "Appointments retrieved successfully",
      appointments: appointments,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// get an appointment by ID
const getAppointmentById = async (req, res) => {
  try {
    const appointmentId = req.params.id;

    const appointment = await Appointment.findById(appointmentId)
      .populate("guide")
      .populate("tourist");

    if (appointment) {
      res.status(200).json({
        message: "Appointment retrieved successfully",
        appointment: appointment,
      });
    } else {
      res.status(404).json({ message: "Appointment not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// get all appointments by guide ID
const getAppointmentsByGuideId = async (req, res) => {
  try {
    const guideId = req.params.id;

    const appointments = await Appointment.find({ guide: guideId })
      .populate("guide")
      .populate("tourist");

    if (appointments.length > 0) {
      res.status(200).json({
        message: "Appointments retrieved successfully",
        appointments: appointments,
      });
    } else {
      res.status(404).json({ message: "Appointments by guide id not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// get all appointments by tourist ID
const getAppointmentsByTouristId = async (req, res) => {
  try {
    const touristId = req.params.id;

    const appointments = await Appointment.find({
      tourist: touristId,
    }).populate("guide");

    if (appointments.length > 0) {
      res.status(200).json({
        message: "Appointments retrieved successfully",
        appointments: appointments,
      });
    } else {
      res.status(404).json({ message: "Appointments by tourist id not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// create a new appointment
const createAppointment = async (req, res) => {
  try {
    const { guideId, touristId, description, language } = req.body;

    const appointment = new Appointment({
      guide: guideId,
      tourist: touristId,
      description,
      language,
    });

    const savedAppointment = await appointment.save();

    if (savedAppointment) {
      res.status(201).json({
        message: "Appointment created successfully",
        appointment: savedAppointment,
      });
    } else {
      res.status(500).json({ message: "Failed to create appointment" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// update an appointment by ID
const updateAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const { description, language, accepted } = req.body;

    console.log(req.body);

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      {
        description,
        language,
        accepted,
      },
      { new: true }
    );

    if (updatedAppointment) {
      res.status(200).json({
        message: "Appointment updated successfully",
        appointment: updatedAppointment,
      });
    } else {
      res.status(404).json({ message: "Appointment not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// delete an appointment by ID
const deleteAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;

    const deletedAppointment = await Appointment.findByIdAndDelete(
      appointmentId
    );

    if (deletedAppointment) {
      res.status(200).json({
        message: "Appointment deleted successfully",
        appointment: deletedAppointment,
      });
    } else {
      res.status(404).json({ message: "Appointment not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

module.exports = {
  getAppointmentsByGuideId,
  getAppointmentsByTouristId,
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
