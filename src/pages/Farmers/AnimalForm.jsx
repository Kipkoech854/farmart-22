import { useState } from "react";
import FarmerNavbar from "../../components/FarmerNavbar";

const AnimalForm = () => {
  const [form, setForm] = useState({
    name: "",
    breed: "",
    price: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5555/animals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert("Animal added successfully!");
    console.log(data);
  };

  return (

    <>
      <FarmerNavbar />
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Animal Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="type"
          placeholder="Type"
          value={form.type}
          onChange={handleChange}
        />
        <input
          name="breed"
          placeholder="Breed"
          value={form.breed}
          onChange={handleChange}
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />
        <button type="submit">Add Animal</button>
      </form>
    </>
  );
};

export default AnimalForm;
