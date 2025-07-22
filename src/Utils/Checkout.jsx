import React, { useState, useEffect } from "react";
import { Dropdown } from "./Dropdown";
import { kenyaLocations } from "./Kenyanlocations";
import { Link } from "react-router-dom";
import { PaymentFormsToogle } from "./PaymentFormsToogle";

export const Checkout = ({ cart }) => {
  const [items, setItems] = useState(cart || []);
  const [totalPrice, setTotalPrice] = useState(0);

  const [paymentMethod, setPaymentMethod] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [active, setactive] = useState(false)
  
   


  useEffect(() => {
    const total = items.reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(total);
  }, [items]);

  return (
    <div className="checkout-container">
      <nav>
        <Link to = '/cart'>←</Link>
      </nav>
      <div className="checkout-header">
        <h2>Checkout</h2>
        <p>Total price: Ksh {totalPrice}</p>
      </div>

      <div className="dropdown-section">
        <Dropdown
          label="Select Payment Method"
          options={["MPESA", "Credit Card", "PayPal", "Cash", "Pay on delivery"]}
          onSelect={(option) => setPaymentMethod(option)}
          
        />
        <p>Selected: {paymentMethod}</p>
        <PaymentFormsToogle paymentMethod={paymentMethod}/> 
      </div>

      <div className="dropdown-section">
        <Dropdown
          label="Select Delivery Method"
          options={["Standard Shipping", "Express Shipping"]}
          onSelect={(option) => setDeliveryMethod(option)}
        />
        <p>Selected: {deliveryMethod}</p>
      </div>

      <div className="dropdown-section">
        <Dropdown
          label="Select Pickup Location"
          options={kenyaLocations.map(loc => loc.name)}
          onSelect={(selectedName) => {
            const locationObj = kenyaLocations.find(loc => loc.name === selectedName);
            setPickupLocation(locationObj);
          }}
        />
        <p>
          Selected: {pickupLocation?.name || "None"}
        </p>
      </div>
    </div>
  );
};
