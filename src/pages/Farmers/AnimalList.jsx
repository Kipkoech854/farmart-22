import { useEffect, useState } from "react";
import "../../Stylesheets/AnimalList.css";
import FarmerNavbar from "../../components/FarmerNavbar";

const AnimalList = () => {
  const [animals, setAnimals] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("https://farmart-y80m.onrender.com/api/farmers/animals", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch animals");
        return res.json();
      })
      .then((data) => setAnimals(data.animals || []))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <>
      <FarmerNavbar />
      <div className="animal-list-container">
        <h2>My Animals</h2>
        {error && <p className="error-msg">{error}</p>}
        <div className="animal-grid">
          {animals.map((animal) => (
            <div className="animal-card" key={animal.id}>
              <div className="animal-img-placeholder">📷</div>
              <h3>{animal.name}</h3>
              <p><strong>Type:</strong> {animal.type}</p>
              <p><strong>Breed:</strong> {animal.breed}</p>
              <p><strong>Age:</strong> {animal.age} yrs</p>
              <p><strong>Price:</strong> ${animal.price}</p>
              <p className={animal.is_available ? "available" : "not-available"}>
                {animal.is_available ? "Available" : "Not Available"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AnimalList;
