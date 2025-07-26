import React from 'react';
import Slider from 'react-slick';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Box,
  CardMedia
} from '@mui/material';

const LivestockCard = ({ livestock, onViewDetails, onAddToCart, onBuyNow }) => {
  const images = livestock?.images?.map(img => img.url) || [livestock.image || '/fallback.jpg'];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 300,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: 320,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRadius: 2,
        boxShadow: 2,
        margin: 'auto'
      }}
    >
      <Box sx={{ height: 180, position: 'relative' }}>
        {images.length > 1 ? (
          <Slider {...sliderSettings}>
            {images.map((url, idx) => (
              <CardMedia
                key={idx}
                component="img"
                image={url}
                alt={livestock.name}
                onClick={onViewDetails}
                sx={{
                  cursor: 'pointer',
                  objectFit: 'cover',
                  width: '100%',
                  height: 180
                }}
              />
            ))}
          </Slider>
        ) : (
          <CardMedia
            component="img"
            image={images[0]}
            alt={livestock.name}
            onClick={onViewDetails}
            sx={{
              cursor: 'pointer',
              objectFit: 'cover',
              width: '100%',
              height: 180
            }}
          />
        )}
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          {livestock.name}
        </Typography>

        <Box sx={{ display: 'flex', gap: 0.5, mb: 1, flexWrap: 'wrap' }}>
          <Chip label={livestock.type} size="small" />
          <Chip label={livestock.breed} size="small" variant="outlined" />
          <Chip
            icon={<span style={{ fontSize: '1rem' }}>📍</span>}
            label={livestock.location || livestock.county}
            size="small"
          />
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {livestock.description?.substring(0, 60)}...
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body1" fontWeight="bold">
            KSh {livestock.price?.toLocaleString()}
          </Typography>
          <Chip label={`${livestock.age} yrs`} size="small" color="info" />
        </Box>
      </CardContent>

      <Box sx={{ p: 1.5, display: 'flex', gap: 1 }}>
        <Button
          variant="contained"
          startIcon={<span style={{ fontSize: '1rem' }}>🛒</span>}
          onClick={onAddToCart}
          size="small"
          fullWidth
          sx={{
            backgroundColor: 'green',
            color: 'white',
            '&:hover': {
              backgroundColor: '#006400'
            }
          }}
        >
          Add
        </Button>
        <Button
          variant="outlined"
          startIcon={<span style={{ fontSize: '1rem' }}>⚡</span>}
          onClick={onBuyNow}
          size="small"
          fullWidth
          sx={{
            borderColor: 'green',
            color: 'green',
            '&:hover': {
              borderColor: '#006400',
              backgroundColor: 'rgba(0,128,0,0.04)'
            }
          }}
        >
          Buy
        </Button>
      </Box>
    </Card>
  );
};

export default LivestockCard;

