// src/components/Footer.jsx
import React from "react";
import "../Stylesheets/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-section">
          <h3>Farmart</h3>
          <p>Connecting farmers to buyers with trust and transparency.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: support@farmart.com</p>
          <p>Phone: +254 700 000 000</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Farmart. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
