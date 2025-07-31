import React, {useState}from "react";
import { UserOrderCard } from "./UserOrderCard";
import { FarmerOrderCard } from "./FarmerOrderCard";
import NotFound from "../Utils/NotFound";
import axios from "axios";

export const NotPaid = ({ role, order }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  const handleMakePayment = (order) => {
    console.log('Order:', order);
    setSelectedOrder(order);
  };

   const handleConfirmPayment = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };

      const response = await axios.put(
        `https://farmart-y80m.onrender.com/api/Order/PaymentStatus/${id}?paid=true`,
        {},
        config
      );

      if (response.status === 200) {
        alert("Payment confirmed successfully");
        setOrders((prev) => prev.filter((order) => order.id !== id));
      } else {
        alert("Unable to confirm order Payment");
      }
    } catch (error) {
      console.error("Error confirming order Payment:", error);
      alert("An error occurred while confirming the Payment");
    }
  };


  const filteredOrders = order?.filter((o) => o.paid === false);


  if (!filteredOrders || filteredOrders.length === 0) {
    return <NotFound />;
  }

  if (role === "customer") {
    return (
      <div>
        <UserOrderCard
          orders={filteredOrders}
          renderActions={(order) => (
            <button onClick={() => handleMakePayment(order.id)}>
              Make Payment
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
  } else if (role === "farmer") {
    return (
      <div>
        <FarmerOrderCard
          orders={filteredOrders}
          renderActions={(order) => (
            <button onClick={() => handleConfirmPayment(order.id)}>
              Confirm Payment
            </button>
          )}
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
