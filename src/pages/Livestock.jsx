import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Box, Typography, Container } from '@mui/material';
import { setLivestock, filterLivestock, sortLivestock } from '../redux/slices/livestockSlice';
import { fetchLivestock } from '../services/livestockService';
import LivestockCard from '../components/LivestockCard';
import LivestockModal from '../components/LivestockModal';
import SearchSortFilter from '../components/SearchSortFilter';
import Recommendations from '../components/Recommendations';

const Livestock = () => {
  const dispatch = useDispatch();
  const { filteredLivestock, loading } = useSelector(state => state.livestock);
  const [selectedLivestock, setSelectedLivestock] = useState(null);

  useEffect(() => {
    const loadLivestock = async () => {
      try {
        const data = await fetchLivestock();
        dispatch(setLivestock(data));
      } catch (error) {
        console.error('Error loading livestock:', error);
      }
    };
    loadLivestock();
  }, [dispatch]);

  const handleSearchFilter = (searchTerm, countyFilter, typeFilter, breedFilter) => {
    dispatch(filterLivestock({ searchTerm, countyFilter, typeFilter, breedFilter }));
  };

  const handleSort = (sortBy) => {
    dispatch(sortLivestock({ sortBy }));
  };

  const handleAddToCart = (livestockId) => {
    console.log('Added to cart:', livestockId);
    // Implement cart logic
  };

  const handleBuyNow = (livestockId) => {
    console.log('Buy now:', livestockId);
    // Implement checkout logic
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'primary.main' }}>
        Kenyan Livestock Marketplace
      </Typography>

      <SearchSortFilter 
        onSearchFilter={handleSearchFilter} 
        onSort={handleSort} 
      />

      {loading ? (
        <Typography>Loading livestock...</Typography>
      ) : filteredLivestock.length === 0 ? (
        <Typography>No livestock found matching your criteria.</Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {filteredLivestock.map(animal => (
              <Grid item xs={12} sm={6} md={4} key={animal.id}>
                <LivestockCard
                  livestock={animal}
                  onViewDetails={() => setSelectedLivestock(animal)}
                  onAddToCart={() => handleAddToCart(animal.id)}
                  onBuyNow={() => handleBuyNow(animal.id)}
                />
              </Grid>
            ))}
          </Grid>

          <LivestockModal
            livestock={selectedLivestock}
            onClose={() => setSelectedLivestock(null)}
            onAddToCart={() => {
              handleAddToCart(selectedLivestock?.id);
              setSelectedLivestock(null);
            }}
            onBuyNow={() => {
              handleBuyNow(selectedLivestock?.id);
              setSelectedLivestock(null);
            }}
          />

          <Recommendations />
        </>
      )}
    </Container>
  );
};

export default Livestock;