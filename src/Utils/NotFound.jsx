import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Stylesheets/NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="error-code">
          <span className="digit">4</span>
          <span className="digit">0</span>
          <span className="digit">4</span>
        </div>
        
        <h1 className="error-title">Page Not Found</h1>
        
        <p className="error-message">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="action-buttons">
          <button 
            onClick={() => navigate(-1)} 
            className="back-button"
          >
            Go Back
          </button>
          
          <button 
            onClick={() => navigate('/')} 
            className="home-button"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;