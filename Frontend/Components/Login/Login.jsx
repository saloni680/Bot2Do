import React, { useState } from 'react';
import "./login.css";
import GoogleSignInButton from '../GoogleSignInButton';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setSuccess('Login successful!');
        navigate('/dashboard');
      } else {
        // Reset previous errors
        setEmailError('');
        setPasswordError('');

        // Handle specific error messages from the server
        if (data.error.includes('email')) {
          setEmailError("This email id seems incorrect. Please try again!");
        }
        if (data.error.includes('password')) {
          setPasswordError("The password you entered is incorrect. Please try again!");
        }
        setError('Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <>
      <div className="main">
        <div className="left"></div>
        <div className="rightside">
          <div className="inner">
            <img
              src="https://s3-alpha-sig.figma.com/img/3fbb/eb23/f215cbe8b2bd64fe551bddbf5758556a?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qdPlW6exFfB~ZPERSRS6jBFQNbBDediH3IAb8a94-s5UVCa5gXUBLb66pH1ZR8GyJCJaOnTke30KFav6gsBGzG2shynwzXnVKJ1~FiHeXm1HT6Q98TOxdnvvAuM-ijX5DI-u3co3JK-2zVMty5uBND6jkAv1KezGmZ378ByQLblQs4NCJRpj2W8qkC0g7CbpcV9k4yXbAaxJcfD9oDmEJBtaKHYe~9--zxMtRniBVi-5KF~R86BiJkG6oudQXI9gehiGFk~Xw7~5Az7MUIb5avL4iVcJF4dE1LQ53hmiFP0zY4wHC6gd-~i3GR-H-Qa-1d248sT3y9Xbum29xe2T4A__"
              alt="Login"
            />
          </div>

          <form onSubmit={handleSubmit} style={{marginLeft:"30px"}}>
            <h3>Sign In</h3>
            <p>Hello there! Welcome back, Sign In to continue where you left!</p>

            <label htmlFor="email">
              Email<span style={{ color: "red" }}>*</span>
            </label><br />
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your registered email id like abc1234@gmail.com'
              required
            />
            {emailError && <p className='error'>{emailError}</p>}

            <label htmlFor="password">
              Password<span style={{ color: "red" }}>*</span>
            </label><br />
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter the password you created for your account'
              required
            />
            {passwordError && <p className='error'>{passwordError}</p>}
            <br /><br />
            <div className="sub-forgot">
              <button type='submit'>Sign In</button>
              <a href="./forgot">Forgot password?</a>
            </div>
          </form>

          {/* Display success and error messages */}
          {success && <p className="success">{success}</p>}
          {error && <p className="error">{error}</p>}

          <div className="hrs">
            <hr className='hr1' style={{ color: "white" }} />
            <span className='or'>OR</span>
            <hr className='hr2' style={{ color: "white" }} />
          </div>
          <div className="logos">
            <GoogleSignInButton />
            {/* <button><i class="fa-brands fa-microsoft"></i></button> */}
          </div>
          <h5>Don't Have an account? <a href="./">Sign Up</a></h5>
        </div>
      </div>
    </>
  );
};

export default Login;
