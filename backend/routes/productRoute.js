// productRouter.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/productModel");

// Create a new product
router.post("/create", async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      price,
      brand,
      stock,
      expirationDate,
      prescriptionRequired,
      imageUrl,
      ratings // Include ratings field
    } = req.body;

    // Ensure ratings field has default values if not provided
    const newProduct = new Product({
      name,
      description,
      category,
      price,
      brand,
      stock,
      expirationDate,
      prescriptionRequired,
      imageUrl,
      ratings: ratings || { averageRating: 0, numberOfRatings: 0 } // Default values
    });

    const savedProduct = await newProduct.save();

    res.status(200).json({ message: "Product saved successfully", product: savedProduct });
  } catch (error) {
    res.status(500).json({ message: "Failed to create product", error: error.message });
  }
});


// Get All Products with optional limit
router.get('/get', async (req, res) => {
  try {
    const filters = {};

    if (req.query.category) {
      if (mongoose.Types.ObjectId.isValid(req.query.category)) {
        filters.category = new mongoose.Types.ObjectId(req.query.category);
      } else {
        return res.status(400).json({ message: "Invalid category ID format" });
      }
    }

    if (req.query.search) {
      filters.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    const limit = req.query.limit ? parseInt(req.query.limit) : 10; // Default limit to 10 if not provided

    const aggregationPipeline = [
      { $match: filters },
      { $sample: { size: limit } }
    ];

    const products = await Product.aggregate(aggregationPipeline);

    res.status(200).json({
      message: 'Products retrieved successfully',
      products
    });
  } catch (error) {
    console.error("Error fetching products:", error); // Log the error
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

// Get Single Product by ID
router.get('/get/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: 'Product retrieved successfully',
      product
    });
  } catch (error) {
    console.error("Error fetching product:", error); // Log the error
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
});

module.exports = router;
