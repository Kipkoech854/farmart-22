import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SuccessPopup } from '../Utils/SucessPopUp';
import '../Stylesheets/Register.css';

export const Register = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer',
  });

  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    const url =
      formData.role === 'farmer'
        ? 'https://farmart-y80m.onrender.com/api/farmers/farmers/register'
        : 'https://farmart-y80m.onrender.com/auth/register';

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Registration failed');
      }

      setShowPopup(true);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (showPopup) {
      const timeout = setTimeout(() => {
        navigate('/login');
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [showPopup, navigate]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <div className="register-video-container">
      <video
        ref={videoRef}
        src="/videos/Farmart-video-compressed.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          zIndex: -1
        }}
      />
      <div className="form-overlay">
        <div className="form-box">
          <h2 className="form-title">Create an</h2>
          {error && <p className="form-error">{error}</p>}
          <form onSubmit={handleSubmit} className="form-fields">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input id="username" type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm</label>
              <input id="confirmPassword" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required />
            </div>

            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select id="role" name="role" value={formData.role} onChange={handleChange} required>
                <option value="customer">Customer</option>
                <option value="farmer">Farmer</option>
              </select>
            </div>

            <button type="submit" className="form-button">Sign Up</button>
          </form>

        </div>
      </div>
      {showPopup && (
        <SuccessPopup
          message="Check your email for the verification link."
          showPopup={true}
        />
      )}
    </div>
  );
};
