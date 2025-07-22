import React from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <nav className="w-full flex justify-between bg-green-500 p-4 text-white">
      <Link to="/" className="home">Home</Link>
      <Link to="/about" className="about">About</Link>
    </nav>
  );
};

export default Navbar;
