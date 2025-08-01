
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginUser, register as registerUser } from "../services/authService";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: '', password: '', role: 'user' });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = isLogin ? await loginUser(form) : await registerUser(form);
      localStorage.setItem("user", JSON.stringify(data));
      setMessage("Success!");
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1000);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="auth-form">
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" required />
        {!isLogin && (
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="farmer">Farmer</option>
          </select>
        )}
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>
      <p>{message}</p>
      <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: "pointer", color: "blue" }}>
        {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
      </p>
    </div>
  );
};

export default AuthForm;
















// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { loginUser, registerUser } from "../services/authService";
// // import { isTokenExpired } from "../utils/jwt";

// const AuthForm = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [form, setForm] = useState({ email: '', password: '', role: 'user' });
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const data = isLogin ? await loginUser(form) : await registerUser(form);
//       localStorage.setItem("user", JSON.stringify(data));
//       setMessage("Success!");
//       setTimeout(() => {
//         navigate("/");
//         window.location.reload();
//       }, 1000);
//     } catch (err) {
//       setMessage(err.message);
//     }
//   };

//   return (
//     <div className="auth-form">
//       <h2>{isLogin ? "Login" : "Register"}</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
//         <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" required />
//         {!isLogin && (
//           <select name="role" value={form.role} onChange={handleChange}>
//             <option value="user">User</option>
//             <option value="farmer">Farmer</option>
//           </select>
//         )}
//         <button type="submit">{isLogin ? "Login" : "Register"}</button>
//       </form>
//       <p>{message}</p>
//       <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: "pointer", color: "blue" }}>
//         {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
//       </p>
//     </div>
//   );
// };

// export default AuthForm;




