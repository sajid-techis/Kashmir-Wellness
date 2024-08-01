const express = require('express');
const router = express.Router();
const User = require('../models/userModel')
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');


//User Register Route
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, phoneNumber, address, image, state, city } = req.body;
        
        // Create and save new user
        const user = new User({
            name,
            email,
            password,
            phoneNumber,
            address,
            city,
            state,
            image
        });
        await user.save();

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send response with success message and token
        res.status(201).json({
            message: 'User registration successful',
            token
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// User Login Route

router.post('/login', async (req,res) => {
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if (!user)
            return res.status(404).json({Message: 'Invalid Credentials'})
        const isMatch = await user.comparePassword(password)
        if (!isMatch)
            return res.status(404).json({Message:'Invalid Password'})

        const token = jwt.sign({id: user._id},process.env.JWT_SECRET,{expiresIn:'1h'});
        res.json({token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});

// Get User Profile Route

router.get('/profile',authenticate, async (req,res) => {
    try {
        const user = await User.findById(req.user.id);
        console.log(user.id);
        if (!user) 
            return res.status(404).json({Message: " User not found"})
        res.json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

module.exports = router;
