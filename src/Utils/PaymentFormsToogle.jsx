import { useState, useEffect } from 'react';
import StripeContainer from '../Payment/StripeContainer';
import '../Stylesheets/PaymentFormsToogle.css';

export const PaymentFormsToogle = ({ order }) => {
  const [paymentMethod, setpaymentMethod] = useState(order.payment_method);
  const [pickupLocation, setpickupLocation] = useState(order.pickup_station);
  const [shippingCost, setshippingCost] = useState(parseFloat(order.total) - order.amount);
  const [deliveryMethod, setdeliveryMethod] = useState(order.deliveryMethod || "");
  const [totalPrice, settotalPrice] = useState(order.total);
  const [userid, setuserid] = useState(order.user_id);
  const [phoneNumber, setPhoneNumber] = useState('');

  // 👉 Watch for changes in `order` and update state accordingly
  useEffect(() => {
    setpaymentMethod(order.payment_method);
    setpickupLocation(order.pickup_station);
    setshippingCost(parseFloat(order.total) - order.amount);
    setdeliveryMethod(order.deliveryMethod || "");
    settotalPrice(order.total);
    setuserid(order.user_id);
  }, [order]);

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    alert(`Paid through MPESA: ${phoneNumber}`);
  };

  if (paymentMethod === 'MPESA') {
    return (
      <div>
        <form className='phone-number-form' onSubmit={handlePhoneSubmit}>
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
          items={order}
        />
      </div>
    );
  } else if (paymentMethod === "PayPal") {
    return (
      <div>
        <p>Paypal not supported at the moment. Please select another method.</p>
      </div>
    );
  } else if (paymentMethod === 'Cash' || paymentMethod === "Pay on delivery") {
    return (
      <div>
        <p>please ensure that you have the cash on delivery or you will not be allowed to pickup the order</p>
        {paymentMethod === "Pay on delivery" && (
          <p>if you would like to pay in another way please ensure you have the funds in your account on delivery</p>
        )}
      </div>
    );
  } else {
    return (
      <div>
        <p>Please select a payment method.</p>
      </div>
    );
  }
};
