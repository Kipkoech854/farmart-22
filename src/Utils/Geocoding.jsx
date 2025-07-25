import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';

const API_KEY = '97059c53e7384e4fa22bccc7c8669101';

const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const Geocoding = ({ option, deliveryMethod, onShippingCostChange }) => {
  const { cart } = useCart();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!option || typeof option !== 'object' || !option.lat || !option.lng) return;

      const { lat: destLat, lng: destLng } = option;
      const items = (cart || []).map(item => ({
        name: item.name,
        location: item.location || item.county
      }));

      const rate = deliveryMethod === "Express Shipping" ? 10 : 7;

      const newResults = [];
      const cache = {};

      for (let item of items) {
        const locationKey = item.location?.toLowerCase();
        if (!locationKey) continue;

        if (!cache[locationKey]) {
          try {
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(item.location)}&key=${API_KEY}`
            );
            const data = await response.json();
            const geo = data?.results?.[0]?.geometry;
            if (geo) cache[locationKey] = geo;
            else continue;
          } catch (err) {
            console.error('Geocoding error:', err);
            continue;
          }
        }

        const geo = cache[locationKey];
        const distance = haversineDistance(geo.lat, geo.lng, destLat, destLng);
        const price = Math.round(distance * rate);

        newResults.push({ name: item.name, location: item.location, price });
      }

      setResults(newResults);
    };

    fetchData();
  }, [cart, option, deliveryMethod]);

  const total = results.reduce((sum, item) => sum + item.price, 0);

  // Send total to parent
  useEffect(() => {
    onShippingCostChange(total);
  }, [total, onShippingCostChange]);

  return (
    <div>
      {option?.name && (
        <p>Shipping to <strong>{option.name}</strong> ({deliveryMethod || "No method selected"})</p>
      )}
      {results.length === 0 ? (
        <p>Loading shipping estimates...</p>
      ) : (
        <>
          <p><strong>Total: KES {total}</strong></p>
          <ul>
            {results.map((item, idx) => (
              <li key={idx}>
                {item.name} ({item.location}) → <strong>KES {item.price}</strong>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Geocoding;
