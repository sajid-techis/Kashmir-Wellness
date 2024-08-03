const express = require('express');
const router = express.Router();
const Lab = require('../models/labsModel')

// Create a new lab
router.post('/create', async(req,res) => {
    try {
        const labs = new Lab(req.body)
        await labs.save();
        res.status(200).json({Message: 'lab created successfully'})
    } catch (error) {
        res.status(500).json({Message:error.message});
    }
})

//Get a lab 
router.get('/get',async(req,res) => {
    try {
        const filters = {};

        
        if (req.query.name) {
            filters.name = { $regex: req.query.name, $options: 'i' }; 
        }
        if (req.query.city) {
            filters.city = { $regex: req.query.city, $options: 'i' }; 
        }
        const labs = await Lab.find(filters);
        res.status(200).json({Message: "Lab Received Successfully",labs})
    } catch (error) {
        res.status(500).json({Message:error.message})
    }
})

// Featured Labs

router.get('/featured', async (req, res) => {
    try {
        const limit = 6
        const featuredLabs = await Lab.aggregate([
            { $sample: { size: limit } }
        ])
        res.status(200).json({Message:"Featured Labs Retrieved",featuredLabs})
    } catch (error) {
        res.status(500).json({Message:error.message})
    }
})


module.exports = router;