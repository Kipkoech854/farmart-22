import { useEffect, useState } from "react";
import FarmerNavbar from "../../components/FarmerNavbar";
import "../../Stylesheets/ProfileView.css";
import defaultPic from "../../assets/default-profile.jpeg";

const ProfileView = () => {
  const [farmer, setFarmer] = useState(null);
  const [profilePicError, setProfilePicError] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://farmart-y80m.onrender.com/api/farmers/farmers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch farmer profile");
        }
        return res.json();
      })
      .then((data) => {
        setFarmer(data);
      })
      .catch((err) => {
        console.error("Error fetching farmer profile:", err);
      });
  }, []);

  const handleImageError = () => {
    setProfilePicError(true);
  };

  return (
    <div>
      <div className="page-wrapper">
        <FarmerNavbar />
        <div className="profile-container">
          <h2 className="profile-title">My Profile</h2>
          {farmer ? (
            <div className="profile-card">
              <img
                className="profile-pic"
                src={
                  !profilePicError && farmer.profile_picture
                    ? `https://farmart-y80m.onrender.com/${farmer.profile_picture}`
                    : defaultPic
                }
                alt="Profile"
                onError={handleImageError}
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
    </div>
  );
};

export default ProfileView;
