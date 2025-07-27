import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import '../Stylesheets/PaymentForm.css';

const PaymentForm = ({order}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [paymentStatus, setPaymentStatus] = useState(null); // null | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const[Paid, setPaid] = useState(false)// NEW loading state

  const handleSubmit = async (event) => {
  event.preventDefault();
  if (!stripe || !elements) return;

  const cardElement = elements.getElement(CardElement);

  try {
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
      setPaymentError(error.message);
      return;
    }
    const shippingCost = parseFloat(order?.total || 0) - (order?.amount || 0);
    const pickupLocation=order.pickup_station
    const deliveryMethod=order.delivery_method?order.delivery_method:'Standard shipping'

    const rawItems = order?.animals?.flatMap(animal => animal.items) || [];

    const formattedItems = rawItems.map(item => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity || 1,
      id: item.animal_id,
    }));
    const token = localStorage.getItem('token');

    const response = await fetch('http://127.0.0.1:5555/api/Payment/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        items: formattedItems,
        shipping_cost: shippingCost,
        pickup_location: pickupLocation,
        shipping_method: deliveryMethod || '',
      }),
    });

    const data = await response.json();

    if (response.ok && data.url) {
      window.location.href = data.url;
      setPaid(true)
    } else {
      setPaymentError(data.error || 'Payment failed');
    }
  } catch (err) {
    console.error(err);
    setPaymentError('An error occurred during payment.');
  }
};



  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#2c5f2d',
        fontFamily: 'Quicksand, sans-serif',
        '::placeholder': {
          color: '#90a899',
        },
      },
      invalid: {
        color: '#e5424d',
        ':focus': {
          color: '#303238',
        },
      },
    },
  };

  return (
    <div className="payment-container">
      <form onSubmit={handleSubmit} className="payment-form">
        <h2 className="payment-heading">Secure Payment</h2>
        <p className="payment-subheading">Enter your card details</p>

        <div className="card-element-wrapper">
          <CardElement options={cardElementOptions} />
        </div>

        <button type="submit" disabled={!stripe || isLoading} className="pay-button">
          {isLoading ? 'Processing...' : 'Pay Now'}
        </button>

        <div className="payment-security">
          <span className="lock-icon">🔒</span>
          <span>All transactions are securely encrypted</span>
        </div>

        {paymentStatus === 'success' && (
          <div className="payment-success">
            <span style={{ fontSize: '2rem', color: 'green' }}>✅</span>
            <p>Payment was successful!</p>
          </div>
        )}

        {paymentStatus === 'error' && (
          <div className="payment-error">
            <span style={{ fontSize: '2rem', color: 'red' }}>❌</span>
            <p>{errorMsg}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default PaymentForm;
