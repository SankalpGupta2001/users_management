const express = require('express');
const router = express.Router();

const User = require("../models/UserDataSchema");

router.post('/users', async (req, res) => {
    try {
      const { userName, email, phone } = req.body;
  
      const newUser = new User({
        userName,
        email,
        phone,
      });
  
      await newUser.save();
  
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      res.status(500).json({ message: 'Error creating user', error: error.message });
    }
  });
  
  router.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      console.log(users);
  
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
  });

  router.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
      const user = await User.findById(id);
    
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
    
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ message: 'Server Error' });
    }
  });
  
  
  

  router.put('/users/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { userName, email, phone } = req.body;
  
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (userName) {
        user.userName = userName;
      }
      if (email) {
        user.email = email;
      }
      if (phone) {
        user.phone = phone;
      }
  
      await user.save();
  
      res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Error updating user', error: error.message });
    }
  });

  router.delete('/users/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedUser = await User.findByIdAndDelete(id);
  
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User deleted successfully', deletedUser });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
  });
    
  module.exports=router;