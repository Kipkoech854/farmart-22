import React, { useState } from 'react';
import { useLivestock } from '../context/LiveStockContext';
import { useCart } from '../context/CartContext';
import { buildCartItemFromAnimal } from '../Utils/CartUtils';
import LivestockCard from '../components/LivestockCard';
import LivestockModal from '../components/LivestockModal';
import { Grid, Box, Typography } from '@mui/material';

export const LivestockPage = () => {
  const { animals, loading } = useLivestock();
  const { addItem } = useCart();
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  const handleAddToCart = (animal) => {
    if (!animal.is_available) {
      alert("Cannot add unavailable animal to cart");
      return;
    }
    const item = buildCartItemFromAnimal(animal);
    addItem(item);
  };

  if (loading) return <Typography>Loading livestock...</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3} justifyContent="center">
        {animals.map((animal) => (
          <Grid item key={animal.id} xs={12} sm={6} md={4} lg={3}>
            <LivestockCard
              livestock={animal}
              onViewDetails={() => setSelectedAnimal(animal)}
              onAddToCart={() => handleAddToCart(animal)}
              onBuyNow={() => console.log("Buy now logic")}
            />
          </Grid>
        ))}
      </Grid>

      {selectedAnimal && (
        <LivestockModal
          livestock={selectedAnimal}
          onClose={() => setSelectedAnimal(null)}
          onAddToCart={() => handleAddToCart(selectedAnimal)}
          onBuyNow={() => console.log("Buy now logic")}
        />
      )}
    </Box>
  );
};
