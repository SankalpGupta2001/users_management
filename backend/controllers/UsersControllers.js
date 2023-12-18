const express = require('express');
const router = express.Router();

const User = require("../models/UsersSchema");

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await User.findOne({ email });

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      if (user.password !== password) {
          return res.status(401).json({ message: 'Invalid credentials' });
      }

      res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
      res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});



router.post('/signup', async (req, res) => {
    const { name, email, phone, gender, hearAbout, city, state, password } = req.body;
    
    console.log({ name, email, phone, gender, hearAbout, city, state, password },"heyyyyyyyyy")
  
    if (!name || !email || !phone || !gender || !hearAbout || !city || !state || !password) {
      return res.status(400).json({ message: 'All fields are mandatory' });
    }
  
    try {
      
      const newUser = new User({ name, email, phone,gender,hearAbout,city, state ,password });
  
      await newUser.save();
  
      return res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      return res.status(500).json({ message: 'Error registering user', error: error.message });
    }
  });







  module.exports = router;