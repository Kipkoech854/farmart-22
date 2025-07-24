import { useCart } from '../context/CartContext';
import { buildCartItemFromAnimal } from '../Utils/CartUtils';
import LivestockCard from '../components/LivestockCard';
import LivestockModal from '../components/LivestockModal'; 
import { useState, useEffect } from 'react';
import { fetchLivestock } from '../services/livestockService';
import SearchSortFilter from '../components/SearchSortFilter';

export const LivestockPage = () => {
  const { addItem } = useCart();
  const [animals, setAnimals] = useState([]); // ✅ holds list of animals
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  useEffect(() => {
    const loadLivestock = async () => {
      const data = await fetchLivestock(); // Fetch from your service
      setAnimals(data);
    };
    loadLivestock();
  }, []);

  const handleAddToCart = (animal) => {
    if (!animal.is_available) {
      alert("Cannot add unavailable animal to cart");
      return;
    }

    const item = buildCartItemFromAnimal(animal);
    addItem(item);
  };

  return (
    <>
      {animals.map((animal) => (
        <LivestockCard
          key={animal.id}
          livestock={animal}
          onViewDetails={() => setSelectedAnimal(animal)}
          onAddToCart={() => handleAddToCart(animal)}
          onBuyNow={() => console.log("Buy now logic")}
        />
      ))}

      {selectedAnimal && (
        <LivestockModal
          livestock={selectedAnimal}
          onClose={() => setSelectedAnimal(null)}
          onAddToCart={() => handleAddToCart(selectedAnimal)} 
          onBuyNow={() => console.log("Buy now logic")}
        />
      )}
    </>
  );
};
