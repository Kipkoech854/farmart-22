import { useEffect, useState } from "react";
import FarmerNavbar from "../../components/FarmerNavbar";

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
      <div className="p-4 max-w-md mx-auto mt-8 bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-4">My Profile</h2>
        {farmer ? (
          <>
            <p><strong>Username:</strong> {farmer.username}</p>
            <p><strong>Email:</strong> {farmer.email}</p>
            <p><strong>Phone:</strong> {farmer.phone || "N/A"}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ProfileView;
