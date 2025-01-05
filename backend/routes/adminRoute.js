// routes/adminRoute.js

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const adminAuth = require('../middleware/adminAuth');
const User = require('../models/userModel'); // Ensure User model is imported
const {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getUsers,
    getProductById,
    getCategories
} = require('../controllers/adminController');

const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer-storage-cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'product_images', // Change to your preferred folder name
        allowed_formats: ['jpg', 'png'],
    },
});

// Configure Multer for multiple uploads
const upload = multer({ storage: storage }).array('images');

router.post('/upload', upload, async (req, res) => {
    try {
        const imageUrls = req.files.map((file) => file.path); // Ensure 'path' returns the Cloudinary URL
        res.status(200).json(imageUrls); // Send only URLs back
    } catch (error) {
        res.status(500).json({ message: "Error uploading images", error });
    }
});


// Admin Registration Route (no auth needed)
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, phoneNumber, address, city, state, image } = req.body;

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already registered.' });

        const newUser = new User({
            name,
            email,
            password,
            phoneNumber,
            address,
            city,
            state,
            image,
            role: 'admin', // Set role to admin
            isVerified: true, // You may want to skip verification for the initial admin
        });

        await newUser.save();

        // Generate a token after saving the new user
        const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET);
        
        res.status(201).json({ message: 'Admin registration successful.', token }); // Send back the token
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: 'Invalid credentials.' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid password.' });

        if (!user.isVerified) {
            return res.status(403).json({ message: 'Please verify your account first.' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET); // Include role in token
        res.json({ token, role: user.role }); // Send role in response
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Apply adminAuth middleware to all other admin routes
router.use(adminAuth);

// Product routes
router.get('/products', getProducts);
router.post('/products',upload,addProduct); // Use upload middleware here
router.get('/products/:id', getProductById);
router.put('/products/:id', upload, updateProduct); // Use upload middleware here
router.delete('/products/:id', deleteProduct);

// User routes
router.get('/users', getUsers);
router.get('/categories', getCategories);

// Export the router
module.exports = router;
