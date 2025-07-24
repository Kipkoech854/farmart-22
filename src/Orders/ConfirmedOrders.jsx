
import React, { useState, useEffect } from "react";
import { UserOrderCard } from "./UserOrderCard";
import { FarmerOrderCard } from "./FarmerOrderCard";
import { FarmerOrders } from "../Utils/FarmerFaker";
import { UserOrders } from "../Utils/UserFaker";

export const ConfirmedOrders = ({role}) => {
  //const [Orders, setOrders] = useState([]);
  const [ID, setID] = useState('');
  const [loading, setLoading] = useState(true);
  
    const userOrders = UserOrders;
    const farmerOrders = FarmerOrders;
 


  
 const handleDeleteOrder = (e) =>{
  e.preventDefault()
  console.alert('order deleted')
 }

  


  /*useEffect(() => {
    Confirmed()
      .then((res) => {
        setOrders(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);*/

  

  if (role === 'customer') {
  return (
    <div>
      <UserOrderCard orders={userOrders} onDelete={handleDeleteOrder} />
    </div>
  );
} else if (role === 'farmer') {
  return (
    <div>
      <FarmerOrderCard orders={farmerOrders} />
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




/*
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
  );*/
};
