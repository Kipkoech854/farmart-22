import React,{useState, useEffect} from "react";
import { UserOrderCard } from "./UserOrderCard";
import { FarmerOrderCard } from "./FarmerOrderCard";
import '../Stylesheets/UserOrderCard.css';
import { FarmerOrders } from "../Utils/FarmerFaker";
import { UserOrders } from "../Utils/UserFaker";
import axios from "axios";

export const PendingOrders = ({role}) => {
  
  const [Orders, setOrders] = useState([])

  //const userOrders = UserOrders;
  //const farmerOrders = FarmerOrders;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        
        
   // Log the token here
  
        const options = {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        };
        console.log('Axios headers:', options);
  
        const response = await axios.get('http://127.0.0.1:5555/api/Order/status?status=pending', options);
        setOrders(response.data);
        console.log('Fetched orders:', response.data);
      } catch (error) {
        console.error('Error fetching all orders:', error);
      }
    };
  
    fetchOrders();
  }, []);
  

  const handleDeleteOrder = async(id) => {
    
    const token = localStorage.getItem('token');
    

   try {
    const response = await axios.delete(
      `http://127.0.0.1:5555/api/Order/delete/${id}`,
    {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  }
);

    console.log(response.data)
    if (response.status === 200) {
      alert("Order deleted successfully");
    } else {
      alert("Unable to delete order");
    }
  } catch (error) {
    console.error("Error deleting order:", error);
    alert("An error occurred while deleting the order");
  }
  };

 const handleConfirmOrder = async (id) => {
  console.log('Confirm order', id);
  const token = localStorage.getItem('token');

  try {
    const response = await axios.put(
      `http://127.0.0.1:5555/api/Order/status/${id}?status=confirmed`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      alert("Order confirmed successfully");
    } else {
      alert("Unable to confirm order");
    }
  } catch (error) {
    console.error("Error confirming order:", error);
    alert("An error occurred while confirming the order");
  }
};

  const handleRejectOrder = async(id) => {
    console.log('Reject order', id);
     const token = localStorage.getItem('token');

  try {
    const response = await axios.put(
      `http://127.0.0.1:5555/api/Order/status/${id}?status=rejected`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      alert("Order rejected successfully");
    } else {
      alert("Unable to reject order");
    }
  } catch (error) {
    console.error("Error rejecting order:", error);
    alert("An error occurred while rejecting the order");
  }
  };

  if (role === 'customer') {
    return (
      <div>
        <UserOrderCard orders={Orders} onDelete={handleDeleteOrder} />
      </div>
    );
  } else if (role === 'farmer') {
    return (
      <div>
        <FarmerOrderCard
          orders={Orders}
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
