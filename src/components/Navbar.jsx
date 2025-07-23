import React from "react";
import { Link } from "react-router-dom";
import "../Stylesheets/Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <img src="/images/farmart-logo.jpg" alt="Farmart Logo" />
      <nav>
        <Link to="/">Home</Link>
        <Link to ='shop'>Shop</Link>       
        <Link to="/about">About</Link>
        <Link to ='Cart'>🛒</Link>
        <div className="auth-links">
              <Link to = 'Signin'>Sign in</Link>
              <Link to ='Signup'>Sign up</Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
