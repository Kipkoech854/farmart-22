import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "../Stylesheets/FarmerNavbar.css";

const FarmerNavbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/farmers/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Detect click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="farmer-navbar-container" ref={dropdownRef}>
      <div className="profile-icon" onClick={toggleDropdown}>
        <FaUserCircle size={32} />
      </div>

      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            className="dropdown-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="dropdown-title">Farmart Farmer</h3>
            <Link to="/farmers/profile" onClick={() => setDropdownOpen(false)}>Profile</Link>
            <Link to="/farmers/edit" onClick={() => setDropdownOpen(false)}>Edit</Link>
            <Link to="/farmers/animals" onClick={() => setDropdownOpen(false)}>Animals</Link>
            <Link to="/farmers/animals/new" onClick={() => setDropdownOpen(false)}>Add Animal</Link>
            <Link to="/farmers/feedback" onClick={() => setDropdownOpen(false)}>Feedback</Link>
            <button onClick={handleSignOut} className="signout-button">Sign Out</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FarmerNavbar;
