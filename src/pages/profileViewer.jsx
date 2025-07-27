import React, { useEffect, useState } from 'react';
import { getToken } from '../utils/jwt';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    email: '',
    name: '',
    profilePicture: '',
    profilePictureFile: null,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = getToken();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('https://farmart-y80m.onrender.com', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setProfile(data);
          setForm({
            email: data.email,
            name: data.name,
            profilePicture: data.profilePicture || '',
            profilePictureFile: null,
          });
        }
      } catch {
        console.error('Profile fetch error');
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

      const res = await fetch('https://farmart-y80m.onrender.com', {
        method: 'PUT',
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
    } catch {
      console.error('Profile update failed');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your account?')) return;

    try {
      const res = await fetch('https://farmart-y80m.onrender.com', {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        dispatch(logout());
        navigate('/register');
      }
    } catch {
      console.error('Account deletion failed');
    }
  };

  if (!profile) return <p>Loading profile....</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>User Profile</h2>

      {profile.profilePicture && (
        <img
          src={profile.profilePicture}
          alt="Profile"
          style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', marginBottom: '1rem' }}
        />
      )}

      {editing ? (
        <form onSubmit={handleEdit} encType="multipart/form-data">
          <input
            type="text"
            value={form.name}
            placeholder="Full Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          /><br />

          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          /><br />

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setForm({ ...form, profilePictureFile: e.target.files[0] })
            }
          /><br />

          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditing(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <button onClick={() => setEditing(true)}>Edit Profile</button>
          <button onClick={handleDelete} style={{ color: 'red' }}>Delete Account</button>
        </>
      )}
    </div>
  );
};

export default Profile;

