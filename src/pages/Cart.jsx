import React from 'react';
import { OrderCard } from '../components/OrderCard';
import { Checkout } from '../Utils/Checkout';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
//import { ConfirmedOrders } from '../Orders/ConfirmedOrders'; 
//import { OverheadClassifiers } from '../Orders/OverheadClassifiers';


function Cart() {
  const { cart } = useCart();
  

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
       <OrderCard animals={cart}/>
       <Checkout cart={cart}/>
    </div>
  );
}

export default Cart;
