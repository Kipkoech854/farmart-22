// import React, { useState, useEffect } from 'react';

// import '../Stylesheets/Login.css';
// import { SuccessPopup } from '../Utils/SucessPopUp';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { loginUser } from '../services/authService'; // <- New



import axios from 'axios';

const API_BASE_URL = 'http://localhost:10000';

export const login = async ({ email, password }) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password,
    });

    if (res.status === 200) return res.data;
    throw new Error("Login failed.");
  } catch (err) {
    throw new Error(err.response?.data?.message || "Login failed.");
  }
};

export const register = async ({ email, password, role }) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/register`, {
      email,
      password,
      role,
    });

    if (res.status === 201) return res.data;
    throw new Error("Registration failed.");
  } catch (err) {
    throw new Error(err.response?.data?.message || "Registration failed.");
  }
};



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

//     try {
//       const { token, user } = await loginUser(email, password);
//       localStorage.setItem("user", JSON.stringify({ token, ...user }));
//       login(token);
//       setShowPopup(true);
//     } catch (err) {
//       setErrorMsg(err.message || 'Login failed.');
//     }
//   };

//   // Auto-close popup and navigate after 2 seconds
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





// const API_BASE = import.meta.env.VITE_BACKEND_URL;

// export const loginUser = async (credentials) => {
//   const response = await fetch(`${API_BASE}/auth/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(credentials),
//     credentials: "include"
//   });

//   if (!response.ok) {
//     const data = await response.json().catch(() => ({}));
//     throw new Error(data.msg || data.message || "Login failed.");
//   }
//   return await response.json(); // returns { token, user }
// };

// export const registerUser = async (userData) => {
//   const url = userData.role === "farmer"
//     ? `${API_BASE}/api/farmers/farmers/register`
//     : `${API_BASE}/auth/register`;

//   const response = await fetch(url, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(userData),
//     credentials: "include"
//   });

//   if (!response.ok) {
//     const data = await response.json().catch(() => ({}));
//     throw new Error(data.msg || data.message || "Registration failed.");
//   }
//   return await response.json();
// };

// export const authService = {
//   loginUser,
//   registerUser
// };




// const API_BASE = import.meta.env.VITE_BACKEND_URL;


// // const API_BASE = "https://farmart-y80m.onrender.com"; // Update with your actual backend URL

// export const registerUser = async (credentials) => {
//   const response = await fetch(`${API_BASE}/register`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(credentials),
//   });

//   if (!response.ok) throw new Error("Registration failed");
//   return await response.json();
// };

// export const loginUser = async (credentials) => {
//   const response = await fetch(`${API_BASE}/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(credentials),
//   });

//   if (!response.ok) throw new Error("Login failed");
//   return await response.json();
// };






// // Sends a POST request to /auth/login with JSON data
// export const login = async (credentials) => {
//     const urls = [
//         { url: "https://farmart-y80m.onrender.com/auth/login", role: "user" },
//         { url: "https://farmart-y80m.onrender.com/api/farmers/farmers/login", role: "farmer" }
//     ];

//     for (const { url, role } of urls) {
//         const response = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(credentials)
//         });

//         if (response.ok) {
//             const data = await response.json();
//             data.role = role;
//             return data; // includes token and role
//         }
//     }

//     throw new Error('Login failed for both user and farmer');
// };


// // Sends a POST request to /auth/register with new user data
// const register = async (userData) => {
//     const url = userData.role === 'farmer'
//         ? "https://farmart-y80m.onrender.com/api/farmers/farmers/register"
//         : "https://farmart-y80m.onrender.com/auth/register";

//     const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(userData),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//         const error = new Error(data.message || 'Registration failed');
//         error.status = response.status;  
//         throw error;
//     }

//     return data;
// };


// export const authService = {
//     login,
//     register
// };







// const API_BASE = "https://farmart-y80m.onrender.com"; // Base API URL

// // 🔐 Login for both user and farmer
// export const login = async (credentials) => {
//   const endpoints = [
//     { url: `${API_BASE}/auth/login`, role: "user" },
//     { url: `${API_BASE}/api/farmers/farmers/login`, role: "farmer" }
//   ];

//   for (const { url, role } of endpoints) {
//     try {
//       const response = await fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(credentials),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         return { ...data, role };
//       }
//     } catch (err) {
//       console.error(`Error contacting ${role} endpoint:`, err.message);
//     }
//   }

//   throw new Error("Login failed for both user and farmer");
// };

// // 📝 Register user or farmer based on role
// export const register = async (userData) => {
//   const url = userData.role === "farmer"
//     ? `${API_BASE}/api/farmers/farmers/register`
//     : `${API_BASE}/auth/register`;

//   const response = await fetch(url, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(userData),
//   });

//   const data = await response.json();

//   if (!response.ok) {
//     const error = new Error(data.message || "Registration failed");
//     error.status = response.status;
//     throw error;
//   }

//   return data;
// };

// // 💾 Save user data to localStorage
// export const saveUserToStorage = (userData) => {
//   localStorage.setItem("user", JSON.stringify(userData));
// };

// // 📦 Retrieve user data from localStorage
// export const getUserFromStorage = () => {
//   const data = localStorage.getItem("user");
//   return data ? JSON.parse(data) : null;
// };

