import React from "react";
import { UserOrderCard } from "./UserOrderCard";
import { FarmerOrderCard } from "./FarmerOrderCard";
import '../Stylesheets/UserOrderCard.css';
import axios from "axios";
import NotFound from "../Utils/NotFound";

export const PendingOrders = ({ role, order, setOrders }) => {
  const filteredOrders = order.filter(o => o.status.toLowerCase() === 'pending');

  const handleDeleteOrder = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete(
        `https://farmart-y80m.onrender.com/api/Order/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
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

  const handleConfirmOrder = async (id) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.put(
      `https://farmart-y80m.onrender.com/api/Order/status/${id}?status=confirmed`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      alert("Order confirmed successfully");
      setOrders(prev =>
        prev.map(order =>
          order.id === id ? { ...order, status: 'confirmed' } : order
        )
      );
    } else {
      alert("Unable to confirm order");
    }
  } catch (error) {
    console.error("Error confirming order:", error);
    alert("An error occurred while confirming the order");
  }
};

const handleRejectOrder = async (id) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.put(
      `https://farmart-y80m.onrender.com/api/Order/status/${id}?status=rejected`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      alert("Order rejected successfully");
      setOrders(prev =>
        prev.map(order =>
          order.id === id ? { ...order, status: 'rejected' } : order
        )
      );
    } else {
      alert("Unable to reject order");
    }
  } catch (error) {
    console.error("Error rejecting order:", error);
    alert("An error occurred while rejecting the order");
  }
};


  if (filteredOrders.length === 0) return <NotFound />;

  if (role === 'customer') {
    return <UserOrderCard orders={filteredOrders} />;
  } else if (role === 'farmer') {
    return (
      <FarmerOrderCard
        orders={filteredOrders}
        renderActions={(order) => (
          <>
            <button className="confirm-btn" onClick={() => handleConfirmOrder(order.id)}>Confirm</button>
            <button className="reject-btn" onClick={() => handleRejectOrder(order.id)}>Reject</button>
          </>
        )}
      />
    );
  } else if (role === 'admin') {
    return <p>admin order card not ready at the moment</p>;
  } else {
    console.error('Cannot determine your role!');
    return null;
  }
};
