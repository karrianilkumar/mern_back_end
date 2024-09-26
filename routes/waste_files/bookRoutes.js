const express = require('express');
const router = express.Router();
const Book = require('../model/Book'); // Adjust the path as needed
const { authenticateUser } = require('../middlewares/authMiddleware'); // Adjust the path as needed

// Define admin credentials
const adminEmail = 'karrianilkumar101@gmail.com';
const adminPassword = 'anilkumar123';

// Middleware to check admin credentials
const checkAdminCredentials = (req, res, next) => {
  const { email, password } = req.user; // Access user email and password from request

  console.log('User email:', email);
  console.log('User password:', password);
  console.log('Admin email:', adminEmail);
  console.log('Admin password:', adminPassword);

  if (email === adminEmail && password === adminPassword) {
    next(); // Admin credentials are correct, proceed to the next handler
  } else {
    res.status(403).json({ error: 'Access denied: Admins only' });
  }
};

// Route to add a new book (admin only)
router.post('/', authenticateUser, checkAdminCredentials, async (req, res) => {
  try {
    console.log("hi this is anil - Adding book");
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json({ message: 'Book added successfully!' });
  } catch (error) {
    console.log("Error adding book:", error);
    res.status(500).json({ error: 'Error adding book' });
  }
});

// Route to update a book (admin only)
router.put('/:id', authenticateUser, checkAdminCredentials, async (req, res) => {
  try {
    console.log("hi this is anil - Updating book");
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedBook) {
      res.json(updatedBook);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    console.log("Error updating book:", error);
    res.status(500).json({ error: 'Error updating book' });
  }
});

// Route to delete a book (admin only)
router.delete('/:id', authenticateUser, checkAdminCredentials, async (req, res) => {
  try {
    console.log("hi this is anil - Deleting book");
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (deletedBook) {
      res.json({ message: 'Book deleted successfully!' });
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    console.log("Error deleting book:", error);
    res.status(500).json({ error: 'Error deleting book' });
  }
});

module.exports = router;

