import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Stylesheets/FarmerRegister.css";

const FarmerRegister = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:5555/api/farmers/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          phone: form.phone,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Account created successfully. You can now log in.");
        navigate("/farmers/login");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
  };

  return (
    <div className="register-container">
      <h2>Register as a Farmer</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <div className="password-input">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <div className="password-input">
          <input
            name="confirmPassword"
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          <span onClick={() => setShowConfirm(!showConfirm)}>
            {showConfirm ? "🙈" : "👁️"}
          </span>
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default FarmerRegister;
