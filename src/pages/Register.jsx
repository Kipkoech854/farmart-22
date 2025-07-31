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
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(''); // Clear previous errors

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    const API_BASE = import.meta.env.VITE_API_URL;

    if (!API_BASE) {
      console.error('❌ VITE_API_URL is not defined. Please check your .env file.');
      return setError('Internal error. Please try again later.');
    }

    const url =
      formData.role === 'farmer'
        ? `${API_BASE}/api/farmers/farmers/register`
        : `${API_BASE}/auth/register`;

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

      const data = await res.json();

      if (!res.ok) {

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

  return (
    <>
      <div className="register-container">
        <div className="register-left">
          <h1>Welcome!</h1>
          <p>Create an account to get started managing your farm and shopping easily.</p>
        </div>

        <div className="register-right">
          <h2 className="register-title">Register</h2>
          {error && <p className="register-error">{error}</p>}

          <form onSubmit={handleSubmit} className="register-form">
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

            <div className="show-password-toggle">
              <label htmlFor="showPassword" className="toggle-label">
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={togglePasswordVisibility}
                  className="toggle-checkbox"
                />
                <span className="toggle-text">Show Password</span>
              </label>
            </div>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="customer">Customer</option>
              <option value="farmer">Farmer</option>
            </select>

            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>

      {showPopup && (
        <SuccessPopup
          message="Registration successful! Redirecting to login..."
          showPopup={true}
        />
      )}
    </>
  );
};







// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { SuccessPopup } from '../Utils/SucessPopUp';
// import '../Stylesheets/Register.css';
// // import { registerUser } from '../Services/RegisterService';

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
//   const [showPassword, setShowPassword] = useState(false);

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

//     if (formData.password !== formData.confirmPassword) {
//       return setError('Passwords do not match');
//     }
    
//     const API_BASE = import.meta.env.VITE_BACKEND_URL;
//     const url =
//       formData.role === 'farmer'
//         ? `${API_BASE}/api/farmers/farmers/register`
//         : `${API_BASE}/auth/register`;

//     // const url =
//     //   formData.role === 'farmer'
//     //     ? 'https://farmart-y80m.onrender.com/api/farmers/farmers/register'
//     //     : 'https://farmart-y80m.onrender.com/auth/register';

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

//       if (!res.ok) {
//         const data = await res.json();
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
//     <>
//       <div className="register-container">
//         <div className="register-left">
//           <h1>Welcome!</h1>
//           <p>Create an account to get started managing your farm and shopping easily.</p>
//         </div>

//         <div className="register-right">
//           <h2 className="register-title">Register</h2>
//           {error && <p className="register-error">{error}</p>}

//           <form onSubmit={handleSubmit} className="register-form">
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               placeholder="Username"
//               required
//             />
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Email"
//               required
//             />
//             <input
//               type={showPassword ? 'text' : 'password'}
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Password"
//               required
//             />
//             <input
//               type={showPassword ? 'text' : 'password'}
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               placeholder="Confirm Password"
//               required
//             />

//             <div className="show-password-toggle">
//               <label htmlFor="showPassword" className="toggle-label">
//                 <input
//                   type="checkbox"
//                   id="showPassword"
//                   checked={showPassword}
//                   onChange={togglePasswordVisibility}
//                   className="toggle-checkbox"
//                 />
//                 <span className="toggle-text">Show Password</span>
//               </label>
//             </div>

//             <select
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               required
//             >
//               <option value="customer">Customer</option>
//               <option value="farmer">Farmer</option>
//             </select>

//             <button type="submit">Sign Up</button>
//           </form>
//         </div>
//       </div>

//       {showPopup && (
//         <SuccessPopup
//           message="succesfully logged in."
//           showPopup={true}
//         />
//       )}
//     </>
//   );
// };










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
//   const [showPassword, setShowPassword] = useState(false);


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

//     if (formData.password !== formData.confirmPassword) {
//       return setError('Passwords do not match');
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

//       if (!res.ok) {
//         const data = await res.json();
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
//     <>
//       <div className="login-container">
//         <div className="login-box">
//           <h2 className="login-title">Register</h2>
//           {error && <p className="login-error">{error}</p>}

//           <form onSubmit={handleSubmit} className="login-form">
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               placeholder="Username"
//               required
//             />
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Email"
//               required
//             />
//             <input
//               type={showPassword ? 'text' : 'password'}
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Password"
//               required
//             />
//             <input
//               type={showPassword ? 'text' : 'password'}
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               placeholder="Confirm Password"
//               required
//             />

//         <div className="show-password-toggle">
//          <label htmlFor="showPassword" className="toggle-label">
//            <input
//               type="checkbox"
//               id="showPassword"
//               checked={showPassword}
//               onChange={togglePasswordVisibility}
//               className="toggle-checkbox"
//                 />
//                 <span className="toggle-text">Show Password</span>
//           </label>
//        </div>


//             <select
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               required
//             >
//               <option value="customer">Customer</option>
//               <option value="farmer">Farmer</option>
//             </select>

//             <button type="submit" className="login-button">
//               Sign Up
//             </button>
//           </form>
//         </div>
//       </div>

//       {showPopup && (
//         <SuccessPopup
//           message="Check your email for the verification link."
//           showPopup={true}
//         />
//       )}
//     </>
//   );
// };




// gggg

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

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       return setError('Passwords do not match');
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

//       if (!res.ok) {
//         const data = await res.json();
//         throw new Error(data.error || 'Registration failed');
//       }

//       setShowPopup(true); // Show the popup
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   // Auto-redirect after showing popup
//   useEffect(() => {
//     if (showPopup) {
//       const timeout = setTimeout(() => {
//         navigate('/login');
//       }, 3000); // ⏳ 3 seconds

//       return () => clearTimeout(timeout); // Clean up on unmount
//     }
//   }, [showPopup, navigate]);

//   return (
//     <>
//       <div className="login-container">
//         <div className="login-box">
//           <h2 className="login-title">Register</h2>
//           {error && <p className="login-error">{error}</p>}
//           <form onSubmit={handleSubmit} className="login-form">
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               placeholder="Username"
//               required
//             />
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Email"
//               required
//             />
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Password"
//               required
//             />
//             <input
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               placeholder="Confirm Password"
//               required
//             />
//             <select
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               required
//             >
//               <option value="customer">Customer</option>
//               <option value="farmer">Farmer</option>
//             </select>

//             <button type="submit" className="login-button">Sign Up</button>
//           </form>
//         </div>
//       </div>

//       {showPopup && (
//         <SuccessPopup
//           message="Check your email for the verification link."
//           showPopup={true}
//         />
//       )}
//     </>
//   );
// };
