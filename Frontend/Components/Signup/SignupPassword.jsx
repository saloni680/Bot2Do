import React, { useState } from 'react';
import './Password.css';
import { useNavigate } from 'react-router-dom';

const SetPassword = () => {
  const navigate = useNavigate()
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Regex for password validation
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#$%^&*()_+{}\[\]:;"'<>,.?/\\|`~])[A-Za-z\d@!#$%^&*()_+{}\[\]:;"'<>,.?/\\|`~]{8,}$/;

  // Determine if the password meets all the criteria
  const isPasswordValid = passwordRegex.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecialChar = /[@!#$%^&*()_+{}\[\]:;"'<>,.?/\\|`~]/.test(password);
  const doPasswordsMatch = password === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!isPasswordValid) {
      setError("Password must be at least 8 characters long, contain 1 uppercase & 1 lowercase letter, at least one digit, and one special character.");
      return;
    }
    if (!doPasswordsMatch) {
      setError('Passwords do not match.');
      return;
    }

    const email = localStorage.getItem('signupEmail'); // Retrieve email from local storage

    try {
      const response = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess('Password set successfully!');
        localStorage.removeItem('signupEmail'); // Clean up
        navigate('/dashboard')

      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('Failed to set password. Please try again.');
    }
  };

  return (
    <div className="main">
      <section className="left">
        <img src="./Components/leftsideB2d.png" alt="" srcset="" />
      </section>

      <div className="rightside">
        <div className="inner">
          <img src="https://s3-alpha-sig.figma.com/img/3fbb/eb23/f215cbe8b2bd64fe551bddbf5758556a?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qdPlW6exFfB~ZPERSRS6jBFQNbBDediH3IAb8a94-s5UVCa5gXUBLb66pH1ZR8GyJCJaOnTke30KFav6gsBGzG2shynwzXnVKJ1~FiHeXm1HT6Q98TOxdnvvAuM-ijX5DI-u3co3JK-2zVMty5uBND6jkAv1KezGmZ378ByQLblQs4NCJRpj2W8qkC0g7CbpcV9k4yXbAaxJcfD9oDmEJBtaKHYe~9--zxMtRniBVi-5KF~R86BiJkG6oudQXI9gehiGFk~Xw7~5Az7MUIb5avL4iVcJF4dE1LQ53hmiFP0zY4wHC6gd-~i3GR-H-Qa-1d248sT3y9Xbum29xe2T4A__" alt="" />

          <div className="password-setup">
            <h4>Set Up Password</h4>
            <p>This will take some effort, Relax and then get started!</p>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <br /><br />
                <label htmlFor="password">Set-up your 8+ digits password</label><br />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='AZPSapog123'
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password:</label><br />
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder='AZPSapog123'
                  required
                />
              </div>
              {error && <p className="error">{error}</p>}
              {success && <p className="success">{success}</p>}
              <ul className="validation-list">
              <li className={password.length >= 8 ? 'valid' : 'invalid'}>
                Password must be at least 8 characters long.
              </li>
              <li className={(hasUppercase && hasLowercase) ? 'valid' : 'invalid'}>
                Password must contain 1 Uppercase letter & 1 lowercase.
              </li>
              <li className={hasDigit ? 'valid' : 'invalid'}>
                Password must contain at least one digit.
              </li>
              <li className={hasSpecialChar ? 'valid' : 'invalid'}>
                Password must contain at least one special character like !, @, #, $, etc.
              </li>
            </ul>

              <button type="submit" style={{marginLeft:"30px"}}>Save</button>
              <br /><br />
            </form>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetPassword;
