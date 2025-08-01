import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../Stylesheets/Login.css';
import { SuccessPopup } from '../Utils/SucessPopUp';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const videoRef = useRef(null);

  const handleLogin = async () => {
    setErrorMsg('');
    setLoading(true);
    localStorage.removeItem('user');

    const credentials = { email, password };

    try {
      const farmerRes = await axios.post(
        'https://farmart-y80m.onrender.com/api/farmers/farmers/login',
        credentials
      );
      const token = farmerRes.data.token;
      const farmer = farmerRes.data.farmer || farmerRes.data.user || farmerRes.data;

      if (token) {
        localStorage.setItem('user', JSON.stringify({ token, ...farmer }));
        login(token);
        setShowPopup(true);
        return;
      }
    } catch (farmerError) {
      console.warn('Farmer login failed:', farmerError.response?.data || farmerError.message);
    }

    try {
      const userRes = await axios.post(
        'https://farmart-y80m.onrender.com/auth/login',
        credentials
      );
      const token = userRes.data.access_token || userRes.data.token;
      const user = userRes.data.user || {};

      if (typeof token === 'string' && token.length > 10) {
        localStorage.setItem('user', JSON.stringify({ token, ...user }));
        login(token);
        setShowPopup(true);
        return;
      } else {
        throw new Error('Token not found in user login response');
      }
    } catch (userError) {
      console.warn('User login failed:', userError.response?.data || userError.message);
      setErrorMsg('Invalid credentials for both farmer and user.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
        navigate('/shop');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showPopup, navigate]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <div className="login-container">
      <video
        ref={videoRef}
        src="/videos/Farmart-video-compressed.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: -1,
        }}
      />

      <div className="login-box">
        <h2 className="login-title">Login to your account</h2>

        {errorMsg && <div className="login-error">{errorMsg}</div>}

        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="login-label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="login-label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="button"
            className="login-button"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>

          <p style={{ textAlign: 'center', marginTop: '10px' }}>
            Don’t have an account? <a href="/signup">Sign up</a>
          </p>
        </form>
      </div>

      {showPopup && (
        <SuccessPopup
          message="Login successful. Redirecting to shop..."
          showPopup={showPopup}
        />
      )}
    </div>
  );
};

export default Login;






