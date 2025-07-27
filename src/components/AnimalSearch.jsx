import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Stylesheets/AnimalSearch.css';

const AnimalSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim().length > 2) {
        fetchSuggestions();
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchSuggestions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5555/api/search?query=${encodeURIComponent(searchTerm)}`
      );
      const data = await response.json();
      setSuggestions(data.animals || []);
    } catch (err) {
      setError('Failed to fetch suggestions');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (animal) => {
    setSelectedAnimal(animal);
    setSearchTerm('');
    setSuggestions([]);
  };

  const handleViewDetails = (animalId) => {
    navigate(`/animals/${animalId}`);
  };

  return (
    <div className="animal-search-container">
      <div className="search-box">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by type, breed, or location..."
          className="search-input"
        />
        {isLoading && <div className="spinner"></div>}
        
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((animal) => (
              <li 
                key={animal.id} 
                onClick={() => handleSuggestionClick(animal)}
                className="suggestion-item"
              >
                <div className="suggestion-text">
                  <span className="animal-name">{animal.name}</span>
                  <span className="animal-details">
                    {animal.type} • {animal.breed} • {animal.location}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedAnimal && (
        <div className="animal-detail-preview">
          <h3>{selectedAnimal.name}</h3>
          <div className="image-gallery">
            {selectedAnimal.images.map((img, index) => (
              <img 
                key={index} 
                src={img} 
                alt={`${selectedAnimal.name} ${index + 1}`}
                className="preview-image"
              />
            ))}
          </div>
          <p>Type: {selectedAnimal.type}</p>
          <p>Breed: {selectedAnimal.breed}</p>
          <p>Age: {selectedAnimal.age} years</p>
          <p>Price: ${selectedAnimal.price}</p>
          <p>Location: {selectedAnimal.location}</p>
          <button 
            onClick={() => handleViewDetails(selectedAnimal.id)}
            className="view-details-btn"
          >
            View Full Details
          </button>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default AnimalSearch;