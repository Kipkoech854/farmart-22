import React from "react";
import { UserOrderCard } from "./UserOrderCard";
import { FarmerOrderCard } from "./FarmerOrderCard";
import NotFound from "../Utils/NotFound";
import axios from "axios";

export const PaidOrders = ({ role, order }) => {
  const handleConfirmDelivery = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };

      const response = await axios.put(
        `https://farmart-y80m.onrender.com/api/Order/DeliveryStatus/${id}?delivered=true`,
        {},
        config
      );

      if (response.status === 200) {
        alert("Delivery confirmed successfully");
        setOrders((prev) => prev.filter((order) => order.id !== id));
      } else {
        alert("Unable to confirm order delivery");
      }
    } catch (error) {
      console.error("Error confirming order delivery:", error);
      alert("An error occurred while confirming the delivery");
    }
  };



  const filteredOrders = order?.filter(
    (o) => o.paid === true
  );

  if (!filteredOrders || filteredOrders.length === 0) {
    return <NotFound />;
  }

  if (role === "customer") {
    return (
      <div>
        <UserOrderCard
          orders={filteredOrders}
          renderActions={(order) => (
            <button onClick={() => handleConfirmDelivery(order.id)}>
              Confirm Delivery
            </button>
          )}
        />
      </div>
    );
  } else if (role === "farmer") {
    return (
      <div>
        <FarmerOrderCard
          orders={filteredOrders}
          
        />
      </div>
    );
  } else if (role === "admin") {
    return <p>Admin order card not ready at the moment</p>;
  } else {
    console.error("Cannot determine your role!");
    return null;
  }
};
