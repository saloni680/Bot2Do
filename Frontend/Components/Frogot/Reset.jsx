import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(null); // null, true, or false
  const [errorMessage, setErrorMessage] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

    // Regex for password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#$%^&*()_+{}\[\]:;"'<>,.?/\\|`~])[A-Za-z\d@!#$%^&*()_+{}\[\]:;"'<>,.?/\\|`~]{8,}$/;

    // Determine if the password meets all the criteria
    const isPasswordValid = passwordRegex.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[@!#$%^&*()_+{}\[\]:;"'<>,.?/\\|`~]/.test(password);
    const doPasswordsMatch = password === confirmPassword;
  
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch(`/api/auth/reset-password/${id}/${token}`);
        const data = await response.json();
        if (data.valid) {
          setIsValid(true);
        } else {
          setIsValid(false);
          setErrorMessage(data.message || 'Invalid or expired token');
        }
      } catch (error) {
        setIsValid(false);
        setErrorMessage('An error occurred while verifying the token.');
      }
    };

    verifyToken();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isPasswordValid) {
      setError("Password must be at least 8 characters long, contain 1 uppercase & 1 lowercase letter, at least one digit, and one special character.");
      return;
    }
    if (!doPasswordsMatch) {
      setError('Passwords do not match.');
      return;
    }
  
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5001/api/auth/reset-password/${id}/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to update password');
        return;
      }
  
      const result = await response.json();
  
      if (result.success) {
        navigate('/login'); // Redirect to login page
      } else {
        alert(result.message || 'Failed to update password');
      }
    } catch (error) {
      alert('An error occurred while updating the password.');
    }
  };
  return (
    <>
    <div className="main">
      <section className="left"></section>
      <div className="rightside">
        <div className="inner">
        <img  style={{marginTop:"20px",marginLeft:"100px"}} src="https://s3-alpha-sig.figma.com/img/3fbb/eb23/f215cbe8b2bd64fe551bddbf5758556a?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qdPlW6exFfB~ZPERSRS6jBFQNbBDediH3IAb8a94-s5UVCa5gXUBLb66pH1ZR8GyJCJaOnTke30KFav6gsBGzG2shynwzXnVKJ1~FiHeXm1HT6Q98TOxdnvvAuM-ijX5DI-u3co3JK-2zVMty5uBND6jkAv1KezGmZ378ByQLblQs4NCJRpj2W8qkC0g7CbpcV9k4yXbAaxJcfD9oDmEJBtaKHYe~9--zxMtRniBVi-5KF~R86BiJkG6oudQXI9gehiGFk~Xw7~5Az7MUIb5avL4iVcJF4dE1LQ53hmiFP0zY4wHC6gd-~i3GR-H-Qa-1d248sT3y9Xbum29xe2T4A__" alt="" />
        <div>
      <h1 style={{marginLeft:"30px",marginTop:"-30px"}}>Reset Password</h1>
      <br /><br />
      <form onSubmit={handleSubmit}>
        <label htmlFor="Password">Password <span style={{color:"red"}}> *</span></label>
        <input 
          type="password" 
          name="password" 
          placeholder="Enter new password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        <label htmlFor="CPassword">Confirm Password <span style={{color:"red"}}> *</span></label>
        <input 
          type="password" 
          name="confirmPassword" 
          placeholder="Confirm password" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required 
        />
        <br /><br />
        <ul className="validation-list" >
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
        <button type="submit">Submit</button>
        <br /><br />
      </form>
    </div>
   
        </div>
      </div>
    </div>
    </>
  );
};

export default ResetPassword;
