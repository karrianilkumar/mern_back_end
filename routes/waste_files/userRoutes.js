const express = require('express');
const router = express.Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const { authenticateUser } = require('../middlewares/authMiddleware');

// Route to register a new user
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Route to login a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("hi this is anil");
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const role = (email === 'karrianilkumar101@gmail.com' && password === 'anilkumar123') ? 'admin' : 'user';
    const token = jwt.sign({ email, role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, role });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

module.exports = router;

