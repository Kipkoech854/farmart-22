import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe('pk_test_51Rlk7NDCnoAPwG0zvuXuFpjmFnFCbmzajYkpXef93aEcB2CMDmND5t7fgUPnX8f9rVpF0BGZ8BY2jo6W0527SKdk00J4nnqHrX');

const StripeContainer = ({ items, pickupLocation, shippingCost, deliveryMethod, total, userId }) => {

  return (
    <Elements stripe={stripePromise}>
    
  <PaymentForm 
  items={items}
  pickupLocation={pickupLocation}
  shippingCost={shippingCost}
  deliveryMethod={deliveryMethod}
  total={total}
  userId={userId}
/>



    </Elements>
  );
};

export default StripeContainer;
