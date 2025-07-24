import { useState } from "react";
import "../../Stylesheets/ResetPassword.css";
import PasswordInput from "../../components/PasswordInput";

const ResetPassword = () => {
  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      // Example: make sure you have the reset token if required
      const res = await fetch("http://localhost:5555/api/farmers/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: form.password }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Password reset successful!");
      } else {
        setMessage(data.message || "Reset failed.");
      }
    } catch (err) {
        console.error("Reset password error:", err);
        setMessage("Something went wrong.");
    }
  };

  return (
    <div className="reset-container">
      <h2>Reset Password</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <PasswordInput
          name="password"
          value={form.password}
          placeholder="New Password"
          onChange={handleChange}
        />
        <PasswordInput
          name="confirmPassword"
          value={form.confirmPassword}
          placeholder="Confirm Password"
          onChange={handleChange}
        />
        <button type="submit">Reset</button>
      </form>
    </div>
  );
};

export default ResetPassword;
