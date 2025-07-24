import React, { useState, useCallback } from 'react';
import '../Stylesheets/UserOrderCard.css'

export const UserOrderCard = ({ orders, onDelete }) => {
  const normalizedOrders = Array.isArray(orders) ? orders : orders ? [orders] : [];

  return (
    <div className="order-grid-container">
      <div className="order-grid">
        {normalizedOrders.map((order) => (
          <OrderItem 
            key={order.id} 
            order={order} 
            onDelete={onDelete} 
          />
        ))}
      </div>
    </div>
  );
};

const OrderItem = React.memo(({ order, onDelete }) => {
  const [showImage, setShowImage] = useState(true);
  const [showEmail, setShowEmail] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [imageIndex, setImageIndex] = useState({});

  const toggleDetails = useCallback(() => {
    setShowDetails(prev => !prev);
    setShowImage(prev => !prev);
  }, []);

  const handleProfileToggle = useCallback((e) => {
    e.stopPropagation();
    setShowEmail(prev => !prev);
  }, []);

  const handleImageNav = useCallback((itemId, direction, imagesLength) => {
    setImageIndex(prev => {
      const currentIndex = prev[itemId] || 0;
      let newIndex = currentIndex;
      
      if (direction === 'prev') {
        newIndex = Math.max(currentIndex - 1, 0);
      } else {
        newIndex = Math.min(currentIndex + 1, imagesLength - 1);
      }
      
      return { ...prev, [itemId]: newIndex };
    });
  }, []);

  return (
    <div className="order-card">
      <div className="order-summary">
        {showImage && order.items?.[0]?.images?.[0] && (
          <div className="order-image">
            <img
              src={order.items[0].images[0]}
              alt={order.items[0].name}
            />
          </div>
        )}

        <div className="order-meta">
          {/* Farmer Profile - Top Right Corner */}
          <div className="seller-profile" onClick={handleProfileToggle}>
            <div className={`profile-image ${showEmail ? 'expanded' : ''}`}>
              <img
                src={order.items[0]?.farmer_picture}
                alt={order.items[0]?.farmer_username}
              />
            </div>
            <div className="profile-info">
              <p className="username">{order.items[0]?.farmer_username}</p>
              {showEmail && (
                <a href={`mailto:${order.items[0]?.farmer_email}`} className="email">
                  {order.items[0]?.farmer_email}
                </a>
              )}
            </div>
          </div>

          {/* Order Details */}
          <div className="order-details">
            <p className="order-date">{new Date(order.created_at).toLocaleDateString()}</p>
            <h5 className="order-id">Order #{order.id}</h5>
            <h6 className="order-amount">Ksh {order.amount.toLocaleString()}</h6>
            
            <div className="status-container">
              <div className={`status-badge ${order.status.toLowerCase()}`}>
                {order.status}
              </div>
              <div className={`payment-badge ${order.paid ? 'paid' : 'unpaid'}`}>
                {order.paid ? 'Paid' : 'Not Paid'}
              </div>
              <div className={`delivered-badge ${order.delivered ? 'delivered' : 'undelivered'}`}>
                {order.paid ? 'delivered' : 'Not delivered'}
              </div>
            </div>
          </div>
          
          {/* Action Buttons - Mid Bottom */}
          <div className="order-actions">
            <button 
              className="details-btn"
              onClick={toggleDetails}
            >
              {showDetails ? "Hide Details" : "More Details"}
            </button>
            <button 
              className="delete-btn"
              onClick={() => onDelete(order.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {showDetails && (
        <div className="order-expanded-details">
          {order.items.map((item) => {
            const images = item.images || [];
            const currentIndex = imageIndex[item.animal_id] || 0;
            
            return (
              <div key={item.animal_id} className="order-item">
                <div className="item-gallery">
                  <button 
                    className="nav-btn prev"
                    onClick={() => handleImageNav(item.animal_id, 'prev', images.length)}
                    disabled={currentIndex === 0}
                  >
                    &lt;
                  </button>
                  
                  {images.length > 0 && (
                    <img
                      src={images[currentIndex]}
                      alt={item.name}
                    />
                  )}
                  
                  <button 
                    className="nav-btn next"
                    onClick={() => handleImageNav(item.animal_id, 'next', images.length)}
                    disabled={currentIndex === images.length - 1}
                  >
                    &gt;
                  </button>
                  
                  <div className="image-counter">
                    {images.length > 1 && `${currentIndex + 1}/${images.length}`}
                  </div>
                </div>

                <div className="item-details">
                  <h4 className="item-name">{item.name}</h4>
                  <p className="item-description">{item.description}</p>
                  <div className="item-specs">
                    <div className="spec">
                      <span className="spec-label">Type:</span>
                      <span className="spec-value">{item.type}</span>
                    </div>
                    <div className="spec">
                      <span className="spec-label">Breed:</span>
                      <span className="spec-value">{item.breed}</span>
                    </div>
                    <div className="spec">
                      <span className="spec-label">Age:</span>
                      <span className="spec-value">{item.age}</span>
                    </div>
                    <div className="spec">
                      <span className="spec-label">Price:</span>
                      <span className="spec-value">Ksh {item.price.toLocaleString()}</span>
                    </div>
                    <div className="spec">
                      <span className="spec-label">Qty:</span>
                      <span className="spec-value">{item.quantity}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
});