import React, { useState } from 'react';
import { useCart } from '../context/CartContext'; // adjust the import to match your project

export const AddToCart = ({ animal }) => {
  const { addItem } = useCart(); // use addItem directly, not cart.addItem
  const [newAnimal, setNewAnimal] = useState(null);

  const handleAddToCart = () => {
    const itemToAdd = {
      id: animal.id,
      name: animal.name,
      price: animal.price,
      quantity: 1, 
      description: animal.description,
      type: animal.type,
      breed: animal.breed,
      age: animal.age,
      images: animal.images.map((img, index) => ({
        id: index,
        url: img
      }))
    };

    setNewAnimal(itemToAdd); 
    addItem(itemToAdd);      
  };

  return (
   <button onClick={() => {
       if (is_available) {
          handleAddToCart();
       } else {
       alert('Cannot add an unavailable animal to cart');
      }
      }}
     >
  🛒 Add to cart
</button>

  );
};
