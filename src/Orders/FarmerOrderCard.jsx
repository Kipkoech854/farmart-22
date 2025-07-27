import React, { useState, useCallback } from 'react';
import '../Stylesheets/UserOrderCard.css';

export const FarmerOrderCard = ({ orders, onDelete, renderActions }) => {
  // Improved normalization with flattening and key handling
  const normalizedOrders = Array.isArray(orders) 
    ? orders.flat().filter(order => order && order.id) 
    : orders ? [orders] : [];

  return (
    <div className="order-grid-container">
      <div className="order-grid">
        {normalizedOrders.map((order) => {
          console.log("Rendering order:", order);
          return(
          <OrderItem 
            key={order.id} 
            order={order} 
            onDelete={onDelete}
            renderActions={renderActions} 
          />
         )})}
      </div>
    </div>
  );
};

const OrderItem = React.memo(({ order, onDelete, renderActions }) => {
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

  const handleImageNav = useCallback((animalId, direction, imagesLength) => {
    setImageIndex(prev => {
      const currentIndex = prev[animalId] || 0;
      let newIndex = currentIndex;
      
      if (direction === 'prev') {
        newIndex = Math.max(currentIndex - 1, 0);
      } else {
        newIndex = Math.min(currentIndex + 1, imagesLength - 1);
      }
      
      return { ...prev, [animalId]: newIndex };
    });
  }, []);

  // Safely handle status and other properties
  const status = order.status || 'unknown';
  const paidStatus = order.paid ? 'paid' : 'unpaid';
  const deliveredStatus = order.delivered ? 'delivered' : 'undelivered';
  const amount = order.amount ? Number(order.amount) : 0;

  return (
    <div className="order-card">
      <div className="order-summary">
        {/* Safely handle first image */}
        {showImage && order.animals?.[0]?.items?.[0]?.images?.[0] && (
          <div className="order-image">
           <img
             src={`http://localhost:5555/${order.animals[0].items[0].images[0]}`}
             alt={order.animals[0].items[0].name || 'Order item'}
            />

          </div>
        )}

        <div className="order-meta">
          {/* Customer Profile Section */}
          <div className="seller-profile" onClick={handleProfileToggle}>
            <div className={`profile-image ${showEmail ? 'expanded' : ''}`}>
              {order.user_info.profile_picture && (
                <img
                  src={order.user_info.profile_picture}
                  alt={order.user_info.username || 'Customer'}
                />
              )}
            </div>
            <div className="profile-info">
              <p className="username">@{order.user_info.username || 'customer'}</p>
              {showEmail && order.user_info.email && (
                <a href={`mailto:${order.user_info.email}`} className="email">
                  {order.user_info.email}
                </a>
              )}
            </div>
          </div>

          {/* Order Details */}
          <div className="order-details">
            <p className="order-date">
              {order.created_at ? new Date(order.created_at).toLocaleDateString() : 'Unknown date'}
            </p>
            <h5 className="order-id">Order #{order.id || 'N/A'}</h5>
            <h6 className="order-amount">Ksh {amount.toLocaleString()}</h6>
            
            <div className="status-container">
              <div className={`status-badge ${status.toLowerCase()}`}>
                {status}
              </div>
              <div className={`payment-badge ${paidStatus}`}>
                {order.paid ? 'Paid' : 'Not Paid'}
              </div>
              <div className={`delivered-badge ${deliveredStatus}`}>
                {order.delivered ? 'Delivered' : 'Not Delivered'}
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          
          <div className="order-actions">
            {renderActions && renderActions(order)}
            <button 
              className="details-btn"
              onClick={toggleDetails}
            >
              {showDetails ? "Hide Details" : "More Details"}
            </button>
            {onDelete && (
              <button 
                className="delete-btn"
                onClick={() => onDelete(order.id)}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>

      {showDetails && (
        <div className="order-expanded-details">
          {order.animals?.[0]?.items?.map((item) => {
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
                      alt={item.name || 'Animal'}
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
                  <h4 className="item-name">{item.name || 'Unnamed Animal'}</h4>
                  <p className="item-description">{item.description || 'No description available'}</p>
                  <div className="item-specs">
                    <div className="spec">
                      <span className="spec-label">Type:</span>
                      <span className="spec-value">{item.type || 'N/A'}</span>
                    </div>
                    <div className="spec">
                      <span className="spec-label">Breed:</span>
                      <span className="spec-value">{item.breed || 'N/A'}</span>
                    </div>
                    <div className="spec">
                      <span className="spec-label">Age:</span>
                      <span className="spec-value">{item.age || 'N/A'}</span>
                    </div>
                    <div className="spec">
                      <span className="spec-label">Price:</span>
                      <span className="spec-value">
                        Ksh {item.price_at_order_time?.toLocaleString() || '0'}
                      </span>
                    </div>
                    <div className="spec">
                      <span className="spec-label">Qty:</span>
                      <span className="spec-value">{item.quantity || '0'}</span>
                    </div>
                    <div className="spec">
                      <span className="spec-label">Available:</span>
                      <span className="spec-value">
                        {item.is_available ? "Yes" : "No"}
                      </span>
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
