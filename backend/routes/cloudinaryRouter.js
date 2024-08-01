const express = require('express');
const router = express.Router();
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
        folder: 'profile_images', 
        allowed_formats: ['jpg', 'png'],
    },
});

const upload = multer({ storage: storage });

// Upload endpoint
router.post('/upload', upload.single('image'), (req, res) => {
    if (req.file && req.file.path) {
        res.json({ imageUrl: req.file.path });
    } else {
        res.status(400).json({ error: 'Failed to upload image' });
    }
});

module.exports = router;
