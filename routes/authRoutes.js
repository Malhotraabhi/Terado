
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const secret_key='terado'

const expiresInMinutes = 30;
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

   
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Received login request:', { email, password });

    const user = await User.findOne({ email });
    console.log('Retrieved user from the database:', user);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log('Is password valid?', isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      'secret_key',
      { expiresIn: expiresInMinutes * 60 }
    );

    console.log('Generated token:', token);

    res.json({ token });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: error.message });
  }
});




module.exports = router;
