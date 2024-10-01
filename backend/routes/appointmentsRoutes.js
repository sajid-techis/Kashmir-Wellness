const express = require("express");
const router = express.Router();
const Appointment = require("../models/appointmentModel");
const Doctor = require("../models/doctorModel");
const User = require("../models/userModel");
const moment = require('moment');


// Book an appointment
router.post("/:doctorId/book-appointment", async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { patientId, date, timeSlot, patientName, email, phoneNumber } = req.body;

    const doctor = await Doctor.findById(doctorId);
    const patient = await User.findById(patientId);

    if (!doctor || !patient) {
      return res.status(404).json({ message: "Doctor or Patient Not Found" });
    }

    // Convert date to a readable format (e.g., 'Monday')
    const requestedDay = new Date(date).toLocaleString('en-US', { weekday: 'long' });

    // Check if the requested day is available
    if (!doctor.availability.days.includes(requestedDay)) {
      return res.status(400).json({ message: "Doctor not available on the requested day" });
    }

    // Check if the time slot is available
    if (!doctor.availability.hours.includes(timeSlot)) {
      return res.status(400).json({ message: "Time Slot Not Available" });
    }

    // Check how many appointments are already booked in that time slot
    const appointmentCount = await Appointment.countDocuments({
      doctorId,
      date,
      timeSlot,
    });

    if (appointmentCount >= 5) {
      return res.status(400).json({ message: "Time Slot is Full" });
    }

    // Create the new appointment
    const newAppointment = new Appointment({
      patientId,
      doctorId,
      date,
      timeSlot,
      patientName,
      email,
      phoneNumber,
    });

    await newAppointment.save();

    // Update the doctor and patient appointments array
    doctor.appointments = doctor.appointments || [];
    patient.appointments = patient.appointments || [];

    doctor.appointments.push(newAppointment._id);
    patient.appointments.push(newAppointment._id);

    await doctor.save();
    await patient.save();

    res.status(200).json({
      message: "Appointment Booked Successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error In Booking Appointment",
      error: error.message,
    });
  }
});


// Get appointments for a doctor
router.get("/:doctorId/appointments", async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { date } = req.query;

    // Convert the date string to a Date object
    const selectedDate = new Date(date);
    const startDate = new Date(selectedDate.setHours(0, 0, 0, 0));
    const endDate = new Date(selectedDate.setHours(23, 59, 59, 999));

    const appointments = await Appointment.find({
      doctorId,
      date: { $gte: startDate, $lte: endDate }
    })
      .populate({
        path: "patientId",
        select: "name email phoneNumber",
      })
      .populate("doctorId");

    res.status(200).json({
      message: "Appointments Retrieved Successfully",
      appointments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error In Finding Appointments",
      error: error.message,
    });
  }
});


// Get appointments for a patient
router.get("/patients/:patientId/appointments", async (req, res) => {
  try {
    const { patientId } = req.params;
    const appointments = await Appointment.find({ patientId }).populate(
      "doctorId"
    ); // Populate doctor details

    res.status(200).json({
      message: "Appointments Retrieved Successfully",
      appointments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error In Finding Appointments",
      error: error.message,
    });
  }
});

// Update appointment status
router.put("/:doctorId/appointments/:appointmentId", async (req, res) => {
  try {
    const { doctorId, appointmentId } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = status;
    await appointment.save();

    res.status(200).json({
      message: "Appointment status updated successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating appointment status",
      error: error.message,
    });
  }
});

router.delete("/:appointmentId", async (req, res) => {
    try {
      const { appointmentId } = req.params;
  
      // Find the appointment to be deleted
      const appointment = await Appointment.findById(appointmentId);
  
      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
  
      // Remove the appointment from the Doctor's appointments
      await Doctor.findByIdAndUpdate(
        appointment.doctorId,
        { $pull: { appointments: appointmentId } }
      );
  
      // Remove the appointment from the Patient's appointments
      await User.findByIdAndUpdate(
        appointment.patientId,
        { $pull: { appointments: appointmentId } }
      );
  
      // Delete the appointment document
      await Appointment.findByIdAndDelete(appointmentId);
  
      res.status(200).json({ message: "Appointment deleted successfully" });
    } catch (error) {
      res.status(500).json({
        message: "Error deleting appointment",
        error: error.message,
      });
    }
  });
  

module.exports = router;
