import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../context/AuthContext'; // Adjust path if needed

const Profile = () => {
  const { token } = useAuth(); // ✅ Use from context only
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);

  const BASE_URL = "https://farmart-y80m.onrender.com";
  const profilePicUrl = preview || (profile?.profile_picture ? `${BASE_URL}/static/${profile.profile_picture}` : null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    profilePicture: '',
    profilePictureFile: null,
  });

  

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/api/User/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = await res.json();

        setProfile(data);
        setForm({
          name: data.name || '',
          email: data.email || '',
          profilePicture: data.profilePicture || '',
          profilePictureFile: null
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profilePicture' && files.length > 0) {
      setForm((prev) => ({
        ...prev,
        profilePictureFile: files[0]
      }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('email', form.email);
      if (form.profilePictureFile) {
        formData.append('profilePicture', form.profilePictureFile);
      }

      const res = await fetch(`${BASE_URL}/api/User/user`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });

      const data = await res.json();
      setProfile(data);
      setPreview(null);
      setEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure? This cannot be undone.')) return;

    try {
      const res = await fetch(`${BASE_URL}/api/User/delete`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        dispatch(logout());
        navigate('/register');
      } else {
        throw new Error('Account deletion failed');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading && !profile) return <div className="loader">Loading...</div>;
  if (error) return <div className="error-alert">{error}</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Profile</h2>
      {profile ? (
        <form onSubmit={handleEdit}>
          {profilePicUrl && (
            <img
              src={profilePicUrl}
              alt="Profile"
              style={{
                width: 120,
                height: 120,
                borderRadius: '50%',
                objectFit: 'cover',
                marginBottom: '1rem',
              }}
            />
          )}

          {editing ? (
            <>
              <div>
                <label>Name: </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Email: </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Profile Picture: </label>
                <input
                  type="file"
                  name="profilePicture"
                  accept="image/*"
                  onChange={handleChange}
                />
              </div>
              <button type="submit">Save Changes</button>
            </>
          ) : (
            <>
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <button type="button" onClick={() => setEditing(true)}>
                Edit Profile
              </button>
              <button type="button" onClick={handleDeleteAccount} className="delete-btn">
                Delete Account
              </button>
            </>
          )}
        </form>
      ) : (
        <div>No profile data available.</div>
      )}
    </div>
  );
};

export default Profile;





// import React, { useEffect, useState } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// const Profile = () => {
//   const { token } = useAuth();
//   const [profile, setProfile] = useState(null);
//   const [editing, setEditing] = useState(false);
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     profilePicture: '',
//     profilePictureFile: null,
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await fetch('https://farmart-y80m.onrender.com/api/User/profile', {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const data = await res.json();
//         if (res.ok) {
//           setProfile(data);
//           setForm({
//             email: data.email,
//             name: data.name,
//             profilePicture: data.profile_picture || '',
//             profilePictureFile: null,
//           });
//         }
//       } catch (error) {
//         console.error('Profile fetch error:', error);
//       }
//     };
//     fetchProfile();
//   }, [token]);

//   const handleEdit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append('name', form.name);
//       formData.append('email', form.email);
//       if (form.profilePictureFile) {
//         formData.append('profilePicture', form.profilePictureFile);
//       }

//       const res = await fetch('https://farmart-y80m.onrender.com/api/User/user', {
//         method: 'PATCH',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData,
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setProfile(data);
//         setEditing(false);
//       }
//     } catch (error) {
//       console.error('Profile update failed:', error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === 'profilePicture') {
//       setForm((prev) => ({
//         ...prev,
//         profilePictureFile: files[0],
//         profilePicture: URL.createObjectURL(files[0]),
//       }));
//     } else {
//       setForm((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const profilePicUrl = form.profilePicture || profile?.profile_picture;

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h2>Profile</h2>
//       {profile ? (
//         <form onSubmit={handleEdit}>
//           {profilePicUrl && (
//             <img
//               src={profilePicUrl}
//               alt="Profile"
//               style={{
//                 width: 120,
//                 height: 120,
//                 borderRadius: '50%',
//                 objectFit: 'cover',
//                 marginBottom: '1rem',
//               }}
//             />
//           )}

//           {editing ? (
//             <>
//               <div>
//                 <label>Name: </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={form.name}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div>
//                 <label>Email: </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={form.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div>
//                 <label>Profile Picture: </label>
//                 <input
//                   type="file"
//                   name="profilePicture"
//                   accept="image/*"
//                   onChange={handleChange}
//                 />
//               </div>
//               <button type="submit">Save Changes</button>
//             </>
//           ) : (
//             <>
//               <p><strong>Name:</strong> {profile.name}</p>
//               <p><strong>Email:</strong> {profile.email}</p>
//               <button type="button" onClick={() => setEditing(true)}>
//                 Edit Profile
//               </button>
//             </>
//           )}
//         </form>
//       ) : (
//         <p>Loading profile...</p>
//       )}
//     </div>
//   );
// };

// export default Profile;


