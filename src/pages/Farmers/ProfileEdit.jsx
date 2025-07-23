import { useEffect, useState } from "react";
import FarmerNavbar from "../../components/FarmerNavbar";

const ProfileEdit = () => {
  const [form, setForm] = useState({ username: "", phone: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5555/farmers/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setForm({ username: data.username, phone: data.phone }));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5555/api/farmers", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert("Profile updated successfully!");
    console.log(data);
  };

  return (
    <>
      <FarmerNavbar />
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
        />
        
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
        />
        <button type="submit">Update Profile</button>
      </form>
    </>
  );
};

export default ProfileEdit;
