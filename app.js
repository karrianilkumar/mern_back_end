const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const bookRouter = require("./routes/book-routes");  // Book routes
const authRouter = require("./routes/auth");         // Authentication routes
const orderRouter = require("./routes/order-routes"); // Order routes

const app = express(); // is used to create an instance of an Express application  & const app: This defines a constant variable or  The app object will be used throughout your application to define routes, middleware, and start the server.

// Middlewares
app.use(express.json());  // Purpose: This middleware parses incoming JSON request bodies & Use: It is often used when you're sending JSON data to the server, typically in POST or PUT requests.
/*
For example, when a client sends a request like in json format :
{
  "name": "Book Title",
  "author": "Author Name"
}

The express.json() middleware will parse this JSON data and make it available in req.body within your route handlers.
*/
app.use(express.urlencoded({ extended: true })); // This is mainly used when data is sent via HTML forms with the application/x-www-form-urlencoded content type. It decodes the form data into a JavaScript object and makes it available in req.body.
/*   data is sent via HTML forms   : 
<form method="POST" action="/submit">
  <input type="text" name="username" />
  <input type="text" name="email" />
  <button type="submit">Submit</button>
</form>

express.urlencoded({ extended: true }) will parse the form data (e.g., username=john&email=john@example.com) and make it available in req.body as  :
{
  username: 'john',
  email: 'john@example.com'
}
   

*/
app.use(cors()); // app.use(cors())Purpose: This middleware enables CORS (Cross-Origin Resource Sharing). CORS is a security feature implemented by browsers that restricts web applications from making requests to a domain different from the one that served the web page

// Route handlers
app.use("/books", bookRouter);   // if hte route starts with /books then use the bookRouter i.e "./routes/book-routes" file 
app.use("/auth", authRouter);    // Auth API i.e if hte route starts with /auth then use the ./routes/auth file 
app.use("/orders", orderRouter); // // if hte route starts with /orders then use the ./routes/order-routes" file will get executed  


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!', details: err.message });
});

// Connect to MongoDB and start server
mongoose
  .connect("mongodb://localhost:27017/book_store_app", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to Database");
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => console.log("Database connection error: ", err));

