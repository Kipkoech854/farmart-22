import React from 'react';
import Slider from 'react-slick';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import '../Stylesheets/LivestockCard.css';

const LivestockCard = ({ livestock, onViewDetails, onAddToCart, onBuyNow, onToggleLike }) => {
  const images = livestock?.images?.map(img => img.url) || [livestock.image || '/fallback.jpg'];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 300,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  return (
    <div className="livestock-card">
      {/* Like Button */}
      <button
        className="like-button"
        onClick={onToggleLike}
        aria-label="like"
      >
        <FavoriteBorderIcon style={{ color: 'red' }} />
      </button>

      {/* Image Slider */}
      <div className="livestock-image" onClick={onViewDetails}>
        {images.length > 1 ? (
          <Slider {...sliderSettings}>
            {images.map((url, idx) => (
              <img key={idx} src={url} alt={livestock.name} />
            ))}
          </Slider>
        ) : (
          <img src={images[0]} alt={livestock.name} />
        )}
      </div>

      {/* Info Section */}
      <div className="livestock-info">
        <h3>{livestock.name}</h3>
        <div className="tags">
          <span className="tag filled">{livestock.type}</span>
          <span className="tag outlined">{livestock.breed}</span>
          <span className="tag location">📍 {livestock.location || livestock.county}</span>
        </div>
        <p className="description">{livestock.description}</p>
        <div className="bottom-row">
          <strong>KSh {livestock.price?.toLocaleString()}</strong>
          <span className="age">{livestock.age} yrs</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="action-buttons">
        <button className="add-button" onClick={onAddToCart}>Add to Cart</button>
        <button className="buy-button" onClick={onBuyNow}>Buy Now</button>
      </div>
    </div>
  );
};

export default LivestockCard;
