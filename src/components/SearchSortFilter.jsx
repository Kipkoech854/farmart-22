import React, { useState } from 'react';
import { Box, TextField, InputAdornment, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import { Search, FilterList, Sort, LocationOn, Category, Pets } from '@mui/icons-material';

const SearchSortFilter = ({ counties, breeds, onSearchFilter, onSort }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countyFilter, setCountyFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [breedFilter, setBreedFilter] = useState('all');

  const animalTypes = ['all', 'Cattle', 'Goat', 'Sheep', 'Poultry'];

  const handleApplyFilters = () => {
    onSearchFilter(searchTerm, countyFilter, typeFilter, breedFilter);
  };

  return (
    <Box sx={{ mb: 4, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
      <TextField
        label="Search livestock"
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        sx={{ minWidth: 200 }}
      />

      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel>County</InputLabel>
        <Select
          value={countyFilter}
          label="County"
          onChange={(e) => setCountyFilter(e.target.value)}
          startAdornment={<LocationOn />}
        >
          <MenuItem value="all">All Counties</MenuItem>
          {counties.map(county => (
            <MenuItem key={county} value={county}>{county}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Type</InputLabel>
        <Select
          value={typeFilter}
          label="Type"
          onChange={(e) => {
            setTypeFilter(e.target.value);
            setBreedFilter('all');
          }}
          startAdornment={<Category />}
        >
          {animalTypes.map(type => (
            <MenuItem key={type} value={type}>
              {type === 'all' ? 'All Types' : type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel>Breed</InputLabel>
        <Select
          value={breedFilter}
          label="Breed"
          onChange={(e) => setBreedFilter(e.target.value)}
          disabled={typeFilter === 'all'}
          startAdornment={<Pets />}
        >
          <MenuItem value="all">All Breeds</MenuItem>
          {typeFilter !== 'all' && breeds[typeFilter].map(breed => (
            <MenuItem key={breed} value={breed}>{breed}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button 
        variant="contained" 
        onClick={handleApplyFilters}
        startIcon={<FilterList />}
        sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: 'darkgreen' } }}
      >
        Apply Filters
      </Button>

      <FormControl size="small" sx={{ minWidth: 120, ml: 'auto' }}>
        <InputLabel>Sort By</InputLabel>
        <Select
          defaultValue="all"
          label="Sort By"
          onChange={(e) => onSort(e.target.value)}
          startAdornment={<Sort />}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="price">Price (Low-High)</MenuItem>
          <MenuItem value="name">Name (A-Z)</MenuItem>
          <MenuItem value="age">Age (Youngest)</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SearchSortFilter;