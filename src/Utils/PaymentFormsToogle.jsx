import { useState } from 'react';
import StripeContainer from '../Payment/StripeContainer';
import '../Stylesheets/PaymentFormsToogle.css'

export const PaymentFormsToogle = ({paymentMethod, cart, pickupLocation,shippingCost,deliveryMethod,totalPrice,userid}) => {

  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    alert(`Paid through MPESA: ${phoneNumber}`);
  };

  if (paymentMethod === 'MPESA') {
    return (
      <div>
        <form className = 'phone-number-form'onSubmit={handlePhoneSubmit}>
          <label htmlFor="phone-number">Phone Number:</label>
          <input
            type="tel"
            id="phone-number"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  } else if (paymentMethod === 'Credit Card') {
    return (
      <div>
        <StripeContainer 
    items={cart}
    pickupLocation={pickupLocation}
    shippingCost={shippingCost}
    deliveryMethod={deliveryMethod}
    total={totalPrice + shippingCost}
    userId={userid}
  />
      </div>
    );
  } else if (paymentMethod === "PayPal") {
    return (
      <div>
        <p>Paypal not supported at the moment. Please select another method.</p>
      </div>
    );
  }else if (paymentMethod === 'Cash') {
    return (
      <div>
        <p>please ensure that you have the cash on delivery or you will not be allowed to pickup the order</p>
      </div>
    );
}else if (paymentMethod === "Pay on delivery") {
    return (
      <div>
        <p>please ensure that you have the cash on delivery or you will not be allowed to pickup the order</p>
        <p>if you would like to pay in another way please ensure you have the funds in your account on delivery</p>
      </div>
    );
  } 

  else {
    return (
      <div>
        <p>Please select a payment method.</p>
      </div>
    );
  }
};
