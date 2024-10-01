const express = require('express');
const LabAppointment = require('../models/labAppointmentModel');
const User = require('../models/userModel'); // Import the User model
const router = express.Router();

// Create a lab appointment
router.post('/', async (req, res) => {
  try {
    const newAppointment = new LabAppointment(req.body);
    const savedAppointment = await newAppointment.save();

    // Update user's labAppointments field
    await User.findByIdAndUpdate(savedAppointment.patientId, {
      $push: { labAppointments: savedAppointment._id }
    });

    res.status(201).json(savedAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all lab appointments
router.get('/', async (req, res) => {
    try {
      const appointments = await LabAppointment.find();
      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Get all lab appointments for a specific patient
router.get('/patient/:patientId', async (req, res) => {
  try {
    const appointments = await LabAppointment.find({ patientId: req.params.patientId });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific lab appointment by ID
router.get('/:id', async (req, res) => {
  try {
    const appointment = await LabAppointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a lab appointment
router.put('/:id', async (req, res) => {
  try {
    const updatedAppointment = await LabAppointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAppointment) return res.status(404).json({ message: 'Appointment not found' });
    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a lab appointment
router.delete('/:id', async (req, res) => {
  try {
    const deletedAppointment = await LabAppointment.findByIdAndDelete(req.params.id);
    if (!deletedAppointment) return res.status(404).json({ message: 'Appointment not found' });
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
