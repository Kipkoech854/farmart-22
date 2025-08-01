import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, Container, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { fetchLivestock } from '../services/livestockService';
import LivestockCard from '../components/LivestockCard';
import LivestockModal from '../components/LivestockModal';
import SearchSortFilter from '../components/SearchSortFilter';
import Recommendations from '../components/Recommendations';
import { useCart } from '../context/CartContext';


const Livestock = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLivestock, setSelectedLivestock] = useState(null);
  const [sortBy, setSortBy] = useState('price-asc');
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const { addItem } = useCart();

  useEffect(() => {
    const loadLivestock = async () => {
      try {
        const data = await fetchLivestock();
        setAnimals(data);
        setFilteredAnimals(data);
      } catch (error) {
        console.error('Error loading livestock:', error);
      } finally {
        setLoading(false);
      }
    };
    loadLivestock();
  }, []);

  // Search/filter handler
  const handleSearchFilter = (searchTerm, countyFilter, typeFilter, breedFilter) => {
    let filtered = [...animals];
    if (searchTerm) {
      filtered = filtered.filter(a => a.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (countyFilter && countyFilter !== 'all') {
      filtered = filtered.filter(a => a.county === countyFilter);
    }
    if (typeFilter && typeFilter !== 'all') {
      filtered = filtered.filter(a => a.type === typeFilter);
    }
    if (breedFilter && breedFilter !== 'all') {
      filtered = filtered.filter(a => a.breed === breedFilter);
    }
    setFilteredAnimals(filtered);
  };

  // Sorting
  const getSortedAnimals = () => {
    const sorted = [...filteredAnimals];
    switch (sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'county-asc':
        sorted.sort((a, b) => a.county.localeCompare(b.county));
        break;
      case 'county-desc':
        sorted.sort((a, b) => b.county.localeCompare(a.county));
        break;
      default:
        break;
    }
    return sorted;
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  // Add to cart using context
  const handleAddToCart = (livestockId) => {
    const animal = animals.find(a => a.id === livestockId);
    if (animal) {
      addItem(animal);
    }
  };

  const handleBuyNow = (livestockId) => {
    // You can implement buy now logic here
    console.log('Buy now:', livestockId);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'primary.main' }}>
        Kenyan Livestock Marketplace
      </Typography>

      
      <SearchSortFilter 
        onSearchFilter={handleSearchFilter}
        onSort={handleSortChange}
      />
      <Box sx={{ my: 2, display: 'flex', alignItems: 'center' }}>
        <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
          <InputLabel id="sort-label">Sort by</InputLabel>
          <Select
            labelId="sort-label"
            id="sort-select"
            value={sortBy}
            onChange={handleSortChange}
            label="Sort by"
            sx={{ background: '#fff' }}
          >
            <MenuItem value="price-asc">Price (Low to High)</MenuItem>
            <MenuItem value="price-desc">Price (High to Low)</MenuItem>
            <MenuItem value="name-asc">Name (A-Z)</MenuItem>
            <MenuItem value="name-desc">Name (Z-A)</MenuItem>
            <MenuItem value="county-asc">County (A-Z)</MenuItem>
            <MenuItem value="county-desc">County (Z-A)</MenuItem>
          </Select>
        </FormControl>
        <Typography sx={{ ml: 2, fontWeight: 500, color: 'primary.main' }}>
          {(() => {
            switch (sortBy) {
              case 'price-asc': return 'Sorted by Price (Low to High)';
              case 'price-desc': return 'Sorted by Price (High to Low)';
              case 'name-asc': return 'Sorted by Name (A-Z)';
              case 'name-desc': return 'Sorted by Name (Z-A)';
              case 'county-asc': return 'Sorted by County (A-Z)';
              case 'county-desc': return 'Sorted by County (Z-A)';
              default: return '';
            }
          })()}
        </Typography>
      </Box>

      {loading ? (
        <Typography>Loading livestock...</Typography>
      ) : getSortedAnimals().length === 0 ? (
        <Typography>No livestock found matching your criteria.</Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {getSortedAnimals().map(animal => (
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