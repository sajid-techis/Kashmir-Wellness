// controllers/adminController.js

const Product = require("../models/productModel"); // Adjust this path to your product model
const User = require("../models/userModel"); // Adjust this path to your user model
const Category = require("../models/categoryModel");

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category', 'name');;
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// Add a new product
const addProduct = async (req, res) => {
    try {
        const { name, description, category, price, brand, stock, expirationDate, prescriptionRequired } = req.body;

        if (!name || !description || !category || !price || !brand || !stock || !expirationDate) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Process images from the request
        const imageUrls = req.files && req.files.length > 0 ? req.files.map(file => file.path) : [];
        console.log(req.files)
        console.log(req.body)

        const newProduct = new Product({
            name,
            description,
            category,
            price,
            brand,
            stock,
            expirationDate,
            prescriptionRequired,
            imageUrl: imageUrls,
        });

        const savedProduct = await newProduct.save();
        console.log(savedProduct)
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: "Error adding product", error });
    }
};

// Update a product
const updateProduct = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
  
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      // Merge existing and new image URLs from request
      const mergedImageUrls = [
        ...product.imageUrl, // Existing URLs
        ...req.body.imageUrl, // New URLs from frontend
      ];
  
      // Update the product with the merged URLs
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        { ...req.body, imageUrl: mergedImageUrls },
        { new: true }
      );
  
      res.status(200).json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (error) {
      res.status(500).json({ message: "Error updating product", error });
    }
  };
  
  

// Delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};
// Get Categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

// Export functions
module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getUsers,
  getProductById,
  getCategories,
};
