import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
// import { getToken } from '../utils/jwt';
import '../Stylesheets/profileViewer.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);

  const BASE_URL = "https://farmart-y80m.onrender.com";  // adjust if deployed
  const profilePicUrl = preview || (profile?.profile_picture ? `${BASE_URL}/static/${profile.profile_picture}` : null);
  console.log("Profile picture URL:", profilePicUrl);

  
  const [form, setForm] = useState({
    username: '',
    email: '',
    profilePicture: '',
    profilePictureFile: null
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('https://farmart-y80m.onrender.com/api/User/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to load profile');
        const data = await res.json();
        console.log(data)
        setProfile(data);
        setForm({
          username: data.username || '',
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, profilePictureFile: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const formData = new FormData();
      const token = localStorage.getItem('token');
      console.log("token:",token)
      formData.append('username', form.username);
      formData.append('email', form.email);
      if (form.profilePictureFile) {
        formData.append('profilePicture', form.profilePictureFile);
      }

      const res = await fetch('https://farmart-y80m.onrender.com/api/User/user', {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });

      if (!res.ok) throw new Error('Update failed');
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
      const res = await fetch('https://farmart-y80m.onrender.com', {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.ok) {
        dispatch(logout());
        navigate('/register');
      } else {
        throw new Error('Deletion failed');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading && !profile) return <div className="loader">Loading...</div>;
  if (error) return <div className="error-alert">{error}</div>;

  return (
    <div className="profile-container">
      <div className="profile-header-container">
        <h2 className="profile-header">My Profile</h2>
        {!editing && (
          <button 
            onClick={() => setEditing(true)}
            className="edit-profile-btn"
            title="Edit profile"
          >
            ✏️
          </button>
        )}
      </div>
      
      <div className="avatar-container">
  {profilePicUrl ? (
    <img 
      src={profilePicUrl}
      alt="Profile"
      className="profile-avatar"
    />
  ) : (
    <div className="avatar-placeholder">
      {profile?.username?.charAt(0).toUpperCase()}
    </div>
  )}
</div>



      {editing ? (
        <form onSubmit={handleEditSubmit} className="profile-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={form.username || ''}
              onChange={(e) => setForm({...form, username: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={form.email || ''}
              onChange={(e) => setForm({...form, email: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          
          <div className="form-actions">
            <button type="submit" className="save-btn" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => {
                setEditing(false);
                setPreview(null);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="profile-info">
          <div className="info-item">
            <span className="info-label">Username:</span>
            <span className="info-value">{profile?.username || 'Not available'}</span>
          </div>
          
          <div className="info-item">
            <span className="info-label">Email:</span>
            <span className="info-value">{profile?.email || 'Not available'}</span>
          </div>
          
          <button 
            onClick={handleDeleteAccount}
            className="delete-btn"
          >
            Delete Account
          </button>
        </div>
      )}
      
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Profile;