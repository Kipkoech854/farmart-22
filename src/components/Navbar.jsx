import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import "../Stylesheets/Navbar.css";

const Navbar = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  const closeAll = () => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeAll();
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div className={`desktop-navbar ${isMobile ? "hidden" : ""}`}>
        <div className="desktop-nav-container">
          <div className="nav-left">
            <img src="/images/farmart-logo.jpg" alt="Farmart Logo" className="logo" />
            <nav className="main-links">
              <Link to="/">Home</Link>
              <Link to="/shop">Shop</Link>
              <Link to="/about">About</Link>
            </nav>
          </div>

          <div className="nav-right">
            <Link to="/cart" className="cart-link">
              <span className="cart-icon">🛒</span>
              {cart.length > 0 && (
                <sup className="cart-count">{cart.length}</sup>
              )}
            </Link>

            {user ? (
              <div className="profile-container">
                <div className="profile-icon" onClick={toggleProfile}>
                  👤
                </div>
                {isProfileOpen && (
                  <div className="profile-dropdown">
                    <div className="profile-header">
                      <span>👤</span>
                      <div>
                        <strong>{user.name || user.email}</strong>
                        <small>{user.email}</small>
                      </div>
                    </div>
                    <Link to="/profile" onClick={closeAll}>My Profile</Link>
                    <Link to="/orders" onClick={closeAll}>My Orders</Link>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-links">
                <Link to="/signin">Sign in</Link>
                <Link to="/signup">Sign up</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className={`mobile-navbar ${isMobile ? "" : "hidden"}`}>
        <Link to="/" onClick={closeAll}>
          <span>🏠</span> Home
        </Link>
        <Link to="/shop" onClick={closeAll}>
          <span>🛍️</span> Shop
        </Link>
        <Link to="/cart" onClick={closeAll} className="cart-link">
          <span className="cart-icon">
            🛒
            {cart.length > 0 && (
              <sup className="cart-count">{cart.length}</sup>
            )}
          </span>
        </Link>
        <Link to="/about" onClick={closeAll}>
          <span>ℹ️</span> About
        </Link>
        {user ? (
          <Link to="/profile" onClick={closeAll}>
            <span>👤</span> Profile
          </Link>
        ) : (
          <Link to="/signin" onClick={closeAll}>
            <span>🔑</span> Login
          </Link>
        )}
      </div>
    </>
  );
};

export default Navbar;

