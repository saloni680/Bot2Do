// const express = require('express');
// const router = express.Router();
// const User = require('../Models/User');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const user = require('../Models/User')
// const nodemailer = require('nodemailer'); 
// const JWT_SECRET = process.env.JWT_SECRET;
// const { OAuth2Client } = require('google-auth-library');



// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// // Route to handle Google OAuth
// router.post('/google', async (req, res) => {
//   const { idToken } = req.body;
//   console.log(req.body);
//   try {
//     // Verify the token with Google
//     const ticket = await client.verifyIdToken({
//       idToken,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });
//     console.log(ticket);
//     // Get user info from the token
//     const payload = ticket.getPayload();
//     const userid = payload.sub;

//     // You can now create a session or JWT token for your application
//     // Example response
//     res.json({
//       message: 'Google authentication successful',
//       userId: userid,
//       email: payload.email,
//       name: payload.name,
//     });
//   } catch (error) {
//     console.error('Error verifying token:', error);
//     res.status(401).json({ error: 'Invalid token' });
//   }
// });
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });
// const session = require('express-session');
// // Session setup
// router.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false } // Set to true if using HTTPS
// }));



// // Register new user
// router.post('/register', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = new User({ email, password });
//     await user.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// //Login
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if the user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Compare the password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ error: 'Invalid credentials' });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.status(200).json({ message: 'Login successful', token });
//   } catch (err) {
//     console.error(err); // Log the error for debugging
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// router.post('/forgot-password', async (req, res) => {
//   console.log("in forgot");
//   const { email } = req.body;
 
//   try {
//     console.log("before find");
//     console.log(email);     
//     const olduser = await User.findOne({ email });
//     if (!olduser) {
//       return res.json({ error: 'User not found' });
//     }
//     console.log("after find");
    
//     const secret = JWT_SECRET + olduser.password;
//     const token = jwt.sign(
//       { email: olduser.email, id: olduser._id },
//       secret,
//       { expiresIn: '20m' }
//     );
//     console.log("id is:",olduser._id);
    
//     console.log("token is :",token);
    
    
//     const link = `http://localhost:5173/reset-password/${olduser._id}/${token}`;
//     console.log("link is :",link);
//     console.log(link);
    
//     // Send the reset link via email
//     await transporter.sendMail({
//       to: email,
//       subject: 'Password Reset Link',
//       html: `<p>Click <a href="${link}">here</a> to reset your password.</p>`,
      
//     });

//   } catch (error) {}

// });


// router.get('/reset-password/:id/:token', async (req, res) => {
//   const { id, token } = req.params;
  
//   try {
//     // Find the user by ID
//     const olduser = await User.findById(id);
//     if (!olduser) {
//       return res.status(404).json({ error: 'User not found' });
//     }
    
//     // Create a secret key based on the user's password
//     const secret = JWT_SECRET + olduser.password;
    
//     // Verify the token
//     jwt.verify(token, secret);
//     res.status(200).json({ valid: true }); // Token is valid
    
//   } catch (error) {
//     // Invalid or expired token
//     res.status(400).json({ valid: false, message: 'Invalid or expired token' });
//   }
// });


// router.post('/reset-password/:id/:token', async (req, res) => {
//   const { id, token } = req.params;
//   const { password } = req.body;

//   try {
//     // Find the user by ID
//     const olduser = await User.findById(id);
//     if (!olduser) {
//       return res.status(404).json({ error: 'User not found' });
//     }
    
//     // Create a secret key based on the user's password
//     const secret = JWT_SECRET + olduser.password;
    
//     // Verify the token
//     jwt.verify(token, secret);
    
//     // Hash the new password
//     const hashedPassword = await bcrypt.hash(password, 10);
    
//     // Update the user's password
//     await User.updateOne({ _id: id }, { $set: { password: hashedPassword } });
    
//     res.status(200).json({ success: true, message: 'Password updated successfully' });
    
//   } catch (error) {
//     console.error('Error during password reset:', error);
//     res.status(400).json({ status: 'error', message: 'Invalid or expired token' });
//   }
// });




// console.log('Exporting router:', router);
// module.exports = router;



const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer'); 
const JWT_SECRET = process.env.JWT_SECRET;
const { OAuth2Client } = require('google-auth-library');

// Initialize Google OAuth2 client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Route to handle Google OAuth
router.post('/google', async (req, res) => {
  const { idToken } = req.body;
  console.log(req.body);
  
  try {
    // Verify the token with Google
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    console.log(ticket);
    
    // Extract user information from the token
    const payload = ticket.getPayload();
    const userid = payload.sub;

    // Respond with user information
    res.json({
      message: 'Google authentication successful',
      userId: userid,
      email: payload.email,
      name: payload.name,
    });
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Create an email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Initialize session management
const session = require('express-session');
router.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Route to register a new user
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Create a new user and save to database
    const user = new User({ email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to login a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to handle forgotten password request
router.post('/forgot-password', async (req, res) => {
  console.log("in forgot");
  const { email } = req.body;

  try {
    console.log("before find");
    console.log(email);     
    // Find user by email
    const olduser = await User.findOne({ email });
    if (!olduser) {
      return res.json({ error: 'User not found' });
    }
    console.log("after find");

    // Create a secret key based on the user's password
    const secret = JWT_SECRET + olduser.password;
    const token = jwt.sign(
      { email: olduser.email, id: olduser._id },
      secret,
      { expiresIn: '20m' }
    );
    console.log("id is:", olduser._id);
    console.log("token is :", token);

    // Create a password reset link
    const link = `http://localhost:5173/reset-password/${olduser._id}/${token}`;
    console.log("link is :", link);

    // Send the reset link via email
    await transporter.sendMail({
      to: email,
      subject: 'Password Reset Link',
      html: `<p>Click <a href="${link}">here</a> to reset your password.</p>`,
    });

    res.status(200).json({ message: 'Password reset link sent' });
  } catch (error) {
    console.error('Error sending reset email:', error);
    res.status(500).json({ error: 'Failed to send reset email' });
  }
});

// Route to verify the password reset token
router.get('/reset-password/:id/:token', async (req, res) => {
  const { id, token } = req.params;

  try {
    // Find the user by ID
    const olduser = await User.findById(id);
    if (!olduser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create a secret key based on the user's password
    const secret = JWT_SECRET + olduser.password;

    // Verify the token
    jwt.verify(token, secret);
    res.status(200).json({ valid: true }); // Token is valid
  } catch (error) {
    // Invalid or expired token
    res.status(400).json({ valid: false, message: 'Invalid or expired token' });
  }
});

// Route to reset the password
router.post('/reset-password/:id/:token', async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  try {
    // Find the user by ID
    const olduser = await User.findById(id);
    if (!olduser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create a secret key based on the user's password
    const secret = JWT_SECRET + olduser.password;

    // Verify the token
    jwt.verify(token, secret);

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password
    await User.updateOne({ _id: id }, { $set: { password: hashedPassword } });

    res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error during password reset:', error);
    res.status(400).json({ status: 'error', message: 'Invalid or expired token' });
  }
});

console.log('Exporting router:', router);
module.exports = router;
