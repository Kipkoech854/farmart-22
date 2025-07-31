import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { token } = useAuth();
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    profilePicture: '',
    profilePictureFile: null,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('https://farmart-y80m.onrender.com/api/User/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (res.ok) {
          setProfile(data);
          setForm({
            email: data.email,
            name: data.name,
            profilePicture: data.profile_picture || '',
            profilePictureFile: null,
          });
        }
      } catch (error) {
        console.error('Profile fetch error:', error);
      }
    };
    fetchProfile();
  }, [token]);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('email', form.email);
      if (form.profilePictureFile) {
        formData.append('profilePicture', form.profilePictureFile);
      }

      const res = await fetch('https://farmart-y80m.onrender.com/api/User/user', {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setProfile(data);
        setEditing(false);
      }
    } catch (error) {
      console.error('Profile update failed:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profilePicture') {
      setForm((prev) => ({
        ...prev,
        profilePictureFile: files[0],
        profilePicture: URL.createObjectURL(files[0]),
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const profilePicUrl = form.profilePicture || profile?.profile_picture;

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
            </>
          )}
        </form>
      ) : (
        <p>Loading profile...</p>
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


