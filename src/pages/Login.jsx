import React, { useState, useEffect } from 'react';
import '../Stylesheets/Login.css';
import { SuccessPopup } from '../Utils/SucessPopUp';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
// import { loginUser } from '../services/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    setErrorMsg('');
    const credentials = { email, password };

    // Try Farmer Login
    try {
      const farmerRes = await axios.post('https://farmart-y80m.onrender.com/api/farmers/login', credentials);
      const token = farmerRes.data.token;
      const farmer = farmerRes.data.farmer || farmerRes.data.user || farmerRes.data;
      localStorage.setItem("user", JSON.stringify({ token, ...farmer }));
      login(token);
      setShowPopup(true);
      return;
    } catch (farmerError) {
      console.warn("Farmer login failed:", farmerError.response?.data || farmerError.message);
    }

    // Try Customer Login
    try {
      const userRes = await axios.post('https://farmart-y80m.onrender.com/auth/login', credentials);
      const token = userRes.data.token;
      const user = userRes.data.user;
      localStorage.setItem("user", JSON.stringify({ token, ...user }));
      login(token);
      setShowPopup(true);
    } catch (userError) {
      console.warn("User login failed:", userError.response?.data || userError.message);
      setErrorMsg('Invalid credentials for both farmer and customer.');
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

  return (
    <>
      <div className="login-container">
        <div className="login-left">
          <h1>Welcome Back!</h1>
          <p>Log in to manage your farm and products</p>
        </div>

        <div className="login-right">
          <h2>Welcome</h2>
          {errorMsg && <div className="login-error">{errorMsg}</div>}

          <form className="login-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="button" onClick={handleLogin}>
              Log In
            </button>
            <p style={{ textAlign: 'center', marginTop: '10px' }}>
              Don’t have an account? <a href="/signup">Sign up</a>
            </p>
          </form>
        </div>
      </div>

      <footer className="login-footer">
        © 2025 Farmart. All rights reserved.
      </footer>

      {showPopup && (
        <SuccessPopup
          message="Login successful. Redirecting to shop..."
          showPopup={showPopup}
        />
      )}
    </>
  );
};

export default Login;





// import React, { useState } from 'react';
// import axios from 'axios';


// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const API_URL = import.meta.env.VITE_BACKEND_URL;

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post(`${API_URL}/auth/login`, {
//         email,
//         password,
//       });
//       console.log('Login success:', res.data);
//     } catch (err) {
//       console.error('Login failed:', err);
//       setError('Login failed. Please try again.');
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />
//       <button type="submit">Login</button>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </form>
//   );
// };

// export default Login;











// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../Stylesheets/Login.css';
// import { SuccessPopup } from '../Utils/SucessPopUp';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMsg, setErrorMsg] = useState('');
//   const [showPopup, setShowPopup] = useState(false);
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleLogin = async () => {
//     setErrorMsg('');
//     localStorage.removeItem("user");

//     const credentials = { email, password };

//     try {
//       const farmerRes = await axios.post(
//         'https://farmart-y80m.onrender.com//api/farmers/farmers/login',
//         credentials
//       );
//       const token = farmerRes.data.token;
//       const farmer = farmerRes.data.farmer || farmerRes.data.user || farmerRes.data;

//       localStorage.setItem("user", JSON.stringify({ token, ...farmer }));
//       login(token);
//       setShowPopup(true);
//       return;
//     } catch (farmerError) {
//       console.warn("Farmer login failed:", farmerError.response?.data || farmerError.message);
//     }

//     try {
//       const userRes = await axios.post('https://farmart-y80m.onrender.com/auth/login', credentials);
//       const token = userRes.data.access_token || userRes.data.token;
//       const user = userRes.data.user || {};

//       if (typeof token === 'string' && token.length > 10) {
//         localStorage.setItem("user", JSON.stringify({ token, ...user }));
//         login(token);
//         setShowPopup(true);
//       } else {
//         throw new Error('Token not found in user login response');
//       }
//     } catch (userError) {
//       console.warn("User login failed:", userError.response?.data || userError.message);
//       setErrorMsg('Invalid credentials for both farmer and user.');
//     }
//   };

//   useEffect(() => {
//     if (showPopup) {
//       const timer = setTimeout(() => {
//         setShowPopup(false);
//         navigate('/shop');
//       }, 2000);
//       return () => clearTimeout(timer);
//     }
//   }, [showPopup, navigate]);

//   return (
//     <>
//       <div className="login-container">
//         <div className="login-left">
//           <h1>Welcome Back!</h1>
//           <p>Log in to manage your farm and products</p>
//         </div>

//         <div className="login-right">
//           <h2>Welcome</h2>

//           {errorMsg && <div className="login-error">{errorMsg}</div>}

//           <form className="login-form" onSubmit={(e) => e.preventDefault()}>
//             <div className="form-group">
//               <input
//                 type="email"
//                 placeholder="you@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <input
//                 type="password"
//                 placeholder="••••••••"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>

//             <button type="button" onClick={handleLogin}>
//               Log In
//             </button>
//             <p style={{ textAlign: 'center', marginTop: '10px' }}>
//               Don’t have an account? <a href="/signup">Sign up</a>
//             </p>
//           </form>
//         </div>
//       </div>

//       <footer className="login-footer">
//         © 2025 Farmart. All rights reserved.
//       </footer>

//       {showPopup && (
//         <SuccessPopup
//           message="Login successful. Redirecting to shop..."
//           showPopup={showPopup}
//         />
//       )}
//     </>
//   );
// };

// export default Login;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../Stylesheets/Login.css';
// import { SuccessPopup } from '../Utils/SucessPopUp';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMsg, setErrorMsg] = useState('');
//   const [showPopup, setShowPopup] = useState(false);
//   const navigate = useNavigate();
//   const { login } = useAuth();


//   const handleLogin = async () => {
//   setErrorMsg('');
//   localStorage.removeItem("user");

//   const credentials = { email, password };

//   try {
//     // 1. Try FARMER login
//     const farmerRes = await axios.post('https://farmart-y80m.onrender.com//api/farmers/farmers/login', credentials);
//     const token = farmerRes.data.token;
//     const farmer = farmerRes.data.farmer || farmerRes.data.user || farmerRes.data;

//     localStorage.setItem("user", JSON.stringify({ token, ...farmer }));
//     login(token);
//     setShowPopup(true);
//     return;
//   } catch (farmerError) {
//     console.warn("Farmer login failed:", farmerError.response?.data || farmerError.message);
//   }

//   try {
//     // 2. Try USER login if farmer login failed
//     const userRes = await axios.post('https://farmart-y80m.onrender.com/auth/login', credentials);
//     const token = userRes.data.access_token || userRes.data.token;
//     const user = userRes.data.user || {};

//     if (typeof token === 'string' && token.length > 10) {
//       localStorage.setItem("user", JSON.stringify({ token, ...user }));
//       login(token);
//       setShowPopup(true);
//     } else {
//       throw new Error('Token not found in user login response');
//     }
//   } catch (userError) {
//     console.warn("User login failed:", userError.response?.data || userError.message);
//     setErrorMsg('Invalid credentials for both farmer and user.');
//   }
// };





//   // Auto-close popup and navigate after 2 seconds
//   useEffect(() => {
//     if (showPopup) {
//       const timer = setTimeout(() => {
//         setShowPopup(false);
//         navigate('/shop');
//       }, 2000);

//       return () => clearTimeout(timer); // cleanup
//     }
//   }, [showPopup, navigate]);

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h2 className="login-title">Login to your account</h2>

//         {errorMsg && <div className="login-error">{errorMsg}</div>}

//         <form className="login-form" onSubmit={(e) => e.preventDefault()}>
//           <div>
//             <label className="login-label" htmlFor="email">Email</label>
//             <input
//               id="email"
//               type="email"
//               className="login-input"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="you@example.com"
//             />
//           </div>

//           <div>
//             <label className="login-label" htmlFor="password">Password</label>
//             <input
//               id="password"
//               type="password"
//               className="login-input"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="••••••••"
//             />
//           </div>

//           <button
//             type="button"
//             onClick={handleLogin}
//             className="login-button"
//           >
//             Log In
//           </button>
//         </form>
//       </div>

//       {showPopup && (
//         <SuccessPopup
//           message="Login successful. Redirecting to shop..."
//           showPopup={showPopup}
//         />
//       )}
//     </div>
//   );
// };

// export default Login;