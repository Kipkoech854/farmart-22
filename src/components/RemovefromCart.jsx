import React from 'react';
import { useCart } from '../context/CartContext';

 export const RemovefromCart = ({ item }) => {
  const { removeItem } = useCart();
  
  return (
    <div className="cart-item" >
      <button onClick={() => removeItem(item.id)}>Remove</button>
    </div>
  );
};


