// productRouter.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/productModel");


// Create a new product
router.post("/create", async (req, res) => {
  try {
      const productsData = req.body; // Expecting an array of product objects

      // Validate that the input is an array
      if (!Array.isArray(productsData)) {
          return res.status(400).json({ message: "Invalid input: expected an array of products." });
      }

      const savedProducts = [];

      for (const productData of productsData) {
          const {
              name, description, category, brand, prescriptionRequired,
              imageUrl, ratings, batches
          } = productData;

          const newProduct = new Product({
              name,
              description,
              category,
              brand,
              prescriptionRequired,
              imageUrl: imageUrl || [],
              ratings: ratings || { averageRating: 0, numberOfRatings: 0 },
              batches: batches || [] // Store batch info here
          });

          const savedProduct = await newProduct.save();
          savedProducts.push(savedProduct);
      }

      res.status(200).json({ message: "Products saved successfully", products: savedProducts });
  } catch (error) {
      res.status(500).json({ message: "Failed to create products", error: error.message });
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

    // Optional: Filter products by batch expiration date
    if (req.query.expirationDate) {
      filters['batches.expirationDate'] = { $lte: new Date(req.query.expirationDate) };
    }

    const products = await Product.find(filters);
    res.status(200).json({
      message: 'Products retrieved successfully',
      products
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});


//Get Featured Products

router.get('/featured-products', async (req,res) => {
  try {
    const limit = 6;
    const featuredProducts = await Product.aggregate([
      {$sample: { size: limit}}
    ])
    res.status(200).json({Message: "Featured Products Fetched successfully", featuredProducts})
  } catch (error) {
    res.status(500).json({Message:"Error fetching featured Products", error: error.message});
  }
})

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

// Update a product by ID
router.put('/update/:id', async (req, res) => {
  try {
      const { id } = req.params;

      // Validate the ID format
      if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ message: "Invalid product ID format" });
      }

      // Get the update data from the request body
      const updateData = req.body;

      // Find the product by ID and update it
      const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

      // If no product is found, return a 404 error
      if (!updatedProduct) {
          return res.status(404).json({ message: "Product not found" });
      }

      // Return the updated product
      res.status(200).json({
          message: 'Product updated successfully',
          product: updatedProduct
      });
  } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ message: 'Error updating product', error: error.message });
  }
});




module.exports = router;
