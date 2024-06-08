const express = require('express')
require('dotenv').config()
const router = express.Router()
const User = require('./Models/users');
const bcrypt = require('bcrypt'); 

router.post('/signup', async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please fill in all fields.' });
      }
      const existingEmail = await User.findOne({ email });
      const existingUsername = await User.findOne({ username });
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      let errorMessage = '';
      if (existingEmail && existingUsername) {
          errorMessage = 'Username and email already in use.';
      } else if (existingEmail) {
          errorMessage = 'Email already in use.';
      } else if (existingUsername) {
          errorMessage = 'Username already in use.';
      } 

      if (errorMessage) {
          return res.status(400).json({ message: errorMessage });
      }
  
      const newUser = new User({
        username,
        email,
        password: hashedPassword, 
      });

    const savedUser = await newUser.save();
      res.status(201).json({ message: 'User created successfully!', user: savedUser.toJSON({ virtuals: true }) }); 
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  });

module.exports = router;