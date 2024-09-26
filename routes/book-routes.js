const express = require("express");
const router = express.Router(); // express.Router(): This is a function provided by the Express framework in Node.js that creates a new router object. with that object we can request to db like get , post , delete , put etc requests 
const Book = require("../model/Book");
const booksController = require("../controllers/books-controller");

router.get("/", booksController.getAllBooks);   // get() takes route , function as input 
router.post("/", booksController.addBook);
router.get("/:id", booksController.getById);
router.put("/:id", booksController.updateBook);
router.delete("/:id", booksController.deleteBook);

module.exports = router;
