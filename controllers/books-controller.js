const Book = require("../model/Book");

const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    if (!books.length) {
      return res.status(404).json({ message: "No books found" });
    }
    return res.status(200).json({ books });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// to get a book by it's id 
const getById = async (req, res, next) => {
  const id = req.params.id;  //  Retrieves the ID from the route parameters.
  try {
    const book = await Book.findById(id);  // Book is my model 
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({ book });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// used to add/save the book into the mongodb 
const addBook = async (req, res, next) => {
  const { name, author, description, price, available, image } = req.body;
  try {
    const book = new Book({   // here new Book is a constrcutor of Book model class 
      name,
      author,
      description,
      price,
      available,
      image,
    });
    await book.save(); // here we saved the book details to book object of model class Book 
    return res.status(201).json({ book });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// used to update the book in the mongodb 
const updateBook = async (req, res, next) => {
  const id = req.params.id;   //   Retrieves the ID from the route parameters.
  const { name, author, description, price, available, image } = req.body;
  try {
  /*
  { name, author, description, price, available, image }:

    This is the update object, which contains the new values for the fields of the document. If the document is found, it will update the fields name, author, description, price, available, and image with these new values.

{ new: true }:

    This option specifies that the method should return the updated document instead of the original one. By default, findOneAndUpdate returns the document as it was before the update. Setting { new: true } makes sure that updatedBook contains the modified document after the update
  */
    const updatedBook = await Book.findOneAndUpdate(
      { _id: id },
      { name, author, description, price, available, image },
      { new: true }
    );
    if (!updatedBook) {   // if the promise is not resolved i.e if the promise is rejected 
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({ book: updatedBook });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


//  used to delete the book in the mongodb 
const deleteBook = async (req, res, next) => {
  const id = req.params.id;
  try {
    // const deletedBook = await Book.findByIdAndRemove(id);
    const deletedBook = await Book.deleteOne({_id : id });
    if (!deletedBook) {  // if the promise is not resolved then this will be executed 
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({ message: "Book successfully deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllBooks = getAllBooks;  // exports.asyn_func_name  = asyn_func_name 
exports.addBook = addBook;
exports.getById = getById;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;














// const Book = require("../model/Book");

// const getAllBooks = async (req, res, next) => {
//   let books;
//   try {
//     books = await Book.find();
//   } catch (err) {
//     console.log(err);
//   }

//   if (!books) {
//     return res.status(404).json({ message: "No products found" });
//   }
//   return res.status(200).json({ books });
// };

// const getById = async (req, res, next) => {
//   const id = req.params.id;
//   let book;
//   try {
//     book = await Book.findById(id);
//   } catch (err) {
//     console.log(err);
//   }
//   if (!book) {
//     return res.status(404).json({ message: "No Book found" });
//   }
//   return res.status(200).json({ book });
// };

// const addBook = async (req, res, next) => {
//   const { name, author, description, price, available, image } = req.body;
//   let book;
//   try {
//     book = new Book({
//       name,
//       author,
//       description,
//       price,
//       available,
//       image,
//     });
//     await book.save();
//   } catch (err) {
//     console.log(err);
//   }

//   if (!book) {
//     return res.status(500).json({ message: "Unable To Add" });
//   }
//   return res.status(201).json({ book });
// };

// const updateBook = async (req, res, next) => {
//   const id = req.params.id;
//   const { name, author, description, price, available, image } = req.body;
//   let book;
//   try {
//     book = await Book.findByIdAndUpdate(id, {
//       name,
//       author,
//       description,
//       price,
//       available,
//       image,
//     });
//     book = await book.save();
//   } catch (err) {
//     console.log(err);
//   }
//   if (!book) {
//     return res.status(404).json({ message: "Unable To Update By this ID" });
//   }
//   return res.status(200).json({ book });
// };

// const deleteBook = async (req, res, next) => {
//   const id = req.params.id;
//   let book;
//   try {
//     book = await Book.findByIdAndRemove(id);
//   } catch (err) {
//     console.log(err);
//   }
//   if (!book) {
//     return res.status(404).json({ message: "Unable To Delete By this ID" });
//   }
//   return res.status(200).json({ message: "Product Successfully Deleted" });
// };

// exports.getAllBooks = getAllBooks;
// exports.addBook = addBook;
// exports.getById = getById;
// exports.updateBook = updateBook;
// exports.deleteBook = deleteBook;
