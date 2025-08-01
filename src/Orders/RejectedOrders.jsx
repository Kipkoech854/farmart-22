import React from "react";
import { UserOrderCard } from "./UserOrderCard";
import { FarmerOrderCard } from "./FarmerOrderCard";
import NotFound from "../Utils/NotFound";
import axios from "axios";

export const RejectedOrders = ({ role, orders, setOrders }) => {
  const handleDeleteOrder = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete(
        `https://farmart-y80m.onrender.com/api/Order/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        alert("Order deleted successfully");
        setOrders(prev => prev.filter(order => order.id !== id));
      } else {
        alert("Unable to delete order");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("An error occurred while deleting the order");
    }
  };

  const filteredOrders = Array.isArray(orders)
  ? orders.filter(o => o.status?.toLowerCase() === 'rejected')
  : [];


  if (!filteredOrders || filteredOrders.length === 0) {
    return <NotFound />;
  }

  if (role === 'customer') {
    return (
      <div>
        <UserOrderCard
          orders={filteredOrders}
          renderActions={(order) => (
            <button onClick={() => handleDeleteOrder(order.id)}>
              Delete
            </button>
          )}
        />
      </div>
    );
  } else if (role === 'farmer') {
    return (
      <div>
        <FarmerOrderCard
          orders={filteredOrders}
          renderActions={(order) => (
            <button onClick={() => handleDeleteOrder(order.id)}>
              Delete
            </button>
          )}
        />
      </div>
    );
  } else if (role === 'admin') {
    return <p>Admin order card not ready at the moment</p>;
  } else {
    console.error('Cannot determine your role!');
    return null;
  }
};
