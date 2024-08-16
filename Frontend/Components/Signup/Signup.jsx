import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';
import GoogleSignInButton from '../GoogleSignInButton';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();

    // Generate a random OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('Generated OTP:', generatedOtp);

    if (!email) {
      setError('Email address is required.');
      return;
    }

    try {
      const response = await emailjs.send(
        'service_z4xkfdb', // EmailJS service ID
        'template_97w678h', // EmailJS template ID
        {
          to_email: email, // Ensure this matches your template variable
          otp: generatedOtp, // Ensure this matches your template variable
          to_name: 'User', // Optional: if you need to include this variable in your template
          from_name: 'YourApp', // Optional: if you need to include this variable in your template
        },
        'cSsew6UYrSOkbmWBh' // EmailJS user ID
      );
      console.log('EmailJS response:', response);
      setMessage('OTP sent to your email!');

      // Store OTP and email in local storage
      localStorage.setItem('signupEmail', email);
      localStorage.setItem('generatedOtp', generatedOtp);

      // Redirect to the OTP verification page
      navigate('/signupOTP');
    } catch (error) {
      console.error('Error sending OTP:', error);
      setError('Failed to send OTP. Please try again.');
    }
  };

  return (
    <>
      <div className='main'>
        <section className='left'></section>
        <div className="rightside">
          <div className="inner">
            <img 
              src="https://s3-alpha-sig.figma.com/img/3fbb/eb23/f215cbe8b2bd64fe551bddbf5758556a?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qdPlW6exFfB~ZPERSRS6jBFQNbBDediH3IAb8a94-s5UVCa5gXUBLb66pH1ZR8GyJCJaOnTke30KFav6gsBGzG2shynwzXnVKJ1~FiHeXm1HT6Q98TOxdnvvAuM-ijX5DI-u3co3JK-2zVMty5uBND6jkAv1KezGmZ378ByQLblQs4NCJRpj2W8qkC0g7CbpcV9k4yXbAaxJcfD9oDmEJBtaKHYe~9--zxMtRniBVi-5KF~R86BiJkG6oudQXI9gehiGFk~Xw7~5Az7MUIb5avL4iVcJF4dE1LQ53hmiFP0zY4wHC6gd-~i3GR-H-Qa-1d248sT3y9Xbum29xe2T4A__" 
              alt="Signup" 
            />
            <form onSubmit={handleSendOtp}>
              <h3>Sign Up</h3>
              <p>Hello there! Looks like you are new here, Sign Up now.</p>
              <label htmlFor="email">Enter Email<span style={{color: "red"}}>*</span></label>
              <br />
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter your email id like abc1234@gmail.com'
                required
              />
              <br /><br />
              <button type="submit" style={{ width: "150px" }}>Generate OTP</button>
              {message && <p className="success">{message}</p>}
              {error && <p className="error">{error}</p>}
            </form>
          </div>
          <div className="hrs">
            <hr className='hr1' style={{ color: "red" }} />
            <span className='or'>OR</span>
            <hr className='hr2' />
          </div>
          <div className="logos">
            <GoogleSignInButton />
            {/* <button><i class="fa-brands fa-microsoft"></i></button> */}
          </div>
          <h5>Already Have an account? <a href="./login">Log in</a></h5>
        </div>
      </div>
    </>
  );
};

export default Signup;
