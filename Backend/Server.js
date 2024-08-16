// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const bcrypt = require('bcrypt');
// const { OAuth2Client } = require('google-auth-library');
// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors({  
//   origin: 'http://localhost:5173',
//   methods: 'GET, POST',
//   credentials: true,
// }));
// app.use(express.urlencoded({extended:false}))

// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// const authRoutes = require('./Routes/auth');
// app.use('/api/auth', authRoutes);


// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


// Import required modules
const express = require('express'); // Express framework for building the server
const mongoose = require('mongoose'); // Mongoose for MongoDB object modeling
const cors = require('cors'); // CORS middleware for handling cross-origin requests
const dotenv = require('dotenv'); // Dotenv for loading environment variables
const bcrypt = require('bcrypt'); // Bcrypt for hashing passwords
const { OAuth2Client } = require('google-auth-library'); // Google OAuth2 Client for authentication

// Initialize dotenv to load environment variables from a .env file
dotenv.config();

// Create an instance of the Express application
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to handle CORS (Cross-Origin Resource Sharing)
app.use(cors({  
  origin: 'http://localhost:5173', // Allow requests from this origin (frontend application)
  methods: 'GET, POST', // Allow only GET and POST methods
  credentials: true, // Allow cookies to be sent with requests
}));

// Middleware to parse URL-encoded data (e.g., form submissions)
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, // Use the new URL parser for MongoDB connections
  useUnifiedTopology: true // Use the new unified topology layer for MongoDB
});

// Import and use the authentication routes
const authRoutes = require('./Routes/auth'); // Import routes defined in auth.js
app.use('/api/auth', authRoutes); // Mount the routes at the /api/auth path

// Define the port for the server to listen on
const PORT = process.env.PORT || 5001; // Use environment variable PORT or default to 5001

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`); // Log the server URL to the console
});
