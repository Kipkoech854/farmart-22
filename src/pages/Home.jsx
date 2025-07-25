import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";
import '../Stylesheets/Home.css';

export const Home = () => {

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
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

      <section className="services-section">
        <h2>Our Services</h2>
        <div className="services-grid" data-aos="fade-up">
          <div className="service-card">
            <img src="/images/service1.jpeg" alt="Service 1" />
            <h3>Livestock Trading</h3>
            <p>Buy and sell farm animals with verified farmers and buyers.</p>
          </div>
          <div className="service-card">
            <img src="/images/service2.jpeg" alt="Service 2" />
            <h3>Farm Inputs</h3>
            <p>Access seeds, feeds, and veterinary products directly from sellers.</p>
          </div>
          <div className="service-card">
            <img src="/images/service3.jpeg" alt="Service 3" />
            <h3>Expert Consultations</h3>
            <p>Get advice and support from agricultural specialists.</p>
          </div>
          <div className="service-card">
            <img src="/images/service4.jpeg" alt="Service 4" />
            <h3>Farmer Profiles</h3>
            <p>View verified farmer profiles and their livestock listings.</p>
          </div>
        </div>
      </section>

      <section className="partners-section" data-aos="fade-up">
        <h2>Our Partners</h2>
        <div className="partners-logos">
          <img src="/images/partner1.png" alt="Partner 1" />
          <img src="/images/partner2.webp" alt="Partner 2" />
          <img src="/images/partner3.png" alt="Partner 3" />
          <img src="/images/partner4.png" alt="Partner 4" />
          <img src="/images/partner5.png" alt="Partner 5" />
        </div>
      </section>
    </>
  );
};

