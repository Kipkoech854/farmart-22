import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { isTokenExpired } from "../utils/jwt";
import "../Stylesheets/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const storedUser = localStorage.getItem("user");
  const isLoggedIn = storedUser && !isTokenExpired(JSON.parse(storedUser).token);

  const { cart } = useCart();

  return (
    <div className="navbar">
      <div className="logo">
        <img src="/images/farmart-logo.jpg" alt="Farmart Logo" />
      </div>

      <div className={`hamburger ${menuOpen ? "hide" : ""}`} onClick={toggleMenu}>
        ☰
      </div>

      {/* Side Drawer */}
      <div className={`side-drawer ${menuOpen ? "open" : ""}`}>
        <span className="close-btn" onClick={toggleMenu}>
          &times;
        </span>
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
            <Link to="/profile" onClick={toggleMenu}>
              <img src="/images/avatar.png" alt="Profile" className="avatar" />
            </Link>
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

      <div className="auth-links">
        {!isLoggedIn ? (
          <>
            <Link to="/signin">Sign in</Link>
            <Link to="/signup">Sign up</Link>
          </>
        ) : (
          <Link to="/profile">
            <img src="/images/avatar.png" alt="Profile" className="avatar" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;




// import React from "react";
// import { Link } from "react-router-dom";
// import { getUserRole, isTokenExpired } from "../utils/jwt";
// import "../Stylesheets/Navbar.css";

// const Navbar = () => {
//   const storedUser = localStorage.getItem("user");
//   const isLoggedIn = storedUser && !isTokenExpired(JSON.parse(storedUser).token);
//   const role = isLoggedIn ? getUserRole() : null;

//   return (
//     <div className="navbar">
//       <img src="/images/farmart-logo.jpg" alt="Farmart Logo" />
//       <nav>
//         <Link to="/">Home</Link>
//         <Link to="/shop">Shop</Link>
//         <Link to="/cart">🛒</Link>
//         <Link to="/about">About</Link>

//         {isLoggedIn ? (
//           <Link to="/profile">
//             <img src="/images/avatar.png" alt="Profile" className="avatar" />
//           </Link>
//         ) : (
//           <div className="auth-links">
//             <Link to="/Signin">Sign in</Link>
//             <Link to="/Signup">Sign up</Link>
//           </div>
//         )}
//       </nav>
//     </div>
//   );
// };

// export default Navbar;





// import React from "react";
// import { Link } from "react-router-dom";
// import "../Stylesheets/Navbar.css";


// const Navbar = () => {
//   return (
//     <div className="navbar">
//       <img src="/images/farmart-logo.jpg" alt="Farmart Logo" />
//       <nav>
//         <Link to="/">Home</Link>
//         <Link to ='shop'>Shop</Link>
//         <Link to ='Cart'>🛒</Link>
//         <Link to="/about">About</Link>
        
//         <div className="auth-links">
//               <Link to = 'Signin'>Sign in</Link>
//               <Link to ='Signup'>Sign up</Link>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;
