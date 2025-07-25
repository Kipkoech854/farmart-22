import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // replace with your logo path
import { isTokenExpired } from "../utils/jwt";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const user = localStorage.getItem("token");
  const isLoggedIn = user && !isTokenExpired(user);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/"><img src={logo} alt="FarmArt" /></Link>
      </div>

      <div className="center-nav">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/about">About</Link>
        <Link to="/cart">Cart</Link>
      </div>

      <div className="auth-buttons">
        {!isLoggedIn ? (
          <>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        ) : (
          <div className="avatar-container" onClick={toggleDropdown}>
            <FaUserCircle size={28} className="avatar-icon" />
            {dropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/profile">Profile</Link>
                <Link to="/orders">Orders</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {menuOpen && (
        <div className="side-drawer">
          <Link to="/" onClick={toggleMenu}>Home</Link>
          <Link to="/shop" onClick={toggleMenu}>Shop</Link>
          <Link to="/about" onClick={toggleMenu}>About</Link>
          <Link to="/cart" onClick={toggleMenu}>Cart</Link>
          {!isLoggedIn ? (
            <>
              <Link to="/signin" onClick={toggleMenu}>Sign In</Link>
              <Link to="/signup" onClick={toggleMenu}>Sign Up</Link>
            </>
          ) : (
            <>
              <Link to="/profile" onClick={toggleMenu}>Profile</Link>
              <Link to="/orders" onClick={toggleMenu}>Orders</Link>
              <button onClick={() => { toggleMenu(); handleLogout(); }}>Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
