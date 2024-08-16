import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Forgot = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(null); // Track success or failure
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5001/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();

            if (res.ok) {
                setMessage('Password reset link sent successfully!');
                setIsSuccess(true); // Indicate success
            } else {
                setMessage(data.error || 'Failed to send password reset link.');
                setIsSuccess(false); // Indicate failure
            }
        } catch (error) {
            setMessage('An error occurred while sending the password reset link.');
            setIsSuccess(false); // Indicate failure
        }
    };

    const goBackPage = () => {
        navigate(-1); // Navigate to the previous page
    };

    return (
        <>
            <div className="main">
                <section className="left"></section>
                <div className="rightside">
                    <div className="inner">
                        <img style={{ marginTop: "20px", marginLeft: "100px" }} src="https://s3-alpha-sig.figma.com/img/3fbb/eb23/f215cbe8b2bd64fe551bddbf5758556a?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qdPlW6exFfB~ZPERSRS6jBFQNbBDediH3IAb8a94-s5UVCa5gXUBLb66pH1ZR8GyJCJaOnTke30KFav6gsBGzG2shynwzXnVKJ1~FiHeXm1HT6Q98TOxdnvvAuM-ijX5DI-u3co3JK-2zVMty5uBND6jkAv1KezGmZ378ByQLblQs4NCJRpj2W8qkC0g7CbpcV9k4yXbAaxJcfD9oDmEJBtaKHYe~9--zxMtRniBVi-5KF~R86BiJkG6oudQXI9gehiGFk~Xw7~5Az7MUIb5avL4iVcJF4dE1LQ53hmiFP0zY4wHC6gd-~i3GR-H-Qa-1d248sT3y9Xbum29xe2T4A__" alt="" />
                        <br /><br /><br />
                        <div className="backarrow" style={{ marginTop: "-60px", marginLeft: "30px" }}>
                            <button type="button" onClick={goBackPage}><i className="fa-solid fa-arrow-left" style={{ color: "white" }}></i></button>
                            <div className="title">Forgot Password </div>
                        </div>
                        <p style={{ marginLeft: "30px" }}>Before resetting, think of all possible passwords!</p>
                        <br /><br /><br />
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="Email">Email<span style={{ color: "red" }}>*</span></label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <br /><br />
                            <button type="submit" style={{ width: "150px" }}>Send Reset Link</button>
                        </form>
                        <br /><br />
                        {/* Display message based on success or failure */}
                        {message && (
                            <p style={{ color: isSuccess ? 'green' : 'red' }}>
                                {message}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Forgot;
