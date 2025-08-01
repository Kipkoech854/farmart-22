import React, { useState } from "react";
import { UserOrderCard } from "./UserOrderCard";
import { FarmerOrderCard } from "./FarmerOrderCard";
import { PaymentFormsToogle } from '../Utils/PaymentFormsToogle';
import NotFound from "../Utils/NotFound";

export const ConfirmedOrders = ({ role, order }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const confirmedOrders = order.filter(o => o.status === "confirmed");

  const handleMakePayment = (order) => {
    console.log('Order:', order);
    setSelectedOrder(order);
  };

  if (!confirmedOrders.length) return <NotFound message="No confirmed orders found." />;

  if (role === 'customer') {
    return (
      <div>
        <UserOrderCard
          orders={confirmedOrders}
          renderActions={(order) => (
            <button onClick={() => handleMakePayment(order)}>
              Make payment
            </button>
          )}
        />

        {selectedOrder && (
          <div style={{ marginTop: '20px' }}>
            <PaymentFormsToogle order={selectedOrder} />
          </div>
        )}
      </div>
    );
  } else if (role === 'farmer') {
    return <FarmerOrderCard orders={confirmedOrders} />;
  } else if (role === 'admin') {
    return <p>admin order card not ready at the moment</p>;
  } else {
    console.error('Cannot determine your role!');
    return null;
  }
};
