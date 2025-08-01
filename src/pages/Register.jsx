import React, { useState, useEffect, useRef } from 'react';
import '../../src/Stylesheets/Register.css';
import { register } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // NEW
  const [showPassword, setShowPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  });

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async e => {
  e.preventDefault();
  setError('');

  if (formData.password !== formData.confirmPassword) {
    setError('Passwords do not match.');
    return;
  }

  try {
    setLoading(true); // Start loading

    const submitData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      // These two are optional, included if needed:
      phone: formData.phone || undefined,
      profile_picture: formData.profile_picture || undefined
    };

    let endpoint = '';
    if (formData.role === 'farmer') {
      endpoint = 'https://farmart-y80m.onrender.com/api/farmers/farmers/register';
    } else {
      // Treat any non-farmer role as a normal user
      submitData.role = formData.role;
      endpoint = 'https://farmart-y80m.onrender.com/auth/register';
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(submitData)
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result?.msg || result?.error || 'Registration failed.');
    }

    setShowPopup(true); // Show success
  } catch (err) {
    console.error('Registration error:', err);
    setError(err.message || 'Registration failed.');
  } finally {
    setLoading(false); // Stop loading
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
          <h2 className="form-title">Create an Account</h2>
          {error && <p className="form-error">{error}</p>}
          {showPopup && <p className="form-success">Registration successful! Redirecting...</p>}
          <form onSubmit={handleSubmit} className="form-fields">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="customer">User</option>
                <option value="farmer">Farmer</option>
              </select>
            </div>

            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="toggle-password-btn"
            >
              {showPassword ? 'Hide Passwords' : 'Show Passwords'}
            </button>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
