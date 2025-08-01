import React, { useState } from 'react';
import '../../src/Stylesheets/Register.css';
import { register } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
      const submitData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
       };
      await register(submitData);

      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err);
      setError(err?.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register</h2>

        {error && <p className="error">{error}</p>}

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
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />

        <input
          type={showPassword ? 'text' : 'password'}
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
        >
          <option value="user">User</option>
          <option value="farmer">Farmer</option>
        </select>

        <button type="button" onClick={togglePasswordVisibility} className="toggle-password-btn">
          {showPassword ? 'Hide Passwords' : 'Show Passwords'}
        </button>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;




// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { SuccessPopup } from '../Utils/SucessPopUp';
// import '../Stylesheets/Register.css';

// export const Register = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     role: 'customer',
//   });

//   const [error, setError] = useState('');
//   const [showPopup, setShowPopup] = useState(false);

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(prev => !prev);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setError(''); // Clear previous errors

//     if (formData.password !== formData.confirmPassword) {
//       return setError('Passwords do not match');
//     }

//     const API_BASE = import.meta.env.VITE_API_URL;

//     if (!API_BASE) {
//       console.error('❌ VITE_API_URL is not defined. Please check your .env file.');
//       return setError('Internal error. Please try again later.');
//     }

//     const url =
//       formData.role === 'farmer'
//         ? 'https://farmart-y80m.onrender.com/api/farmers/farmers/register'
//         : 'https://farmart-y80m.onrender.com/auth/register';

//     try {
//       const res = await fetch(url, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           username: formData.username,
//           email: formData.email,
//           password: formData.password,
//           role: formData.role,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {

//         throw new Error(data.error || 'Registration failed');
//       }

//       setShowPopup(true);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   useEffect(() => {
//     if (showPopup) {
//       const timeout = setTimeout(() => {
//         navigate('/login');
//       }, 3000);
//       return () => clearTimeout(timeout);
//     }
//   }, [showPopup, navigate]);

//   return (
//     <div className="register-video-container">
//       <video
//         autoPlay
//         loop
//         muted
//         playsInline
//         className="background-video"
//         src="/videos/Farmart-video-compressed.mp4"
//         type="video/mp4"
//       />
//       <div className="form-overlay">
//         <div className="form-box">
//           <h2 className="form-title">Create an</h2>
//           {error && <p className="form-error">{error}</p>}
//           <form onSubmit={handleSubmit} className="form-fields">
//             <div className="form-group">
//               <label htmlFor="username">Username</label>
//               <input id="username" type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
//             </div>

//             <div className="form-group">
//               <label htmlFor="email">Email</label>
//               <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
//             </div>

//             <div className="form-group">
//               <label htmlFor="password">Password</label>
//               <input id="password" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
//             </div>

//             <div className="form-group">
//               <label htmlFor="confirmPassword">Confirm</label>
//               <input id="confirmPassword" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required />
//             </div>

//             <div className="form-group">
//               <label htmlFor="role">Role</label>
//               <select id="role" name="role" value={formData.role} onChange={handleChange} required>
//                 <option value="customer">Customer</option>
//                 <option value="farmer">Farmer</option>
//               </select>
//             </div>

//             <button type="submit" className="form-button">Sign Up</button>
//           </form>

//         </div>
//       </div>
//       {showPopup && (
//         <SuccessPopup
//           message="Registration successful! Redirecting to login..."
//           showPopup={true}
//         />
//       )}
//     </div>
//   );
// };
