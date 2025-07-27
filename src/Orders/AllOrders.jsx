import React, { useState,useEffect } from "react";
import { UserOrderCard } from "./UserOrderCard";
import { FarmerOrderCard } from "./FarmerOrderCard";
import { FarmerOrders } from "../Utils/UnconstrainedFaker";
import { UserOrders } from "../Utils/UserFaker";
import { allOrders } from '../services/Ordersapi'
import axios from 'axios';

export const AllOrders = ({role}) =>{
  
  const handleDeleteOrder = (e) =>{
    e.preventDefault()
    console.alert('deleting order')
  }
  
  const [Orders, setOrders] = useState([])
  
useEffect(() => {
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token before request:', token);
      
 // Log the token here

      const options = {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };
      console.log('Axios headers:', options);

      const response = await axios.get('http://127.0.0.1:5555/api/Order/all', options);
      setOrders(response.data);
      console.log('Fetched orders:', response.data);
    } catch (error) {
      console.error('Error fetching all orders:', error);
    }
  };

  fetchOrders();
}, []);


  const userOrders = UserOrders;
  const farmerOrders = FarmerOrders;

    if (role === 'customer') {
      return (
        <div>
          <UserOrderCard orders={Orders} onDelete={handleDeleteOrder} />
        </div>
      );
    } else if (role === 'farmer') {
      return (
        <div>
          <FarmerOrderCard orders={Orders} />
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