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
export default Register;





// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// // import { getToken } from '../utils/jwt';
// import '../Stylesheets/profileViewer.css';

// const Profile = () => {
//   const { token } = useAuth(); // ✅ Use from context only
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [profile, setProfile] = useState(null);
//   const [editing, setEditing] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [preview, setPreview] = useState(null);

//   const BASE_URL = "https://farmart-y80m.onrender.com";  // adjust if deployed
//   const profilePicUrl = preview || (profile?.profile_picture ? `${BASE_URL}/static/${profile.profile_picture}` : null);
//   console.log("Profile picture URL:", profilePicUrl);

  
//   const [form, setForm] = useState({
//     username: '',
//     email: '',
//     profilePicture: '',
//     profilePictureFile: null
//   });

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     const fetchProfile = async () => {
//       setIsLoading(true);
//       try {
//         const res = await fetch('https://farmart-y80m.onrender.com/api/User/profile', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         if (!res.ok) throw new Error('Failed to load profile');
//         const data = await res.json();
//         console.log(data)
//         setProfile(data);
//         setForm({
//           username: data.username || '',
//           email: data.email || '',
//           profilePicture: data.profilePicture || '',
//           profilePictureFile: null
//         });
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [token]);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setForm({ ...form, profilePictureFile: file });
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
    
//     try {
//       const formData = new FormData();
//       const token = localStorage.getItem('token');
//       console.log("token:",token)
//       formData.append('username', form.username);
//       formData.append('email', form.email);
//       if (form.profilePictureFile) {
//         formData.append('profilePicture', form.profilePictureFile);
//       }

//       const res = await fetch('https://farmart-y80m.onrender.com/api/User/user', {
//         method: 'PATCH',
//         headers: { Authorization: `Bearer ${token}` },
//         body: formData
//       });

//       if (!res.ok) throw new Error('Update failed');
//       const data = await res.json();
//       setProfile(data);
//       setPreview(null);
//       setEditing(false);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDeleteAccount = async () => {
//     if (!window.confirm('Are you sure? This cannot be undone.')) return;
    
//     try {
//       const res = await fetch(`${BASE_URL}/api/User/delete`, {
//         method: 'DELETE',
//         headers: { Authorization: `Bearer ${token}` }
//       });
      
//       if (res.ok) {
//         dispatch(logout());
//         navigate('/register');
//       } else {
//         throw new Error('Deletion failed');
//       }
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   if (isLoading && !profile) return <div className="loader">Loading...</div>;
//   if (error) return <div className="error-alert">{error}</div>;

//   return (
//     <div className="profile-container">
//       <div className="profile-header-container">
//         <h2 className="profile-header">My Profile</h2>
//         {!editing && (
//           <button 
//             onClick={() => setEditing(true)}
//             className="edit-profile-btn"
//             title="Edit profile"
//           >
//             ✏️
//           </button>
//         )}
//       </div>
      
//       <div className="avatar-container">
//   {profilePicUrl ? (
//     <img 
//       src={profilePicUrl}
//       alt="Profile"
//       className="profile-avatar"
//     />
//   ) : (
//     <div className="avatar-placeholder">
//       {profile?.username?.charAt(0).toUpperCase()}
//     </div>
//   )}
// </div>



//       {editing ? (
//         <form onSubmit={handleEditSubmit} className="profile-form">
//           <div className="form-group">
//             <label>Username</label>
//             <input
//               type="text"
//               value={form.username || ''}
//               onChange={(e) => setForm({...form, username: e.target.value})}
//               required
//             />
//           </div>
          
//           <div className="form-group">
//             <label>Email</label>
//             <input
//               type="email"
//               value={form.email || ''}
//               onChange={(e) => setForm({...form, email: e.target.value})}
//               required
//             />
//           </div>
          
//           <div className="form-group">
//             <label>Profile Picture</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//             />
//           </div>
          
//           <div className="form-actions">
//             <button type="submit" className="save-btn" disabled={isLoading}>
//               {isLoading ? 'Saving...' : 'Save Changes'}
//             </button>
//             <button 
//               type="button" 
//               className="cancel-btn"
//               onClick={() => {
//                 setEditing(false);
//                 setPreview(null);
//               }}
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       ) : (
//         <div className="profile-info">
//           <div className="info-item">
//             <span className="info-label">Username:</span>
//             <span className="info-value">{profile?.username || 'Not available'}</span>
//           </div>
          
//           <div className="info-item">
//             <span className="info-label">Email:</span>
//             <span className="info-value">{profile?.email || 'Not available'}</span>
//           </div>
          
//           <button 
//             onClick={handleDeleteAccount}
//             className="delete-btn"
//           >
//             Delete Account
//           </button>
//         </div>
//       )}
      
//       {error && <div className="error-message">{error}</div>}
//     </div>
//   );
// };

// export default Profile;