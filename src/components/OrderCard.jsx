import React, { useState } from 'react';
import '../Stylesheets/OrderCard.css'; 
import { Checkout } from '../Utils/Checkout';



const AnimalCard = ({ animal }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const handlePrev = () => {
    if (imageIndex > 0) setImageIndex(imageIndex - 1);
  };

  const handleNext = () => {
    if (imageIndex < animal.images.length - 1) setImageIndex(imageIndex + 1);
  };

  return (
    <div className="animal-card">
      <div className="image-container">
        <img
          className="animal-image"
          src={animal.images?.[imageIndex]?.url || 'https://via.placeholder.com/300x200?text=No+Image'}
          alt={animal.name}
        />
        <button onClick={handlePrev} style={{ position: 'absolute', left: 10, top: '50%' }}><p>{'<'}</p></button>
        <button onClick={handleNext} style={{ position: 'absolute', right: 10, top: '50%' }}><p>{'>'}</p></button>
      </div>
      <div className="animal-details">
        <h3 className="animal-name">{animal.name}</h3>
        <p className="animal-price">Ksh {animal.price}</p>
        <p className="animal-description">{animal.description}</p>
        <p className="animal-type">{animal.type}</p>
        <p className="animal-breed">{animal.breed}</p>
        <p className="animal-age">{animal.age} years old</p>
        <span
          className="animal-availability"
          available={animal.is_available ? "true" : ""}
        >
          {animal.is_available ? "Available" : "Unavailable"}
        </span>
      </div>
    </div>
  );
};

export const OrderCard = ({ animals }) => {

  return (
    <div className="animal-list">
      {animals.map((animal, index) => (
        <AnimalCard key={index} animal={animal} />
      ))}
    </div>
  );
};
