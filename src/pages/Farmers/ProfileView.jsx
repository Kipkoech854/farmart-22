import { useEffect, useState } from "react";
import FarmerNavbar from "../../components/FarmerNavbar";
import "../../Stylesheets/ProfileView.css";
import defaultPic from "../../assets/default-profile.jpeg";

const ProfileView = () => {
  const [farmer, setFarmer] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5555/api/farmers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(setFarmer)
      .catch(console.error);
  }, []);

  return (
    <div>
      <FarmerNavbar />
      <div className="profile-container">
        <h2 className="profile-title">My Profile</h2>
        {farmer ? (
          <div className="profile-card">
            <img
              className="profile-pic"
              src={farmer.profile_picture || defaultPic}
              alt="Profile"
            />
            <p><strong>Username:</strong> {farmer.username}</p>
            <p><strong>Email:</strong> {farmer.email}</p>
            <p><strong>Phone:</strong> {farmer.phone || "N/A"}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ProfileView;
