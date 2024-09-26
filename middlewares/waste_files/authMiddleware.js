const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // [0] --> header/bearer  [1]--> token  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
  console.log("hi anil");
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Securely access the JWT secret from .env
    req.user = decoded; // Set user information from token
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

const authorizeAdmin = (req, res, next) => {
  const { email, password } = req.user;
  console.log("hi anil");
  // Admin credentials
  const adminEmail = 'karrianilkumar101@gmail.com';
  const adminPassword = 'anilkumar123';

  if (email === adminEmail && password === adminPassword) {
  
    next(); // Allow access
  } else {

    return res.status(403).json({ error: 'Access denied: Admins only' });
  }
};

module.exports = { authenticateUser, authorizeAdmin }; // Ensure this line is present

