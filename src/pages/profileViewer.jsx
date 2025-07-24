import React, { useEffect, useState } from 'react';
import { getToken } from '../utils/jwt';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ email: '', name: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = getToken();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:10000/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setProfile(data);
          setForm({ email: data.email, name: data.name });
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
      const res = await fetch('http://localhost:10000/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
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
      const res = await fetch('http://localhost:10000/api/profile', {
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
    <div>
      <h2>User Profile</h2>
      {editing ? (
        <form onSubmit={handleEdit}>
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
