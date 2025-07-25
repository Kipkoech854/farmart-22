import React, { useState, useEffect, useRef } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { isTokenExpired } from "../utils/jwt";
import "../Stylesheets/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { cart } = useCart();

  const storedUser = localStorage.getItem("user");
  const userData = storedUser ? JSON.parse(storedUser) : null;
  const token = userData?.token;
  const isLoggedIn = userData && !isTokenExpired(token);
  const role = userData?.role || ""; // customer, farmer, admin

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/signin");
  };

  // Close dropdown when clicking outside
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
    if (role === "customer") {
      return (
        <>
          <Link to="/profile" onClick={toggleMenu}>My Profile</Link>
          <Link to="/orders" onClick={toggleMenu}>My Orders</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      );
    } else if (role === "farmer") {
      return (
        <>
          <Link to="/profile" onClick={toggleMenu}>My Profile</Link>
          <Link to="/orders" onClick={toggleMenu}>My Orders</Link>
          <Link to="/add-animal" onClick={toggleMenu}>Add Animal</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      );
    } else if (role === "admin") {
      return (
        <>
          <Link to="/admin" onClick={toggleMenu}>Admin Dashboard</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      );
    }
    return null;
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src="/images/farmart-logo.jpg" alt="Farmart Logo" />
      </div>

      <div className={`hamburger`} onClick={toggleMenu}>
        ☰
      </div>

      {/* Side Drawer for Mobile */}
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

      {/* Center Nav for Desktop */}
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

      {/* Avatar for Desktop */}
      <div className="auth-links" ref={dropdownRef}>
        {!isLoggedIn ? (
          <>
            <Link to="/signin">Sign in</Link>
            <Link to="/signup">Sign up</Link>
          </>
        ) : (
          <div className="avatar-wrapper" onClick={toggleDropdown}>
            <img src="/images/avatar.png" alt="Profile" className="avatar" />
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
