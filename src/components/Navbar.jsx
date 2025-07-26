import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import logo from "../assets/default-profile.jpeg";
import { isTokenExpired } from "../utils/jwt";
// import useCart and useAuth if needed
// import { useCart } from "../context/CartContext";
// import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const token = localStorage.getItem("token");
  const isLoggedIn = token && !isTokenExpired(token);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="FarmArt" />
        </Link>
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

      {/* Mobile Menu */}
      {isMobile && (
        <div className="hamburger" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      )}

      {isMobile && menuOpen && (
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







// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { useCart } from "../context/CartContext";
// import "../Stylesheets/Navbar.css";

// const Navbar = () => {

//   const { cart } = useCart();
//   const { user, logout } = useAuth();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
    
//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, []);

//   const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
//   const closeAll = () => {
//     setIsMenuOpen(false);
//     setIsProfileOpen(false);
//   };

//   const handleLogout = () => {
//     logout();
//     closeAll();
//   };

//   return (
//     <>
//       {/* Desktop Navigation */}
//       <div className={`desktop-navbar ${isMobile ? "hidden" : ""}`}>
//         <div className="desktop-nav-container">
//           <div className="nav-left">
//             <img src="/images/farmart-logo.jpg" alt="Farmart Logo" className="logo" />
//             <nav className="main-links">
//               <Link to="/">Home</Link>
//               <Link to="/shop">Shop</Link>
//               <Link to="/about">About</Link>
//             </nav>
//           </div>

//           <div className="nav-right">
//             <Link to="/cart" className="cart-link">
//               <span className="cart-icon">🛒</span>
//               {cart.length > 0 && (
//                 <sup className="cart-count">{cart.length}</sup>
//               )}
//             </Link>

//             {user ? (
//               <div className="profile-container">
//                 <div className="profile-icon" onClick={toggleProfile}>
//                   👤
//                 </div>
//                 {isProfileOpen && (
//                   <div className="profile-dropdown">
//                     <div className="profile-header">
//                       <span>👤</span>
//                       <div>
//                         <strong>{user.name || user.email}</strong>
//                         <small>{user.email}</small>
//                       </div>
//                     </div>
//                     <Link to="/profile" onClick={closeAll}>My Profile</Link>
//                     <Link to="/orders" onClick={closeAll}>My Orders</Link>
//                     <button onClick={handleLogout}>Logout</button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="auth-links">
//                 <Link to="/signin">Sign in</Link>
//                 <Link to="/signup">Sign up</Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Mobile Bottom Navigation */}
//       <div className={`mobile-navbar ${isMobile ? "" : "hidden"}`}>
//         <Link to="/" onClick={closeAll}>
//           <span>🏠</span> Home
//         </Link>
//         <Link to="/shop" onClick={closeAll}>
//           <span>🛍️</span> Shop
//         </Link>
//         <Link to="/cart" onClick={closeAll} className="cart-link">
//           <span className="cart-icon">
//             🛒
//             {cart.length > 0 && (
//               <sup className="cart-count">{cart.length}</sup>
//             )}
//           </span>
//         </Link>
//         <Link to="/about" onClick={closeAll}>
//           <span>ℹ️</span> About
//         </Link>
//         {user ? (
//           <Link to="/profile" onClick={closeAll}>
//             <span>👤</span> Profile
//           </Link>
//         ) : (
//           <Link to="/signin" onClick={closeAll}>
//             <span>🔑</span> Login
//           </Link>
//         )}
//       </div>
//     </>
  

//   const [menuOpen, setMenuOpen] = React.useState(false);
//   const toggleMenu = () => setMenuOpen(!menuOpen);

//   return (
//     <div className="navbar">
//       <div className="logo">
//         <img src="/images/farmart-logo.jpg" alt="Farmart Logo" />
//       </div>

//       <div className={`hamburger ${menuOpen ? "hide" : ""}`} onClick={toggleMenu}>
//         ☰
//       </div>

//       <div className={`side-drawer ${menuOpen ? "open" : ""}`}>
//         <span className="close-btn" onClick={toggleMenu}>
//           &times;
//         </span>
//         <nav>
//           <Link to="/" onClick={toggleMenu}>Home</Link>
//           <Link to="/shop" onClick={toggleMenu}>Shop</Link>
//           <Link to="/about" onClick={toggleMenu}>About</Link>
//           <Link to="/cart" onClick={toggleMenu}>Cart 🛒</Link>
         
//         </nav>
//       </div>
      
//       <div className="center-nav">
//         <nav>
//           <Link to="/">Home</Link>
//           <Link to="/shop">Shop</Link>
//           <Link to="/about">About</Link>
//           <Link to="/cart">Cart 🛒</Link>
//         </nav>
//       </div>

//       <div className="auth-links">
//         <Link to="/signin">Sign in</Link>
//         <Link to="/signup">Sign up</Link>
//       </div>
//     </div>


//   );
// };

// export default Navbar;

