import { useEffect, useState } from "react";
import FarmerNavbar from "../../components/FarmerNavbar";

const AnimalList = () => {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5555/api/farmers/animals", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(setAnimals);
  }, []);

  return (
    <div>
      <FarmerNavbar />
      <h2>My Animals</h2>
      {animals.map((animal) => (
        <div key={animal.id}>
          <h4>{animal.name}</h4>
          <p>Breed: {animal.breed}</p>
          <p>Price: {animal.price}</p>
        </div>
      ))}
    </div>
  );
};

export default AnimalList;
