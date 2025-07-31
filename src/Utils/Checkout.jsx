import React, { useState, useEffect } from "react";
import { Dropdown } from "./Dropdown";
import { kenyaLocations } from "./Kenyanlocations";
import { Link } from "react-router-dom";
//import { PaymentFormsToogle } from "./PaymentFormsToogle";
import { useCart } from '../context/CartContext';
import Geocoding from "./Geocoding";
import { getUserIdFromToken } from "../utils/jwt";
import '../Stylesheets/Checkout.css'
import { OrderConstructor } from "./OrderConstructor";
import { SuccessPopup} from  './SucessPopUp'
import { useNavigate } from 'react-router-dom';


export const Checkout = () => {
  const { cart, setCart } = useCart();
  const userId = getUserIdFromToken()
  const [items, setItems] = useState(cart || []);
  const [totalPrice, setTotalPrice] = useState(0);

  const [paymentMethod, setPaymentMethod] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [active, setactive] = useState(false)
  const [shippingCost, setShippingCost] = useState(0);

  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const total = totalPrice + shippingCost;

  const navigate = useNavigate();


  const handlePlaceOrder = async () => {
  setLoading(true); // start loading

  const payload = OrderConstructor({
    cart: items,
    totalprice: totalPrice,
    pickupLocation,
    deliveryMethod,
    total,
    paymentMethod,
  });

  try {
    const response = await fetch('https://farmart-y80m.onrender.com/api/Order/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error('Order failed');

    const data = await response.json();
    setShowPopup(true);
    
  } catch (err) {
    console.error('Order error:', err);
    alert('Failed to place order.');
  } finally {
    setLoading(false); // stop loading
  }
};

  useEffect(() => {
    const total = items.reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(total);
  }, [items]);

useEffect(() => {
  if (showPopup) {
    const timer = setTimeout(() => {
      setShowPopup(false);
      localStorage.removeItem('cart');
      setCart([]);
      setItems([]);
      console.log('Order response:', data);
      navigate('/shop');
    }, 4000); // 4 seconds

    return () => clearTimeout(timer);
  }
}, [showPopup]);


  return (
   <div className="checkout-container">
    {showPopup && (
  <SuccessPopup showPopup={showPopup} onClose={() => setShowPopup(false)} message="Payment Successful!"/>
)}

    <div className="checkout" >
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
   

  </div>
  
  </div>
   <button className="checkout-btn" onClick={() => handlePlaceOrder(cart)} disabled={loading}>
     {loading ? 'Placing Order...' : 'Place Order'}
   </button>
 
</div>

  );
};
