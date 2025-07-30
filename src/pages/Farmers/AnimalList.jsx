import { useEffect, useState } from "react";
import "../../Stylesheets/AnimalList.css";
import FarmerNavbar from "../../components/FarmerNavbar";
import { useNavigate } from "react-router-dom";

const AnimalList = () => {
  const [animals, setAnimals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Use mock data for development or when backend is unavailable
    const mockAnimals = [
      {
        id: 1,
        name: "Brown Cow",
        type: "Cow",
        breed: "Jersey",
        age: 4,
        price: 450,
        is_available: true,
        images: ["https://via.placeholder.com/200?text=Cow+1"],
      },
      {
        id: 2,
        name: "Spotted Goat",
        type: "Goat",
        breed: "Boer",
        age: 2,
        price: 120,
        is_available: false,
        images: ["https://via.placeholder.com/200?text=Goat+2"],
      },
      {
        id: 3,
        name: "White Sheep",
        type: "Sheep",
        breed: "Merino",
        age: 3,
        price: 200,
        is_available: true,
        images: ["https://via.placeholder.com/200?text=Sheep+3"],
      },
      {
        id: 4,
        name: "Black Bull",
        type: "Bull",
        breed: "Angus",
        age: 5,
        price: 600,
        is_available: true,
        images: ["https://via.placeholder.com/200?text=Bull+4"],
      },
    ];

    setAnimals(mockAnimals);
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this animal?")) return;
    setAnimals((prev) => prev.filter((animal) => animal.id !== id));
  };

  const filteredAnimals = animals.filter((a) =>
    [a.name, a.type, a.breed].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <>
      <FarmerNavbar />
      <div className="animal-list-container">
        <h2>My Animals</h2>
        <input
          type="text"
          placeholder="Search by name, type, or breed..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        {error && <p className="error-msg">{error}</p>}

        <div className="animal-grid">
          {filteredAnimals.map((animal) => (
            <div className="animal-card" key={animal.id}>
              <div className="animal-image-slider">
                {animal.images && animal.images.length > 0 ? (
                  <img
                    src={animal.images[0]}
                    alt={animal.name}
                    className="animal-image fade-in"
                  />
                ) : (
                  <div className="animal-img-placeholder">📷</div>
                )}
              </div>
              <h3>{animal.name}</h3>
              <p><strong>Type:</strong> {animal.type}</p>
              <p><strong>Breed:</strong> {animal.breed}</p>
              <p><strong>Age:</strong> {animal.age} yrs</p>
              <p><strong>Price:</strong> ${animal.price}</p>
              <p className={animal.is_available ? "available" : "not-available"}>
                {animal.is_available ? "Available" : "Not Available"}
              </p>
              <div className="card-actions">
                <button onClick={() => navigate(`/farmers/animals/edit/${animal.id}`)}>✏️ Edit</button>
                <button onClick={() => handleDelete(animal.id)}>🗑 Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AnimalList;
