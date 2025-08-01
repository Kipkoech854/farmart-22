import React from 'react';
import { FaTractor, FaShoppingCart, FaHandshake, FaChartLine } from 'react-icons/fa';
import '../Stylesheets/About.css'

const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <div className="about-hero">
        <h1>Growing Connections, Harvesting Success</h1>
        <p>Farmart bridges the gap between farmers and buyers in the digital marketplace</p>
      </div>

      {/* Mission Section */}
      <div className="mission-section">
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>
            Farmart empowers farmers by providing a dedicated platform to sell livestock directly to buyers,
            eliminating middlemen and ensuring fair prices for quality animals.
          </p>
        </div>
        <div className="mission-image">
          <FaTractor className="mission-icon" />
        </div>
      </div>

      {/* Features Grid */}
      <div className="features-section">
        <h2>Why Choose Farmart?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <FaShoppingCart className="feature-icon" />
            <h3>Direct Sales</h3>
            <p>Connect directly with buyers without intermediaries taking your profits</p>
          </div>
          <div className="feature-card">
            <FaHandshake className="feature-icon" />
            <h3>Trusted Network</h3>
            <p>Verified farmers and buyers with transparent transaction history</p>
          </div>
          <div className="feature-card">
            <FaChartLine className="feature-icon" />
            <h3>Market Insights</h3>
            <p>Real-time pricing data to help you get the best value</p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="how-it-works">
        <h2>Simple Selling Process</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>List Your Animals</h3>
            <p>Upload details with photos and health records</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Receive Offers</h3>
            <p>Buyers contact you directly through our platform</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Secure Payment</h3>
            <p>Escrow system ensures you get paid</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;