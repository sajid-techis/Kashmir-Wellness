const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctorModel'); 
const Appointment = require('../models/appointmentModel');
const User = require('../models/userModel');
const Specialty = require('../models/specialtyModel');


// Create a new doctor
router.post('/create', async (req, res) => {
  try {
    const newDoctor = new Doctor(req.body); 
    const savedDoctor = await newDoctor.save();
    res.status(200).json({ message: "Doctor saved successfully", doctor: savedDoctor });
  } catch (error) {
    res.status(500).json({ message: "Error saving doctor", error: error.message });
  }
});

// routes/doctorRoutes.js
router.get('/featured', async (req, res) => {
  try {
    const limit = 6; 

    // Aggregation pipeline to sample random doctors
    const featuredDoctors = await Doctor.aggregate([
      { $sample: { size: limit } } 
    ]);

    res.status(200).json({ message: "Featured doctors retrieved successfully", featuredDoctors });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving featured doctors", error: error.message });
  }
});


// Fetch doctor details including availability
router.get('/:doctorId', async (req, res) => {
  try {
    const { doctorId } = req.params;
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor Not Found" });
    }

    res.status(200).json({ message: "Doctor details retrieved successfully", doctor });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving doctor details", error: error.message });
  }
});

// Fetch doctors by specialty ID
router.get('/by-specialty/:specialtyId', async (req, res) => {
  try {
    const { specialtyId } = req.params;
    const doctors = await Doctor.find({ specialty: specialtyId }); // Assuming 'specialty' is the field in your doctor model
    
    res.status(200).json({ message: "Doctors retrieved successfully", doctors });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving doctors", error: error.message });
  }
});



module.exports = router;


