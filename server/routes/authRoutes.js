const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust the path as needed
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).send('User already exists');
      }
  
      // Create a new user
      const newUser = new User(req.body);
      await newUser.save();
  
      // Generate a JWT token
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Use an environment variable for the secret
  
      res.status(201).json({ token });
    } catch (error) {
      res.status(500).send('Error in signup');
    }
});

router.post('/login', async (req, res) => {
    try {
      // Find the user by email
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).send('User not found');
      }
  
      // Check password
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!is.match) {
        return res.status(400).send('Invalid credentials');
      }
  
      // Generate a JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.json({ token });
    } catch (error) {
      res.status(500).send('Error in login');
    }
});
  


module.exports = router;
