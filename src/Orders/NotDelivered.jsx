import React, { useState } from "react";
import { UserOrderCard } from "./UserOrderCard";
import { FarmerOrderCard } from "./FarmerOrderCard";
import '../Stylesheets/UserOrderCard.css';
import NotFound from "../Utils/NotFound";
import axios from "axios";

export const NotDelivered = ({ role, order }) => {
  const [orders, setOrders] = useState(
    order.filter((o) => o.delivered === false)
  );

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
        `http://127.0.0.1:5555/api/Order/DeliveryStatus/${id}?delivered=true`,
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

  if (!orders.length) return <NotFound />;

  if (role === "customer") {
    return (
      <div>
        <UserOrderCard
          orders={orders}
          renderActions={(order) => (
            <button className="details-btn" onClick={() => handleConfirmDelivery(order.id)}>
              Confirm delivery
            </button>
          )}
        />
      </div>
    );
  } else if (role === "farmer") {
    return (
      <div>
        <FarmerOrderCard orders={orders} />
      </div>
    );
  } else if (role === "admin") {
    return (
      <div>
        <p>admin order card not ready at the moment</p>
      </div>
    );
  } else {
    console.error("Cannot determine your role!");
    return null;
  }
};
