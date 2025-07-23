/*import { DeliveredOrders } from "../../public/Api/Ordersapi";
import React, { useState, useEffect } from "react";

export const DeliveredOrders = () => {
  const [Orders, setOrders] = useState([]);
  const [ID, setID] = useState('');
  const [loading, setLoading] = useState(true);

  


  useEffect(() => {
     DeliveredOrders()
      .then((res) => {
        setOrders(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  const handleDetails = (orderId) => {
    setID(orderId);
    console.log("Selected Order ID:", orderId);
    alert('remember to write the method');
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        Orders.map((order) => (
          <button key={order.id} onClick={() => handleDetails(order.id)}>
            <p>Amount: Ksh {order.amount}</p>
            <p>Pickup station: {order.pickup_station}</p>
            <p>Payment method: {order.payment_method}</p>
            <p>{order.paid ? 'Paid' : 'Not Paid'}</p>
            <p>{order.delivered ? 'Delivered' : 'Not Delivered'}</p>
            <p>{new Date(order.created_at).toLocaleString()}</p>
          </button>
        ))
      )}
    </div>
  );
};
*/