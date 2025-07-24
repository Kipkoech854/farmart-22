import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import '../Stylesheets/PaymentForm.css'

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.error(error.message);
    } else {
      console.log('PaymentMethod:', paymentMethod);
      // Send paymentMethod.id to your backend
    }
  };

  // Custom styling for Stripe CardElement
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
        
        <button 
          type="submit" 
          disabled={!stripe}
          className="pay-button"
        >
          Pay Now
        </button>
        
        <div className="payment-security">
          <span className="lock-icon">🔒</span>
          <span>All transactions are securely encrypted</span>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;