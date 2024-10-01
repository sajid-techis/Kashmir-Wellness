const express = require('express');
const router = express.Router();
const { Lab, generateTimeSlots } = require('../models/labsModel');

// Update time slots for all labs
router.post('/update-timeslots', async (req, res) => {
    try {
        const labs = await Lab.find({});
        
        // Check if any labs are found
        if (labs.length === 0) {
            return res.status(404).json({ Message: "No labs found." });
        }

        // Loop through each lab and update timeSlots
        for (const lab of labs) {
            console.log("Processing Lab:", lab.name); // Debug log
            const timeSlots = generateTimeSlots(lab.openingHours);
            console.log("Generated Time Slots for", lab.name, ":", timeSlots); // Debug log
            lab.timeSlots = timeSlots; // Assign generated slots to the lab
            await lab.save(); // Save the updated lab
        }

        res.status(200).json({ Message: "Time slots updated successfully for all labs." });
    } catch (error) {
        console.error("Error updating time slots:", error); // Log any errors
        res.status(500).json({ Message: error.message });
    }
});

// Create a new lab
router.post('/create', async (req, res) => {
    try {
        const { openingHours } = req.body;

        // Validate opening hours
        if (!openingHours || !openingHours.days || !openingHours.hours || 
            openingHours.days.length === 0 || openingHours.hours.length === 0) {
            return res.status(400).json({ Message: 'Opening hours are required.' });
        }

        const labs = new Lab(req.body);
        await labs.save();
        res.status(200).json({ Message: 'Lab created successfully' });
    } catch (error) {
        res.status(500).json({ Message: error.message });
    }
});

// Get a lab
router.get('/get', async (req, res) => {
    try {
        const filters = {};
        if (req.query.name) {
            filters.name = { $regex: req.query.name, $options: 'i' };
        }
        if (req.query.city) {
            filters.city = { $regex: req.query.city, $options: 'i' };
        }
        const labs = await Lab.find(filters);
        res.status(200).json({ Message: "Lab Received Successfully", labs });
    } catch (error) {
        res.status(500).json({ Message: error.message });
    }
});

// Featured Labs
router.get('/featured', async (req, res) => {
    try {
        const limit = 6;
        const featuredLabs = await Lab.aggregate([
            { $sample: { size: limit } }
        ]);
        res.status(200).json({ Message: "Featured Labs Retrieved", featuredLabs });
    } catch (error) {
        res.status(500).json({ Message: error.message });
    }
});

module.exports = router;
