import React from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  Grid
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 800,
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  maxHeight: '90vh',
  overflowY: 'auto'
};

const LivestockModal = ({ livestock, onClose, onAddToCart, onBuyNow }) => {
  if (!livestock) return null;

  const { name, breed, age, type, description, price, is_available, images = [] } = livestock;

  return (
    <Modal open={true} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h5" gutterBottom>{name}</Typography>
        <Typography variant="subtitle1" color="text.secondary">{breed} · {type}</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>{description}</Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>Age: {age} years</Typography>
        <Typography variant="h6" color="primary">Price: Ksh {price}</Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          {Array.isArray(images) && images.map((imgObj, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Box
                component="img"
                src={imgObj.url}
                alt={`${name} - ${idx}`}
                sx={{
                  width: '100%',
                  height: 200,
                  objectFit: 'cover',
                  borderRadius: 2,
                  boxShadow: 1
                }}
                onError={(e) => e.target.style.display = 'none'}
              />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <Button
            variant="contained"
            disabled={!is_available}
            onClick={onAddToCart}
            sx={{
              backgroundColor: 'green',
              '&:hover': {
                backgroundColor: 'darkgreen'
              }
            }}
          >
            Add to Cart
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            disabled={!is_available}
            onClick={onBuyNow}
          >
            Buy Now
          </Button>
          <Button variant="text" onClick={onClose}>Close</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default LivestockModal;
