import React, { useState, useEffect, useRef } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import "../Stylesheets/Navbar.css";
import { useAuth } from "../context/AuthContext";
import { getUserRole } from "../utils/decodeToken";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { cart } = useCart();
  const { user, logout, isLoggedIn } = useAuth(); 
  console.log("user:", user)
  

  const role = getUserRole();
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    setDropdownOpen(false);
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderRoleMenu = () => {
    switch (role) {
      case "customer":
        return (
          <>
            <Link to="/profile" onClick={toggleMenu}>My Profile</Link>
            <Link to="/orders" onClick={toggleMenu}>My Orders</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        );
      case "farmer":
        return (
          <>
            <Link to="/farmers/profile" onClick={toggleMenu}>My Profile</Link>
            <Link to="/orders" onClick={toggleMenu}>My Orders</Link>
            <Link to="/add-animal" onClick={toggleMenu}>Add Animal</Link> 
            <button onClick={handleLogout}>Logout</button>
          </>
        );
      case "admin":
        return (
          <>
            <Link to="/admin" onClick={toggleMenu}>Admin Dashboard</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="navbar">
      {/* Logo */}
      <div className="logo">
        <img src="/images/farmart-logo.jpg" alt="Farmart Logo" />
      </div>

      {/* Hamburger icon for mobile */}
      <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div>

      {/* Mobile Side Drawer */}
      <div className={`side-drawer ${menuOpen ? "open" : ""}`}>
        <span className="close-btn" onClick={toggleMenu}>&times;</span>
        <nav>
          <Link to="/" onClick={toggleMenu}>Home</Link>
          <Link to="/shop" onClick={toggleMenu}>Shop</Link>
          <Link to="/about" onClick={toggleMenu}>About</Link>
          <Link to="/cart" onClick={toggleMenu}>
            Cart 🛒 {cart.length > 0 && <sup className="cart-count">{cart.length}</sup>}
          </Link>
          {!isLoggedIn ? (
            <>
              <Link to="/signin" onClick={toggleMenu}>Sign in</Link>
              <Link to="/signup" onClick={toggleMenu}>Sign up</Link>
            </>
          ) : (
            <div className="mobile-dropdown">
              {renderRoleMenu()}
            </div>
          )}
        </nav>
      </div>

      {/* Desktop Center Nav */}
      <div className="center-nav">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/about">About</Link>
          <Link to="/cart">
            Cart 🛒 {cart.length > 0 && <sup className="cart-count">{cart.length}</sup>}
          </Link>
        </nav>
      </div>

      {/* Avatar & Auth Links */}
      <div className="auth-links" ref={dropdownRef}>
        {!isLoggedIn ? (
          <>
            <Link to="/signin">Sign in</Link>
            <Link to="/signup">Sign up</Link>
          </>
        ) : (
         <div className="avatar-wrapper" onClick={toggleDropdown}>
  {user?.profile_picture ? (
    <img
      src={`http://127.0.0.1:5555/static/${user.profile_picture}`}
      alt="Profile"
      className="avatar-img"
    />
  ) : (
    <div className="avatar-text">
      {user?.username?.[0]?.toUpperCase()}
    </div>
  )}

  {dropdownOpen && (
    <div className="dropdown-menu">
      {renderRoleMenu()}
    </div>
  )}
</div>

        )}
      </div>
    </div>
  );
};

export default Navbar;
