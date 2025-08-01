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
    fetch("https://farmart-y80m.onrender.com/api/farmers", {
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
    const form = new FormData();
    form.append("username", formData.username);
    form.append("email", formData.email);
    form.append("phone", formData.phone);
    form.append("password", formData.password);
    if (formData.profile_picture instanceof File) {
      form.append("profile_picture", formData.profile_picture);
    }

    fetch("https://farmart-y80m.onrender.com/api/farmers/farmers", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: form,
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
    const { name, value, files } = e.target;
    if (name === "profile_picture") {
      setFormData({ ...formData, profile_picture: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const getAvatarPreview = () => {
    if (formData.profile_picture instanceof File) {
      return URL.createObjectURL(formData.profile_picture);
    }
    return formData.profile_picture || "https://via.placeholder.com/120?text=Avatar";
  };

  return (
    <div>
      <FarmerNavbar />
      <div className="edit-container">
        <h2>Edit Profile</h2>

        {error && <div className="error-msg">{error}</div>}
        {message && <div className="success-msg">{message}</div>}

        {/* Avatar preview */}
        <div className="avatar-preview">
          <img
            src={getAvatarPreview()}
            alt="Avatar Preview"
            className="avatar-img"
          />
        </div>

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

          <label>Profile Picture:</label>
          <input
            name="profile_picture"
            type="file"
            accept="image/*"
            onChange={handleChange}
          />

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

