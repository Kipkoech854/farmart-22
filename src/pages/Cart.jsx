import React from 'react';
import { OrderCard } from '../components/OrderCard';
import { Checkout } from '../Utils/Checkout';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
//import { ConfirmedOrders } from '../Orders/ConfirmedOrders'; 
import { OverheadClassifiers } from '../Orders/OverheadClassifiers';

function Cart() {
  //const { cart } = useCart();
  const cart  = [{
  id: "52caf6ba-278a-4251-9c63-42cabff05a1c",
  name: "Whiskers",
  type: "Cat",
  breed: "Siamese",
  age: 2,
  price: 1500,
  quantity: 1,
  description: "A playful Siamese cat with blue eyes and a calm temperament. Perfect for companionship.",
  is_available: true,
  images: [
    {
      id: 0,
      url: "https://i.pinimg.com/736x/21/85/17/2185173d10087a78100346d89dc4ce13.jpg"
    },
    {
      id: 1,
      url: "https://i.pinimg.com/736x/5a/61/b6/5a61b62f027265c53a310b2832fa3f67.jpg"
    }
  ]
}];


  if (cart.length === 0) {
    return (
      <div className="w-50 h-50 d-flex flex-column justify-center items-center">
        <h2>Your cart is empty</h2>
        <p>Please add some items to your cart.</p>
      </div>
    );
  }

  return (
    <div>
       <OverheadClassifiers/>
    </div>
  );
}

export default Cart;
