import React, { useState, useEffect } from 'react';
import { useLivestock } from '../context/LiveStockContext';
import { useCart } from '../context/CartContext';
import { buildCartItemFromAnimal } from '../Utils/CartUtils';
import LivestockCard from '../components/LivestockCard';
import LivestockModal from '../components/LivestockModal';
import { Grid, Box, Typography, Paper, CircularProgress, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import AnimalSearch from '../components/AnimalSearch';
import Livestock from './Livestock';
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export const LivestockPage = () => {
  const { animals, loading, error } = useLivestock(); // Make sure your context provides error state
  const { addItem } = useCart();
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [filteredAnimals, setFilteredAnimals] = useState([]);

  const { isLoggedIn } = useAuth()
  const navigate = useNavigate

  const [sortOption, setSortOption] = useState('price-asc'); // Default: Price low to high



  // Sort animals based on sortOption
  useEffect(() => {
    if (animals && animals.length) {
      let sorted = [...animals];
      switch (sortOption) {
        case 'price-asc':
          sorted.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          sorted.sort((a, b) => b.price - a.price);
          break;
        case 'name':
          sorted.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'county':
          sorted.sort((a, b) => a.county.localeCompare(b.county));
          break;
        default:
          break;
      }
      setFilteredAnimals(sorted);
    }
  }, [animals, sortOption]);

  const handleAddToCart = (animal) => {
    if (!animal?.is_available) {
      alert("Cannot add unavailable animal to cart");
      return;
    }

    if (!isLoggedIn) {
      alert("Please sign in to add to cart");
      navigate("/signin");
      return;
    }

    const item = buildCartItemFromAnimal(animal);
    addItem(item);
  };



  const handleSearchResults = (results) => {
    let toSort = results || animals || [];
    let sorted = [...toSort];
    switch (sortOption) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'county':
        sorted.sort((a, b) => a.county.localeCompare(b.county));
        break;
      default:
        break;
    }
    setFilteredAnimals(sorted);
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
      {/* Sort and Search Bar Row */}
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>



        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          {/* Sorting Controls */}
          <FormControl variant="outlined" size="small" sx={{ minWidth: 180, fontWeight: 'bold', bgcolor: '#f5f5f5' }}>
            <InputLabel id="sort-label">Sort By</InputLabel>
            <Select
              labelId="sort-label"
              value={sortOption}
              onChange={e => setSortOption(e.target.value)}
              label="Sort By"
            >
              <MenuItem value="price-asc">Price (Low to High)</MenuItem>
              <MenuItem value="price-desc">Price (High to Low)</MenuItem>
              <MenuItem value="name">Name (A-Z)</MenuItem>
              <MenuItem value="county">County (A-Z)</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="body2" sx={{ color: 'text.secondary', minWidth: 120 }}>
            Active: <b>{
              sortOption === 'price-asc' ? 'Price (Low to High)' :
                sortOption === 'price-desc' ? 'Price (High to Low)' :
                  sortOption === 'name' ? 'Name (A-Z)' :
                    sortOption === 'county' ? 'County (A-Z)' : ''
            }</b>
          </Typography>
          {/* Search Bar */}
          <Box sx={{ flex: 1, minWidth: 220 }}>
            <AnimalSearch
              onAnimalSelect={setSelectedAnimal}
              onSearchResults={handleSearchResults}
            />
          </Box>
        </Box>

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