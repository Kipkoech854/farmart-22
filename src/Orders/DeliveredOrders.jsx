import React, { useState, useEffect } from "react";
import { UserOrderCard } from "./UserOrderCard";
import { FarmerOrderCard } from "./FarmerOrderCard";
import axios from "axios";
import NotFound from "../Utils/NotFound";

export const DeliveredOrders = ({ role, order }) => {
  const [Orders, setOrders] = useState([]);

  useEffect(() => {
    const filtered = order.filter(o => o.status.toLowerCase() === 'delivered');
    setOrders(filtered);
  }, [order]);

  const handleDeleteOrder = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete(
        `http://127.0.0.1:5555/api/Order/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

  if (Orders.length === 0) return <NotFound />;

  const cardProps = {
    orders: Orders,
    renderActions: (order) => (
      <button onClick={() => handleDeleteOrder(order.id)}>Delete</button>
    )
  };

  if (role === 'customer') return <UserOrderCard {...cardProps} />;
  if (role === 'farmer') return <FarmerOrderCard {...cardProps} />;
  if (role === 'admin') return <p>Admin order card not ready at the moment</p>;

  return null;
};