// // 🚪 Clear user data from localStorage
// export const logout = () => {
//   localStorage.removeItem("user");
// };

// // 🌐 Export all auth functions
// const authService = {
//   login,
//   register,
//   saveUserToStorage,
//   getUserFromStorage,
//   logout,
// };

// export default authService;






// // src/services/authService.js
// import axios from "axios";

// const API = "https://farmart-y80m.onrender.com";

// export const login = async ({ email, password }) => {
//   const res = await axios.post(`${API}/login`, { email, password });
//   return res.data;
// };

// export const register = async ({ email, password, role }) => {
//   const res = await axios.post(`${API}/register`, { email, password, role });
//   return res.data;
// };
// export const getUserProfile = async (token) => {
//   const res = await axios.get(`${API}/profile`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return res.data;
// };
// export const updateUserProfile = async (token, profileData) => {
//   const res = await axios.put(`${API}/profile`, profileData, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return res.data;
// }; 
























// const API_BASE = "http://localhost:10000"; // Update with your actual backend URL

// export const registerUser = async (credentials) => {
//   const response = await fetch(`${API_BASE}/register`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(credentials),
//   });

//   if (!response.ok) throw new Error("Registration failed");
//   return await response.json();
// };

// export const loginUser = async (credentials) => {
//   const response = await fetch(`${API_BASE}/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(credentials),
//   });

//   if (!response.ok) throw new Error("Login failed");
//   return await response.json();
// };






// // Sends a POST request to /auth/login with JSON data
// export const login = async (credentials) => {
//     const urls = [
//         { url: "http://localhost:5555/auth/login", role: "user" },
//         { url: "http://localhost:5555/api/farmers/farmers/login", role: "farmer" }
//     ];

//     for (const { url, role } of urls) {
//         const response = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(credentials)
//         });

//         if (response.ok) {
//             const data = await response.json();
//             data.role = role;
//             return data; // includes token and role
//         }
//     }

//     throw new Error('Login failed for both user and farmer');
// };


// // Sends a POST request to /auth/register with new user data
// const register = async (userData) => {
//     const url = userData.role === 'farmer'
//         ? "http://localhost:5555/api/farmers/farmers/register"
//         : "http://localhost:5555/auth/register";

//     const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(userData),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//         const error = new Error(data.message || 'Registration failed');
//         error.status = response.status;  
//         throw error;
//     }

//     return data;
// };


// export const authService = {
//     login,
//     register
// };



// chisiwa



// import { API_URL } from "../config";

// Sends a POST request to /auth/login with JSON data
// const login = async (credentials) => {
//     const response = await fetch("http://localhost:5555/auth/login", {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(credentials)
//     });

//     if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Login failed');
//     }

//     return await response.json();
// };

// // Sends a POST request to /auth/register with new user data
// const register = async (userData) => {
//     const response = await fetch("http://localhost:5555/auth/register", {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(userData)
//     });

//     if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Registration failed');
//     }

//     return await response.json();
// };

// export const authService = {
//     login,
//     register
// };

//import { API_URL } from "../config";

// Sends a POST request to /auth/login with JSON data
// export const login = async (credentials) => {
//     const urls = [
//         { url: "http://localhost:5555/auth/login", role: "user" },
//         { url: "http://localhost:5555/api/farmers/farmers/login", role: "farmer" }
//     ];

//     for (const { url, role } of urls) {
//         const response = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(credentials)
//         });

//         if (response.ok) {
//             const data = await response.json();
//             data.role = role;
//             return data; // includes token and role
//         }
//     }

//     throw new Error('Login failed for both user and farmer');
// };


// // Sends a POST request to /auth/register with new user data
// const register = async (userData) => {
//     const url = userData.role === 'farmer'
//         ? "http://localhost:5555/api/farmers/farmers/register"
//         : "http://localhost:5555/auth/register";

//     const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(userData),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//         const error = new Error(data.message || 'Registration failed');
//         error.status = response.status;  
//         throw error;
//     }

//     return data;
// };


// export const authService = {
//     login,
//     register
// };






// const API_URL = 'http://localhost:5555/api/auth';

// export const authService = {
//   // Login user
//   login: async (credentials) => {
//     const res = await fetch(`${API_URL}/login`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(credentials),
//     });

//     if (!res.ok) {
//       throw new Error('Login failed');
//     }

//     const data = await res.json();
//     if (data.token) {
//       localStorage.setItem('user', JSON.stringify(data));
//     }
//     return data;
//   },

//   // Register user
//   register: async (newUser) => {
//     const res = await fetch(`${API_URL}/register`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(newUser),
//     });

//     if (!res.ok) {
//       throw new Error('Registration failed');
//     }

//     const data = await res.json();
//     if (data.token) {
//       localStorage.setItem('user', JSON.stringify(data));
//     }
//     return data;
//   },

//   // Logout user
//   logout: () => {
//     localStorage.removeItem('user');
//   },

//   // Get current user info (from localStorage)
//   getCurrentUser: () => {
//     const user = localStorage.getItem('user');
//     return user ? JSON.parse(user) : null;
//   },

//   // Get just the JWT token
//   getToken: () => {
//     const user = localStorage.getItem('user');
//     return user ? JSON.parse(user).token : null;
//   }
// };
