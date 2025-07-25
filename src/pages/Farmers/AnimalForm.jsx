import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "../../Stylesheets/AddAnimal.css";
import FarmerNavbar from "../../components/FarmerNavbar";

const AddAnimal = () => {
  const navigate = useNavigate(); 
  const [form, setForm] = useState({
    name: "",
    type: "",
    breed: "",
    age: "",
    price: "",
    is_available: true,
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (image) formData.append("image", image);

    fetch("http://localhost:5555/api/farmers/animals", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add animal");
        return res.json();
      })
      .then(() => {
        navigate("/farmers/animals"); 
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <>
      <FarmerNavbar />
      <div className="add-animal-container">
        <h2>Add New Animal</h2>
        <form className="add-animal-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          <input type="text" name="type" placeholder="Type" value={form.type} onChange={handleChange} required />
          <input type="text" name="breed" placeholder="Breed" value={form.breed} onChange={handleChange} required />
          <input type="number" name="age" placeholder="Age" value={form.age} onChange={handleChange} required />
          <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} required />

          <label>
            Upload Image:
            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
          </label>

          <label className="checkbox-label">
            <input type="checkbox" name="is_available" checked={form.is_available} onChange={handleChange} />
            Available
          </label>

          <button type="submit">Add Animal</button>

          {error && <p className="error-msg">{error}</p>}
        </form>
      </div>
    </>
  );
};

export default AddAnimal;
