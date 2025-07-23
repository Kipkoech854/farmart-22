import { Link } from "react-router-dom";

const FarmerNavbar = () => {
  return (
    <nav className="bg-green-700 p-4 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">Farmart Farmer</h1>
      <div className="space-x-4">
        <Link to="/farmers/profile">Profile</Link>
        <Link to="/farmers/edit">Edit</Link>
        <Link to="/farmers/animals">Animals</Link>
        <Link to="/farmers/animals/new">Add Animal</Link>
        <Link to="/farmers/feedback">Feedback</Link>
      </div>
    </nav>
  );
};

export default FarmerNavbar;
