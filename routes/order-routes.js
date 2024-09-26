const express = require('express');
const router = express.Router();
const Order = require('../model/Order');

// Place an order
router.post('/', async (req, res) => {
  try {
    const { email, password, address, pincode, phoneNumber, doorNumber, books } = req.body;
    
    // Validate request
    if (!email || !password || !address || !pincode || !phoneNumber || !doorNumber || !books || books.length === 0) {
      return res.status(400).json({ success: false, message: 'All fields and at least one book are required.' });
    }

    // Create and save order
    const orderItems = books.map(book => ({
      bookId: book.bookId, // Ensure this matches the book ID field
      quantity: book.quantity
    }));

    const newOrder = new Order({
      email,
      password,
      address,
      pincode,
      phoneNumber,
      doorNumber,
      books: orderItems
    });

    await newOrder.save();
    res.status(201).json({ success: true, message: 'Order placed successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error placing order.', error });
  }
});

module.exports = router;

