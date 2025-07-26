import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import "../Stylesheets/SuccessPopup.css";

 export const SuccessPopup = ({ message = "Order Successful!", showPopup, onClose }) => {
  if (!showPopup) return null;

  return (
    <div className="success-popup-overlay">
      <div className="success-popup">
        <div className="checkmark-animation">
          <FaCheck />
        </div>
        <h2>{message}</h2>
        
        <button onClick={onClose} className="close-btn">
          Continue Shopping
        </button>
      </div>
    </div>
  );
};


export const App = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div>
      <button onClick={() => setShowPopup(true)}>Place Order (Demo)</button>
      <SuccessPopup
        showPopup={showPopup}
        onClose={() => setShowPopup(false)}
      />
    </div>
  );
};

export default SuccessPopup;