const express = require('express');
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing
const router = express.Router();
const User = require('../model/User'); // Correct path to the User model

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Admin credentials check
    if (email === 'karrianilkumar101@gmail.com' && password === 'anilkumar123') {
      res.status(200).json({ message: 'Admin login successful', role: 'admin' });
    } else {
      // Check if the user exists in the database
      let user = await User.findOne({ email });

      if (!user) {
        // If the user does not exist, hash the password
        const salt = await bcrypt.genSalt(10); // Generate salt to hash hte password stored in hte mongodb for security purpose 
        const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

        // Save the user with the hashed password
        user = new User({ email, password: hashedPassword });
        await user.save();
        res.status(200).json({ message: 'User registered and logged in successfully', role: 'user' });
      } else {
        // If the user exists, simply log them in (you can also compare passwords if needed)
        res.status(200).json({ message: 'User login successful', role: 'user' });
      }
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;







// const express = require('express');
// const router = express.Router();

// router.post('/login', (req, res) => {
//   const { email, password } = req.body;

//   // Check if the email and password match the admin credentials
//   if (email === 'karrianilkumar101@gmail.com' && password === 'anilkumar123') {
//     res.status(200).json({ message: 'Admin login successful', role: 'admin' });
//   } else {
//     // For other users, you may want to validate against a database or other source
//     // Here, we're just sending a generic success message for simplicity
//     // Add a real check for user credentials here if applicable
//     res.status(200).json({ message: 'User login successful', role: 'user' });
//   }
// });

// module.exports = router;
