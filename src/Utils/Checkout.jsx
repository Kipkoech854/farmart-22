import React, { useState, useEffect } from "react";
import { Dropdown } from "./Dropdown";
import { kenyaLocations } from "./Kenyanlocations";
import { Link } from "react-router-dom";
import { PaymentFormsToogle } from "./PaymentFormsToogle";
import { useCart } from '../context/CartContext';
import Geocoding from "./Geocoding";
import { getUserIdFromToken } from "../utils/jwt";

export const Checkout = () => {
  const { cart } = useCart()
  const userId = getUserIdFromToken()
  const [items, setItems] = useState(cart || []);
  const [totalPrice, setTotalPrice] = useState(0);

  const [paymentMethod, setPaymentMethod] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [active, setactive] = useState(false)
  const [shippingCost, setShippingCost] = useState(0);
  
   


  useEffect(() => {
    const total = items.reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(total);
  }, [items]);

  return (
   <div className="checkout-container">
  <nav>
    <Link to="/cart">←</Link>
  </nav>

  <div className="checkout-header">
    <h2>Checkout</h2>
   <p>Total price: Ksh {totalPrice + shippingCost}</p>
  </div>
  {/*delivery method*/}
  <div className="dropdown-section">
    <Dropdown
      label="Select Delivery Method"
      options={["Standard Shipping", "Express Shipping"]}
      onSelect={(option) => setDeliveryMethod(option)}
    />
    <p>Selected: {deliveryMethod}</p>
  </div>

  {/*pickup location*/}
  <div className="dropdown-section">
    <Dropdown
      label="Select Pickup Location"
      options={kenyaLocations.map(loc => loc.name)}
      onSelect={(selectedName) => {
        const locationObj = kenyaLocations.find(loc => loc.name === selectedName);
        setPickupLocation(locationObj);
      }}
    />
    <p>Selected: {pickupLocation?.name || "None"}</p>
    <Geocoding
  option={pickupLocation}
  deliveryMethod={deliveryMethod}
  onShippingCostChange={setShippingCost}
/>
  </div>


 

  {/* 3. Payment Method Last */}
  <div className="dropdown-section">
    <Dropdown
      label="Select Payment Method"
      options={["MPESA", "Credit Card", "PayPal", "Cash", "Pay on delivery"]}
      onSelect={(option) => setPaymentMethod(option)}
    />
    <p>Selected: {paymentMethod}</p>
    <PaymentFormsToogle 
        paymentMethod={paymentMethod} 
        cart={cart} 
        pickupLocation={pickupLocation} 
        shippingCost={shippingCost} 
        deliveryMethod={deliveryMethod} 
        totalPrice={totalPrice}
        userid={userId}
    />

  </div>

  {/*is_active && <button onclick={() =>handlePlaceOrder(cart)}>Place Order</button>*/}
</div>

  );
};
