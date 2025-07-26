import React, { useState } from 'react';
import { RemovefromCart } from './RemovefromCart';
import '../Stylesheets/OrderCard.css';

export const AnimalCard = ({ animal }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const images = Array.isArray(animal.images)
    ? animal.images.map(img => img.url)
    : [];

  const handlePrevImage = () => {
    setImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNextImage = () => {
    setImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="animal-card">
      <div className="animal-card-image-container">
        <img
          className="animal-card-image"
          src={images?.[imageIndex] || 'https://via.placeholder.com/800x400?text=No+Image'}
          alt={animal.name}
        />

        {images.length > 1 && (
          <>
            <button 
              className="animal-card-arrow animal-card-arrow-left"
              onClick={handlePrevImage}
              aria-label="Previous image"
            >
              &lt;
            </button>
            
            <button 
              className="animal-card-arrow animal-card-arrow-right"
              onClick={handleNextImage}
              aria-label="Next image"
            >
              &gt;
            </button>
          </>
        )}
      </div>

      <div className="animal-card-content">
        <h2 className="animal-card-title">{animal.name}</h2>

        <div className="animal-card-chips">
          <span className="animal-card-chip animal-card-chip-primary">
            <span role="img" aria-label="Type">🐾</span> {animal.type}
          </span>
          <span className="animal-card-chip">{animal.breed}</span>
          {animal.county && (
            <span className="animal-card-chip">
              <span role="img" aria-label="Location">📍</span> {animal.county}
            </span>
          )}
          <span className="animal-card-chip">{animal.age} years</span>
        </div>

        <div className="animal-card-price">
          KSh {animal.price.toLocaleString('en-KE')}
        </div>

        <div className="animal-card-divider"></div>

        <p className="animal-card-description">
          {animal.description}
        </p>

        <h3 className="animal-card-status-title">Health Status:</h3>
        <span 
          className={`animal-card-status ${
            animal.is_available 
              ? 'animal-card-status-available' 
              : 'animal-card-status-sold'
          }`}
        >
          {animal.is_available ? 'Available - Vaccinated' : 'Sold'}
        </span>

        <div className="animal-card-actions">
          <RemovefromCart item={animal} />
        </div>
      </div>
    </div>
  );
};

export const OrderCard = ({ animals }) => {
  const normalizedAnimals = Array.isArray(animals)
    ? animals
    : animals && typeof animals === "object"
    ? [animals]
    : [];

  return (
    <div className="order-card-container">
      {normalizedAnimals.map((animal, index) => (
        <AnimalCard key={`animal-${index}`} animal={animal} />
      ))}
    </div>
  );
};
