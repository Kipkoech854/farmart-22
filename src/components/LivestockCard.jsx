import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Chip, Box } from '@mui/material';
import { ShoppingCart, FlashOn, LocationOn } from '@mui/icons-material';

const LivestockCard = ({ livestock, onViewDetails, onAddToCart, onBuyNow }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="160"
        image={livestock.image}
        alt={livestock.name}
        onClick={onViewDetails}
        sx={{ cursor: 'pointer' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {livestock.name}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
          <Chip label={livestock.type} size="small" color="primary" />
          <Chip label={livestock.breed} size="small" variant="outlined" />
          <Chip 
            icon={<LocationOn fontSize="small" />}
            label={livestock.county} 
            size="small" 
          />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {livestock.description.substring(0, 60)}...
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            KSh {livestock.price.toLocaleString()}
          </Typography>
          <Chip 
            label={`${livestock.age} yrs`} 
            size="small" 
            color="info"
          />
        </Box>
      </CardContent>
      <Box sx={{ p: 2, display: 'flex', gap: 1 }}>
        <Button 
          variant="contained" 
          startIcon={<ShoppingCart />}
          onClick={onAddToCart}
          size="small"
          fullWidth
        >
          Add to Cart
        </Button>
        <Button 
          variant="outlined" 
          startIcon={<FlashOn />}
          onClick={onBuyNow}
          size="small"
          fullWidth
        >
          Buy Now
        </Button>
      </Box>
    </Card>
  );
};

export default LivestockCard;