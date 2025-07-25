import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Button, Chip, Divider } from '@mui/material';
import { LocationOn, Event, Pets, Close } from '@mui/icons-material';

const LivestockModal = ({ livestock, onClose, onAddToCart, onBuyNow }) => {
  if (!livestock) return null;

  return (
    <Box sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1300,
      p: 2
    }} onClick={onClose}>
      <Card sx={{ 
        maxWidth: 600, 
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto'
      }} onClick={(e) => e.stopPropagation()}>
        <CardMedia
          component="img"
          height="300"
          image={livestock.image}
          alt={livestock.name}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h4" component="div">
              {livestock.name}
            </Typography>
            <Button onClick={onClose} startIcon={<Close />} color="error" />
          </Box>

          <Box sx={{ display: 'flex', gap: 1, my: 2, flexWrap: 'wrap' }}>
            <Chip icon={<Pets />} label={livestock.type} color="primary" />
            <Chip label={livestock.breed} variant="outlined" />
            <Chip icon={<LocationOn />} label={livestock.county} />
            <Chip label={`${livestock.age} years`} />
          </Box>

          <Typography variant="h5" sx={{ color: 'green', fontWeight: 'bold', my: 2 }}>
            KSh {livestock.price.toLocaleString('en-KE')}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body1" paragraph>
            {livestock.description}
          </Typography>

          <Typography variant="h6" sx={{ mt: 2 }}>
            Health Status:
          </Typography>
          <Chip 
            label={livestock.is_available ? 'Available - Vaccinated' : 'Sold'} 
            color={livestock.is_available ? 'success' : 'error'} 
            sx={{ my: 1 }}
          />

          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button 
              variant="contained" 
              size="large" 
              fullWidth
              onClick={onAddToCart}
              sx={{ bgcolor: 'green', '&:hover': { bgcolor: 'darkgreen' } }}
            >
              Add to Cart
            </Button>
            <Button 
              variant="outlined" 
              size="large" 
              fullWidth
              onClick={onBuyNow}
              color="success"
            >
              Buy Now
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LivestockModal;