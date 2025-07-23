import { Link, useNavigate } from "react-router-dom";
import "../Stylesheets/FarmerNavbar.css";

const FarmerNavbar = () => {
  const navigate = useNavigate();

 const handleSignOut = () => {
  localStorage.removeItem("token");
  navigate("/farmers/login");
};
  return (
    <nav className="farmer-navbar">
      <h1 className="navbar-title">Farmart Farmer</h1>
      <div className="navbar-links">
        <Link to="/farmers/profile">Profile</Link>
        <Link to="/farmers/edit">Edit</Link>
        <Link to="/farmers/animals">Animals</Link>
        <Link to="/farmers/animals/new">Add Animal</Link>
        <Link to="/farmers/feedback">Feedback</Link>
        <button onClick={handleSignOut} className="signout-button">Sign Out</button>
      </div>
    </nav>
  );
};

export default FarmerNavbar;