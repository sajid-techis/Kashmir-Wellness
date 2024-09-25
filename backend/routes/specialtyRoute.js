const express = require('express');
const router = express.Router();
const Specialty = require('../models/specialtyModel'); // Assuming you have Specialty model in the models folder

// Create a new specialty
router.post('/create', async (req, res) => {
  try {
    const { name, description, image } = req.body;

    // Check if specialty already exists
    const existingSpecialty = await Specialty.findOne({ name });
    if (existingSpecialty) {
      return res.status(400).json({ message: "Specialty already exists" });
    }

    const newSpecialty = new Specialty({ name, description, image });
    const savedSpecialty = await newSpecialty.save();
    res.status(200).json({ message: "Specialty saved successfully", specialty: savedSpecialty });
  } catch (error) {
    res.status(500).json({ message: "Error saving specialty", error: error.message });
  }
});

// Get all specialties
router.get('/', async (req, res) => {
  try {
    const specialties = await Specialty.find();
    res.status(200).json({ message: "Specialties retrieved successfully", specialties });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving specialties", error: error.message });
  }
});

// Get a specific specialty by ID
router.get('/:id', async (req, res) => {
  try {
    const specialty = await Specialty.findById(req.params.id);
    if (!specialty) {
      return res.status(404).json({ message: "Specialty not found" });
    }
    res.status(200).json({ message: "Specialty retrieved successfully", specialty });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving specialty", error: error.message });
  }
});

// Update a specialty
router.put('/:id', async (req, res) => {
  try {
    const { name, description, image } = req.body;
    const updatedSpecialty = await Specialty.findByIdAndUpdate(
      req.params.id,
      { name, description, image },
      { new: true }
    );

    if (!updatedSpecialty) {
      return res.status(404).json({ message: "Specialty not found" });
    }

    res.status(200).json({ message: "Specialty updated successfully", specialty: updatedSpecialty });
  } catch (error) {
    res.status(500).json({ message: "Error updating specialty", error: error.message });
  }
});

// Delete a specialty
router.delete('/:id', async (req, res) => {
  try {
    const deletedSpecialty = await Specialty.findByIdAndDelete(req.params.id);
    if (!deletedSpecialty) {
      return res.status(404).json({ message: "Specialty not found" });
    }

    res.status(200).json({ message: "Specialty deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting specialty", error: error.message });
  }
});

module.exports = router;
