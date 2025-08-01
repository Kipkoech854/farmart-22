import React from 'react';
import '../Stylesheets/LivestockModal.css';

const LivestockModal = ({ livestock, onClose, onAddToCart, onBuyNow }) => {
  if (!livestock) return null;

  const { name, breed, age, type, description, price, is_available, images = [] } = livestock;

  return (
    <div className="livestock-modal-overlay" onClick={onClose}>
      <div className="livestock-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <button className="like-btn">❤️</button>

        <div className="livestock-images">
          {images.map((imgObj, idx) => (
            <img
              key={idx}
              src={imgObj.url}
              alt={`${name}-${idx}`}
              onError={(e) => (e.target.style.display = 'none')}
            />
          ))}
        </div>

        <div className="livestock-details">
          <h2>{name}</h2>
          <p className="livestock-sub">{breed} · {type}</p>
          <p className="livestock-desc">{description}</p>
          <p><strong>Age:</strong> {age} years</p>
          <p className="livestock-price">Ksh {price}</p>
        </div>

        <div className="livestock-buttons">
          <button
            onClick={onAddToCart}
            disabled={!is_available}
            className="add-to-cart"
          >
            Add to Cart
          </button>
          <button
            onClick={onBuyNow}
            disabled={!is_available}
            className="buy-now"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default LivestockModal;
