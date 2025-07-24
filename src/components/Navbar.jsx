import React from "react";
import { Link } from "react-router-dom";
import "../Stylesheets/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="navbar">
      <div className="logo">
        <img src="/images/farmart-logo.jpg" alt="Farmart Logo" />
      </div>

      <div className={`hamburger ${menuOpen ? "hide" : ""}`} onClick={toggleMenu}>
        ☰
      </div>

      <div className={`side-drawer ${menuOpen ? "open" : ""}`}>
        <span className="close-btn" onClick={toggleMenu}>
          &times;
        </span>
        <nav>
          <Link to="/" onClick={toggleMenu}>Home</Link>
          <Link to="/shop" onClick={toggleMenu}>Shop</Link>
          <Link to="/about" onClick={toggleMenu}>About</Link>
          <Link to="/cart" onClick={toggleMenu}>Cart 🛒</Link>
         
        </nav>
      </div>
      
      <div className="center-nav">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/about">About</Link>
          <Link to="/cart">Cart 🛒</Link>
        </nav>
      </div>

      <div className="auth-links">
        <Link to="/signin">Sign in</Link>
        <Link to="/signup">Sign up</Link>
      </div>
    </div>

  );
};

export default Navbar;
