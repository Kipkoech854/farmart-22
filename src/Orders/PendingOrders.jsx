import React from "react";
import { UserOrderCard } from "./UserOrderCard";
import { FarmerOrderCard } from "./FarmerOrderCard";
import '../Stylesheets/UserOrderCard.css';
import { FarmerOrders } from "../Utils/FarmerFaker";
import { UserOrders } from "../Utils/UserFaker";

export const PendingOrders = ({role}) => {
  

  const userOrders = UserOrders;
  const farmerOrders = FarmerOrders;

  const handleDeleteOrder = (id) => {
    console.log('Delete order', id);
    // implement your delete logic here
  };

  const handleConfirmOrder = (id) => {
    console.log('Confirm order', id);
    // implement your confirm logic here
  };

  const handleRejectOrder = (id) => {
    console.log('Reject order', id);
    // implement your reject logic here
  };

  if (role === 'customer') {
    return (
      <div>
        <UserOrderCard orders={userOrders} onDelete={handleDeleteOrder} />
      </div>
    );
  } else if (role === 'farmer') {
    return (
      <div>
        <FarmerOrderCard
          orders={farmerOrders}
          renderActions={(order) => (
            <>
              <button className="confirm-btn" onClick={() => handleConfirmOrder(order.id)}>
                Confirm
              </button>
              <button className="reject-btn" onClick={() => handleRejectOrder(order.id)}>
                Reject
              </button>
            </>
          )}
        />
      </div>
    );
  } else if (role === 'admin') {
    return (
      <div>
        <p>admin order card not ready at the moment</p>
      </div>
    );
  } else {
    console.error('Cannot determine your role!');
    return null;
  }
};
