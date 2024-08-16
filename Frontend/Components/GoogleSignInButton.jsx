
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom'; // Assuming you are using react-router for navigation

const GoogleSignInButton = () => {
  const navigate = useNavigate();

  const handleSuccess = (response) => {
    // Handle successful authentication
    const { credential } = response; // Extract token from response
    console.log("credential is ",credential);

    // Send token to your backend for verification and to create a session
    fetch('http://localhost:5001/api/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken: credential }), // Assuming your backend expects an idToken
    })
      .then((res) => res.json())
      .then((data) => {
        // Navigate to the desired location or handle success
        navigate('/dashboard'); // Example: redirect to dashboard on success
        console.log('Google login successful:', data);
      })
      .catch((error) => {
        // Handle errors if any
        console.error('Error during login:', error);
      });
  };

  const handleFailure = (error) => {
    // Handle authentication failure
    console.error('Google login failed:', error);
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleFailure}
        theme="outline" // Optional: outline style for the button
      />
    </div>
  );
};

export default GoogleSignInButton;
