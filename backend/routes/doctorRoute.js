const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctorModel'); // Use Doctor instead of doctor

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

//Get Specializations
router.get('/specialties', async (req, res) => {
  try {
    const specialties = await Doctor.aggregate([
      {
        $group: {
          _id: "$specialty",
          description: { $first: "$specialtyDescription" }
        }
      }
    ]);
    res.status(200).json({ message: "Specialties retrieved successfully", specialties });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving specialties", error: error.message });
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



// Get doctors by specialty
router.get('/by-specialty/:specialty', async (req, res) => {
  try {
    const specialty = req.params.specialty;
    const doctors = await Doctor.find({ specialty: specialty }); 
    res.status(200).json({ message: "Doctors retrieved successfully", doctors });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving doctors", error: error.message });
  }
});


module.exports = router;


