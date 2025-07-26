import React, { useState,useEffect } from "react";
import { UserOrderCard } from "./UserOrderCard";
import { FarmerOrderCard } from "./FarmerOrderCard";
import { FarmerOrders } from "../Utils/UnconstrainedFaker";
import { UserOrders } from "../Utils/UserFaker";
import { allOrders } from '../services/Ordersapi'

export const AllOrders = ({role}) =>{
  
  const handleDeleteOrder = (e) =>{
    e.preventDefault()
    console.alert('deleting order')
  }
  
  const [Orders, setOrders] = useState([])
  
 useEffect(() => {
  const fetchOrders = async () => {
    try {
      const data = await allOrders();
      console.log(data)
      // If allOrders throws or returns bad data, check that here
      if (!data || data.error) {
        console.log('Error fetching data from allOrders function');
      } else {
        setOrders(data);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  fetchOrders();
}, []);
  
  const userOrders = UserOrders;
  const farmerOrders = FarmerOrders;

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
    
}