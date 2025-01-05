const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const adminController = require('../controllers/adminController'); // Adjust the path as necessary

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
        folder: 'profile_images', 
        allowed_formats: ['jpg', 'png'],
    },
});

// Configure Multer for multiple uploads
const upload = multer({ storage: storage }).array('images'); 

// Route to add a new product
router.post('/admin/products', upload, adminController.addProduct);

// Route to update a product
router.put('/admin/products/:id', upload, adminController.updateProduct);

module.exports = router;
