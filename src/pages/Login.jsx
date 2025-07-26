import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Stylesheets/Login.css';
import { SuccessPopup } from '../Utils/SucessPopUp';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
  setErrorMsg('');
  const credentials = { email, password };

  try {
    const farmerRes = await axios.post('http://127.0.0.1:5555/api/farmers/farmers/login', credentials);
    console.log('Farmer login response:', farmerRes.data);

    const token = farmerRes.data.token;
    const farmer = farmerRes.data.farmer || farmerRes.data.user || farmerRes.data;

    localStorage.setItem("user", JSON.stringify({ token, ...farmer })); // ✅ all in one

    setShowPopup(true);
    return;
  } catch (farmerError) {
    console.warn("Farmer login failed:", farmerError.response?.data || farmerError.message);
  }

  try {
    const userRes = await axios.post('http://127.0.0.1:5555/auth/login', credentials);
    console.log('User login response:', userRes.data);

    const token = userRes.data.token;
    const user = userRes.data.user;

    localStorage.setItem("user", JSON.stringify({ token, ...user })); // ✅ all in one

    setShowPopup(true);
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
