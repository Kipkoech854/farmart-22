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
    description:"",
    location:"",
    is_available: true,
  });

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    images.forEach((img) => formData.append("images", img));

    fetch("http://localhost:5555/api/animals/create", {
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

        {/* Image Previews */}
        {imagePreviews.length > 0 && (
          <div className="image-preview-container">
            {imagePreviews.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Preview ${index + 1}`}
                className="image-preview"
              />
            ))}
          </div>
        )}

        <form className="add-animal-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          <input type="text" name="description" placeholder="description" value={form.description} onChange={handleChange} required />
          <input type="text" name="type" placeholder="Type" value={form.type} onChange={handleChange} required />
          <input type="text" name="breed" placeholder="Breed" value={form.breed} onChange={handleChange} required />
          <input type="number" name="age" placeholder="Age" value={form.age} onChange={handleChange} required />
          <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
          <input type="text" name="location" placeholder="location of animal" value={form.location} onChange={handleChange} required />

          <label>
            Upload Images:
            <input type="file" accept="image/*" multiple onChange={handleImageChange} />
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
