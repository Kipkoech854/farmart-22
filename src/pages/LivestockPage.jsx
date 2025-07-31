import React, { useState, useEffect } from 'react';
import { useLivestock } from '../context/LiveStockContext';
import { useCart } from '../context/CartContext';
import { buildCartItemFromAnimal } from '../Utils/CartUtils';
import LivestockCard from '../components/LivestockCard';
import LivestockModal from '../components/LivestockModal';
import { Grid, Box, Typography, Paper, CircularProgress } from '@mui/material';
import AnimalSearch from '../components/AnimalSearch';
import Livestock from './Livestock';
import {useAuth}  from '../context/AuthContext'
import {useNavigate} from 'react-router-dom'

export const LivestockPage = () => {
  const { animals, loading, error } = useLivestock(); // Make sure your context provides error state
  const { addItem } = useCart();
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const {isLoggedIn} = useAuth()
  const navigate = useNavigate

  // Initialize filteredAnimals when animals load
  useEffect(() => {
    if (animals && animals.length) {
      setFilteredAnimals(animals);
    }
  }, [animals]);

  const handleAddToCart = (animal) => {
    if (!animal?.is_available) {
      alert("Cannot add unavailable animal to cart");
      return;
    }else if(!isLoggedIn){
      navigate('/signin')
      alert('Please sign up to add to cart')
    }
    const item = buildCartItemFromAnimal(animal);
    addItem(item);
  };

  const handleSearchResults = (results) => {
    setFilteredAnimals(results || animals || []);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ p: 2 }}>
        Error loading livestock: {error.message}
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <AnimalSearch 
          onAnimalSelect={setSelectedAnimal}
          onSearchResults={handleSearchResults}
        />
      </Paper>

      {filteredAnimals.length === 0 ? (
        <Typography sx={{ textAlign: 'center', mt: 4 }}>
          No animals found matching your search
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {filteredAnimals.map((animal) => (
            <Grid item key={animal.id} xs={12} sm={6} md={4} lg={3}>
              <LivestockCard
                livestock={animal}
                onViewDetails={() => setSelectedAnimal(animal)}
                onAddToCart={() => handleAddToCart(animal)}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {selectedAnimal && (
        <LivestockModal
          livestock={selectedAnimal}
          onClose={() => setSelectedAnimal(null)}
          onAddToCart={() => handleAddToCart(selectedAnimal)}
        />
      )}
    </Box>
  );
};