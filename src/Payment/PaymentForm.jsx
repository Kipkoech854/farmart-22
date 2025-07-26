import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import '../Stylesheets/PaymentForm.css';

const PaymentForm = ({ items, pickupLocation, shippingCost, deliveryMethod, total, userId }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [paymentStatus, setPaymentStatus] = useState(null); // null | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false); // NEW loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);
    setPaymentStatus(null);
    setErrorMsg('');

    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.error(error.message);
      setErrorMsg(error.message);
      setPaymentStatus('error');
      setIsLoading(false);
    } else {
      console.log('PaymentMethod:', paymentMethod);

      const response = await fetch('http://127.0.0.1:5555/api/Payment/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          payment_method_id: paymentMethod.id,
          amount: total * 100,
          items,
          user_id: userId,
          delivery_method: deliveryMethod,
          pickup_location: pickupLocation?.name,
          shipping_cost: shippingCost,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        console.error('Payment failed:', data.error);
        setErrorMsg(data.error || 'Payment failed');
        setPaymentStatus('error');
      } else {
        console.log('Payment successful:', data);
        setPaymentStatus('success');
      }

      setIsLoading(false);
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
