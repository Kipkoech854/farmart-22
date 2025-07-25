// context/LivestockContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { fetchLivestock } from '../services/livestockService';

const LivestockContext = createContext();

export const LivestockProvider = ({ children }) => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnimals = async () => {
      const data = await fetchLivestock();
      setAnimals(data || []);
      setLoading(false);
    };
    loadAnimals();
  }, []); // Only run once

  return (
    <LivestockContext.Provider value={{ animals, loading }}>
      {children}
    </LivestockContext.Provider>
  );
};

export const useLivestock = () => useContext(LivestockContext);
