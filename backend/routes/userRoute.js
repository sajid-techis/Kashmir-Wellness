const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); // To generate random confirmation code
const { sendEmail } = require('../middleware/mailer');
const authenticate = require('../middleware/authenticate');
const { ForgotPassword } = require('../middleware/forgotPasswordMailer');
const dotenv = require('dotenv');


// User Registration Route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phoneNumber, address, city, state, image } = req.body;

    // Generate 6-digit random confirmation code
    const confirmationCode = crypto.randomInt(100000, 999999).toString();

    // Create new user
    const user = new User({
      name,
      email,
      password,
      phoneNumber,
      address,
      city,
      state,
      image,
      confirmationCode,
      isVerified: false,
    });

    await user.save();

    // Send email with the confirmation code
    await sendEmail(email, 'Verify Your Account', confirmationCode, name);

    res.status(201).json({ message: 'Registration successful. Check your email for the confirmation code.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Verify Confirmation Code Route
router.post('/verify', async (req, res) => {
  try {
    const { email, code } = req.body;

    // Find user with matching email and confirmation code
    const user = await User.findOne({ email, confirmationCode: code });

    if (!user) return res.status(400).json({ message: 'Invalid code or user not found.' });

    // Mark user as verified and clear the confirmation code
    user.isVerified = true;
    user.confirmationCode = null;
    await user.save();

    // Generate JWT token for the user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(200).json({ message: 'Account verified successfully!', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User Login Route
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

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get User Profile Route
router.get('/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update User Profile Route
router.put('/update', authenticate, async (req, res) => {
    try {
      const { name, email, password, phoneNumber, address, city, state, image } = req.body;
  
      // Find user by ID
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ message: 'User not found.' });
  
      // Update user details
      user.name = name || user.name;
      user.email = email || user.email;
      user.phoneNumber = phoneNumber || user.phoneNumber;
      user.address = address || user.address;
      user.city = city || user.city;
      user.state = state || user.state;
      user.image = image || user.image; // Assuming the new image URL can be sent
  
      // If a new password is provided, hash it
      if (password) {
        user.password = password; // The password will be hashed in pre-save middleware
      }
  
      await user.save();
  
      res.status(200).json({ message: 'Profile updated successfully!', user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  //Forgot password
  router.post('/forgot-password', async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) return res.status(404).json({ message: 'User not found.' });
  
      // Generate reset token and set expiration (1 hour)
      const resetToken = crypto.randomBytes(32).toString('hex');
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  
      await user.save();
  
      // Send reset link via email
      const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
      await ForgotPassword(user.email, 'Password Reset Request', resetLink);
  
      res.status(200).json({ message: 'Password reset link sent to your email.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  
  router.post('/reset-password/:token', async (req, res) => {
    try {
      const { password } = req.body;
      const { token } = req.params;
  
      // Find user by reset token and ensure it hasn't expired
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }, // Token must be valid
      });
  
      if (!user) return res.status(400).json({ message: 'Invalid or expired reset token.' });
  
      // Update password and clear reset fields
      user.password = password; // Will be hashed by pre-save middleware
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;
  
      await user.save();
      res.status(200).json({ message: 'Password has been reset successfully.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
module.exports = router;
