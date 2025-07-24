import React from 'react';
import '../Stylesheets/Home.css';
import { Link } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';

export const Home = () => {

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);


  return (
    <div className="landing-container">
      <div className="text-section" data-aos="fade-right">
        <p className="bridge-line">
          <span className="highlight">Bridging</span> the gap between farmers and buyers
        </p>
        <h1>
          Seamlessly in <span className="highlight">Farm</span> Spaces
        </h1>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <div className="button-group" data-aos="fade-up">
          <Link to="/signup" className="btn primary">Get Started</Link>
          <Link to="/shop" className="btn outline">Our Services</Link>
        </div>
      </div>

      <div className="image-section" data-aos="fade-left">
        <img src="./images/Landing-horse.png" alt="Horse" />
      </div>
    </div>
  );
};
