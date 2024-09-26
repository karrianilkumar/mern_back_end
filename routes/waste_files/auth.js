const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check if the email and password match the admin credentials
  if (email === 'karrianilkumar101@gmail.com' && password === 'anilkumar123') {
    res.status(200).json({ message: 'Admin login successful', role: 'admin' });
  } else {
    // For other users, you may want to validate against a database or other source
    // Here, we're just sending a generic success message for simplicity
    // Add a real check for user credentials here if applicable
    res.status(200).json({ message: 'User login successful', role: 'user' });
  }
});

module.exports = router;

