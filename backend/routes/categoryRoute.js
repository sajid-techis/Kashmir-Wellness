const express = require('express');
const router = express.Router();
const Category = require('../models/categoryModel');

// Create a category
router.post('/create', async (req, res) => {
    try {
        const { name, description,imageUrl } = req.body;

        const newCategory = new Category({
            name,
            description,
            imageUrl,
        });

        const savedCategory = await newCategory.save();

        res.status(200).json({
            message: 'Category created successfully',
            category: savedCategory
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating category', error });
    }
});

// Get categories with filters
router.get('/get', async (req, res) => {
    try {
        const filters = {};

        // Add filters based on query parameters
        if (req.query.name) {
            filters.name = { $regex: req.query.name, $options: 'i' }; 
        }
        if (req.query.description) {
            filters.description = { $regex: req.query.description, $options: 'i' }; 
        }

        // Fetch categories from the database
        const categories = await Category.find(filters);

        // Send a success response
        res.status(200).json({
            message: 'Categories retrieved successfully',
            categories
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error });
    }
});

// Get category by ID
router.get('/get/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({
            message: 'Category retrieved successfully',
            category
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching category', error });
    }
});



module.exports = router;
