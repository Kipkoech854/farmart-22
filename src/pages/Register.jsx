import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SuccessPopup } from '../Utils/SucessPopUp'; 
import '../Stylesheets/Register.css';


export const Register = () => {
  const navigate = useNavigate();
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

      setShowPopup(true); // Show the popup
    } catch (err) {
      setError(err.message);
    }
  };

  // Auto-redirect after showing popup
  useEffect(() => {
    if (showPopup) {
      const timeout = setTimeout(() => {
        navigate('/login');
      }, 3000); // ⏳ 3 seconds

      return () => clearTimeout(timeout); // Clean up on unmount
    }
  }, [showPopup, navigate]);

  return (
    <>
      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">Register</h2>
          {error && <p className="login-error">{error}</p>}
          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="customer">Customer</option>
              <option value="farmer">Farmer</option>
            </select>

            <button type="submit" className="login-button">Sign Up</button>
          </form>
        </div>
      </div>

      {showPopup && (
        <SuccessPopup
          message="Check your email for the verification link."
          showPopup={true}
        />
      )}
    </>
  );
};
