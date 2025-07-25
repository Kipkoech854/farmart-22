import { useState, useEffect } from "react";
import "../../Stylesheets/EditProfile.css";
import FarmerNavbar from "../../components/FarmerNavbar";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    profile_picture: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5555/api/farmers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setFormData((prev) => ({ ...prev, ...data })))
      .catch(console.error);
  }, []);

  const validateForm = () => {
    if (!formData.username.trim()) {
      setError("Username is required");
      return false;
    }
    if (!formData.email.includes("@")) {
      setError("Invalid email format");
      return false;
    }
    if (formData.phone && !/^\d+$/.test(formData.phone)) {
      setError("Phone must be numeric");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  const token = localStorage.getItem("token");
  fetch("http://localhost:5555/api/farmers", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Update failed");
      return res.json();
    })
    .then(() => {
      setMessage("Profile updated successfully!");
      setTimeout(() => navigate("/farmers/profile"), 1000);
    })
    .catch(() => {
      setMessage("");
      setError("Something went wrong.");
    });
};


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <FarmerNavbar />
      <div className="edit-container">
        <h2>Edit Profile</h2>

        {error && <div className="error-msg">{error}</div>}
        {message && <div className="success-msg">{message}</div>}

        <form onSubmit={handleSubmit}>
          <label>Username:</label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
          />

          <label>Email:</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <label>Phone:</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <label>Profile Picture URL:</label>
          <input
            name="profile_picture"
            value={formData.profile_picture}
            onChange={handleChange}
          />

         
          {formData.profile_picture && (
            <img
              src={formData.profile_picture}
              alt="Preview"
              className="profile-preview"
            />
          )}

          <label>New Password (optional):</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
