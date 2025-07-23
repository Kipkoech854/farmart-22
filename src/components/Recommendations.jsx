import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';
import { ChevronRight, ChevronLeft } from '@mui/icons-material';

const kenyanRecommendations = [
  {
    id: 1,
    name: 'Animal Feed (50kg)',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1607623488994-4f70e5d6b0f6',
    seller: 'Nakuru Feeds Ltd'
  },
  {
    id: 2,
    name: 'Vaccination Kit',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1581093450021-4a7360e9a7d2',
    seller: 'VetCare Kenya'
  },
  {
    id: 3,
    name: 'Water Trough',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee',
    seller: 'FarmEquip Nairobi'
  }
];

const Recommendations = () => {
  return (
    <Box sx={{ mt: 6 }}>
      <Typography variant="h5" gutterBottom sx={{ 
        color: 'primary.main',
        display: 'flex',
        alignItems: 'center'
      }}>
        Kenyan Farmers Also Buy
      </Typography>
      <Box sx={{
        display: 'flex',
        gap: 3,
        overflowX: 'auto',
        py: 2,
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' }
      }}>
        {kenyanRecommendations.map(item => (
          <Card key={item.id} sx={{ minWidth: 250 }}>
            <CardMedia
              component="img"
              height="140"
              image={item.image}
              alt={item.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h6">
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.seller}
              </Typography>
              <Typography variant="h6" sx={{ mt: 1, color: 'green', fontWeight: 'bold' }}>
                KSh {item.price.toLocaleString('en-KE')}
              </Typography>
              <Button size="small" sx={{ mt: 1 }} fullWidth variant="outlined">
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Recommendations;