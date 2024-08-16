
const mongoose = require('mongoose'); // Mongoose library for MongoDB object modeling
const bcrypt = require('bcryptjs'); // Bcrypt library for hashing and comparing passwords

// Define the user schema using Mongoose
const userSchema = new mongoose.Schema({
  email: {
    type: String, // Data type for email
    required: true, // This field is mandatory
    unique: true, // Ensures email addresses are unique in the collection
  },
  password: {
    type: String, // Data type for password
    required: true, // This field is mandatory
  },
  googleId: String, // Optional field for storing Google ID if the user logs in with Google
});

// Middleware to hash the password before saving to the database
userSchema.pre('save', async function(next) {
  // Check if the password field has been modified (e.g., during registration or password update)
  if (this.isModified('password')) {
    // Hash the password using bcrypt with a salt round of 12
    this.password = await bcrypt.hash(this.password, 12);
  }
  // Continue with the save operation
  next();
});

// Method to compare a candidate password with the hashed password in the database
userSchema.methods.comparePassword = async function(candidatePassword) {
  // Compare the candidate password with the hashed password
  return bcrypt.compare(candidatePassword, this.password);
};

// Create the User model using the defined schema
const User = mongoose.model('User', userSchema);

// Export the User model to be used in other parts of the application
module.exports = User;
