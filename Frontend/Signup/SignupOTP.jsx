
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleSignInButton from '../GoogleSignInButton';
import emailjs from '@emailjs/browser';

const SignupOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // State for OTP input
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // State for success messages
  const [resendStatus, setResendStatus] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for resend OTP
  const navigate = useNavigate(); // Use navigate for routing
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const { value } = e.target;

    if (/^\d$/.test(value)) { // Validate that the input is a single digit
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input box
      if (index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // Move to the previous input box if the current box is empty
        inputRefs.current[index - 1].focus();
      } else if (otp[index]) {
        // Clear the current box if there's a value
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    const storedOtp = localStorage.getItem('generatedOtp');
    const storedEmail = localStorage.getItem('signupEmail');

    if (!storedOtp || !storedEmail) {
      setError('Invalid session. Please request a new OTP.');
      return;
    }

    if (enteredOtp === storedOtp) {
      setSuccess('OTP verified successfully.');
      navigate('/signuppass'); // Redirect or perform other actions
    } else {
      setError('Invalid OTP entered. Please re-check your email and enter!');
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setResendStatus('');
    setError(''); // Clear any existing error messages

    const storedEmail = localStorage.getItem('signupEmail');

    if (!storedEmail) {
      setResendStatus('No email found in session.');
      setLoading(false);
      return;
    }

    try {
      // Generate a new OTP and save it in localStorage
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
      localStorage.setItem('generatedOtp', newOtp);

      // Send OTP email using EmailJS
      const templateParams = {
        to_email: storedEmail, // Ensure this matches your template variable
        otp: newOtp, // Ensure this matches your template variable
        to_name: 'User', // Optional: if you need to include this variable in your template
        from_name: 'YourApp', // Optional: if you need to include this variable in your template
      };

      const response = await emailjs.send(
        'service_z4xkfdb', // EmailJS service ID
        'template_97w678h', // EmailJS template ID
        templateParams,
        'cSsew6UYrSOkbmWBh' // EmailJS user ID
      );
      console.log("New OTP is:", newOtp);

      if (response.status === 200) {
        setSuccess('OTP resent successfully! Check your email.');
      } else {
        setResendStatus('Failed to resend OTP.');
      }
    } catch (error) {
      setResendStatus('An error occurred while resending OTP.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    inputRefs.current[0]?.focus(); // Focus the first input box on mount
  }, []);

  const goBackPage = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <>
      <div className="main">
        <section className='left'></section>

        <div className="rightside">
          <div className="inner">
            <img style={{ marginTop: "20px", marginLeft: "100px" }} src="https://s3-alpha-sig.figma.com/img/3fbb/eb23/f215cbe8b2bd64fe551bddbf5758556a?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qdPlW6exFfB~ZPERSRS6jBFQNbBDediH3IAb8a94-s5UVCa5gXUBLb66pH1ZR8GyJCJaOnTke30KFav6gsBGzG2shynwzXnVKJ1~FiHeXm1HT6Q98TOxdnvvAuM-ijX5DI-u3co3JK-2zVMty5uBND6jkAv1KezGmZ378ByQLblQs4NCJRpj2W8qkC0g7CbpcV9k4yXbAaxJcfD9oDmEJBtaKHYe~9--zxMtRniBVi-5KF~R86BiJkG6oudQXI9gehiGFk~Xw7~5Az7MUIb5avL4iVcJF4dE1LQ53hmiFP0zY4wHC6gd-~i3GR-H-Qa-1d248sT3y9Xbum29xe2T4A__" alt="" />

            <form className="form" onSubmit={handleVerifyOtp}>
              <div className="info">
                <div className="backarrow">
                  <button type="button" onClick={goBackPage}><i className="fa-solid fa-arrow-left"></i></button>
                  <div className="title">Enter OTP </div>
                </div>
                <p className="description">Fill in the 6-digit OTP you received in your email.</p>
              </div>
              <label htmlFor="otp">OTP<span style={{ color: "red" }}>*</span></label>
              <div className="inputs">
                {otp.map((value, index) => (
                  <input
                    key={index}
                    type="tel"
                    maxLength="1"
                    value={value}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="otp-input"
                  />
                ))}
              </div>
              {error && <p className="error">{error}</p>}
              {success && <p className="success">{success}</p>}
              <br />
              <button type="submit" className="validate">Confirm & Signup</button>
              <p className="resend">
                Didn't receive OTP?{' '}
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={loading}
                  className="resend-action"
                  style={{ width: "100px" }}
                >
                  {loading ? 'Resending...' : 'Resend Now'}
                </button>
                {resendStatus && <p className="resend-status">{resendStatus}</p>}
              </p>
            </form>
          </div>
          <div className="hrs">
            <hr className='hr1' style={{ color: "white" }} />
            <span className='or'>OR</span>
            <hr className='hr2' style={{ color: "white" }} />
          </div>

          <div className="logos">
            <GoogleSignInButton />
          </div>
          <h5>Already Have an account <a href="./login">Log in</a></h5>
        </div>
      </div>
    </>
  );
};

export default SignupOTP;
