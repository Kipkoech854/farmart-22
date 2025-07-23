import React from "react";
import { Link } from "react-router-dom";
import { isTokenExpired } from "../utils/jwt";
import "../Stylesheets/Navbar.css";

const Navbar = () => {
  const storedUser = localStorage.getItem("user");
  const isLoggedIn = storedUser && !isTokenExpired(JSON.parse(storedUser).token);

  return (
    <div className="navbar">
      <img src="/images/farmart-logo.jpg" alt="Farmart Logo" />
      <nav>
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/cart">🛒</Link>
        <Link to="/about">About</Link>

        {isLoggedIn ? (
          <Link to="/profile">
            <img src="/images/avatar.png" alt="Profile" className="avatar" />
          </Link>
        ) : (
          <div className="auth-links">
            <Link to="/Signin">Sign in</Link>
            <Link to="/Signup">Sign up</Link>
          </div>
        )}
      </nav>
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
