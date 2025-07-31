import React, { useState, useEffect } from 'react';
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
  const navigate = useNavigate();
  const { login } = useAuth();


  const handleLogin = async () => {
    setErrorMsg('');
    localStorage.removeItem("user");

    const credentials = { email, password };

   /* try {
      // 1. Try FARMER login
      const farmerRes = await axios.post('https://farmart-y80m.onrender.com//api/farmers/farmers/login', credentials);
      const token = farmerRes.data.token;
      const farmer = farmerRes.data.farmer || farmerRes.data.user || farmerRes.data;

      localStorage.setItem("user", JSON.stringify({ token, ...farmer }));
      login(token);
      setShowPopup(true);
      return;
    } catch (farmerError) {
      console.warn("Farmer login failed:", farmerError.response?.data || farmerError.message);
    }
*/
    try {
      // 2. Try USER login if farmer login failed
      const userRes = await axios.post('https://farmart-y80m.onrender.com/auth/login', credentials);
      const token = userRes.data.access_token || userRes.data.token;
      const user = userRes.data.user || {};

      if (typeof token === 'string' && token.length > 10) {
        localStorage.setItem("user", JSON.stringify({ token, ...user }));
        login(token);
        setShowPopup(true);
      } else {
        throw new Error('Token not found in user login response');
      }
    } catch (userError) {
      console.warn("User login failed:", userError.response?.data || userError.message);
      setErrorMsg('Invalid credentials for both farmer and user.');
    }
  };





  // Auto-close popup and navigate after 2 seconds
  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
        navigate('/shop');
      }, 2000);

      return () => clearTimeout(timer); // cleanup
    }
  }, [showPopup, navigate]);

  return (
    <div className="login-container">
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
            />
          </div>

          <button
            type="button"
            onClick={handleLogin}
            className="login-button"
          >
            Log In
          </button>
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