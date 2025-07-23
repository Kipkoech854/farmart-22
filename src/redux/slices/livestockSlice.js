import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  livestock: [],
  filteredLivestock: [],
  loading: false,
  error: null,
  counties: [
    'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 
    'Meru', 'Kiambu', 'Kakamega', 'Kisii', 'Machakos'
  ],
  breeds: {
    'Cattle': ['Boran', 'Sahiwal', 'Zebu', 'Friesian'],
    'Goat': ['Galla', 'Small East African', 'Boer'],
    'Sheep': ['Red Maasai', 'Dorper', 'Blackhead Persian'],
    'Poultry': ['Kienyeji', 'Kuroiler', 'Rainbow Rooster']
  }
};

const livestockSlice = createSlice({
  name: 'livestock',
  initialState,
  reducers: {
    setLivestock: (state, action) => {
      state.livestock = action.payload;
      state.filteredLivestock = action.payload;
    },
    filterLivestock: (state, action) => {
      const { searchTerm, countyFilter, typeFilter, breedFilter } = action.payload;
      state.filteredLivestock = state.livestock.filter(animal => {
        const matchesSearch = animal.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            animal.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCounty = countyFilter === 'all' || animal.county === countyFilter;
        const matchesType = typeFilter === 'all' || animal.type === typeFilter;
        const matchesBreed = breedFilter === 'all' || animal.breed === breedFilter;
        return matchesSearch && matchesCounty && matchesType && matchesBreed;
      });
    },
    sortLivestock: (state, action) => {
      const { sortBy } = action.payload;
      state.filteredLivestock = [...state.filteredLivestock].sort((a, b) => {
        if (sortBy === 'price') return a.price - b.price;
        if (sortBy === 'age') return a.age - b.age;
        return a.name.localeCompare(b.name);
      });
    }
  }
});

export const { setLivestock, filterLivestock, sortLivestock } = livestockSlice.actions;
export default livestockSlice.reducer;