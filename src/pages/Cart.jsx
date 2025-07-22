import React from 'react';
import { OrderCard } from '../components/OrderCard';
import { Checkout } from '../Utils/Checkout';
import { useCart } from '../context/CartContext'; 

function Cart() {
  const { cart } = useCart(); 

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Please add some items to your cart.</p>
      </div>
    );
  }

  return (
    <div>
      <OrderCard animals={cart} />
      <Checkout cart={cart} />
    </div>
  );
}

export default Cart;
