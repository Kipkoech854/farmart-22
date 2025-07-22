import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import "../Stylesheets/Navbar.css";

const Navbar = () => {
  const { cart } = useCart(); 

  return (
    <div className="navbar">
      <img src="/images/farmart-logo.jpg" alt="Farmart Logo" />
      <nav>
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/cart">
          🛒
          {cart.length > 0 && (
            <sup className="cart-count">{cart.length}</sup> 
          )}
        </Link>
        <Link to="/about">About</Link>

        <div className="auth-links">
          <Link to="/signin">Sign in</Link>
          <Link to="/signup">Sign up</Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
