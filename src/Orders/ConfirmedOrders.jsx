import { Confirmed } from "../../public/Api/Ordersapi";
import React, { useState, useEffect } from "react";
import { UserOrderCard } from "./UserOrderCard";
import { FarmerOrderCard } from "./FarmerOrderCard";

export const ConfirmedOrders = () => {
  //const [Orders, setOrders] = useState([]);
  const [ID, setID] = useState('');
  const [loading, setLoading] = useState(true);
  const role = 'farmer'
  /*const Orders = [
  {
    "id": "cc7f310a-dc45-4a0a-a7ce-5f1d2c876abc",
    "user_id": "9c81c3d9-0f1e-4f74-91c9-587bfa79e0f2",
    "status": "confirmed",
    "created_at": "2025-07-22T11:14:35.654321",
    "delivered": false,
    "amount":1500.0,
    "paid":false,
    "items": [
      {
        "animal_id": "52caf6ba-278a-4251-9c63-42cabff05a1c",
        "name": "Whiskers",
        "type": "Cat",
        "breed": "Siamese",
        "age": 2,
        "price": 1500.0,
        "description": "A playful Siamese cat with blue eyes and a calm temperament. Perfect for companionship.",
        "is_available": true,
        "images": [
          "https://i.pinimg.com/736x/01/32/6d/01326db27da19a9478069e72fb0c6c17.jpg",
          "https://i.pinimg.com/736x/71/59/5b/71595b3f777815e053fa8678e90bb5ce.jpg"
        ],
        "image_count": 2,
        "quantity": 1,
        "price_at_order_time": 1500.0,
        "farmer_email": "farmer@example.com",
        "farmer_username": "farm_guru",
        "farmer_picture": "https://i.pinimg.com/736x/eb/76/a4/eb76a46ab920d056b02d203ca95e9a22.jpg"
      }
    ]
  }
]*/

const  Orders = [[
  {
    "id": "8a9c5b11-2a91-4e2d-a6f0-71a4cbd3a70f",
    "user_id": "bb5d2b48-77f6-4890-9e1e-0babc8120d89",
    "status": "confirmed",
    "created_at": "2025-07-22T16:35:44.123456",
    "delivered": false,
    "paid": true,
    "amount":'3400',
    "items": [
      {
        "animal_id": "52caf6ba-278a-4251-9c63-42cabff05a1c",
        "name": "Whiskers",
        "type": "Cat",
        "breed": "Siamese",
        "age": 2,
        "price": 1500.0,
        "description": "A playful Siamese cat with blue eyes and a calm temperament. Perfect for companionship.",
        "is_available": true,
        "images": [
          "https://i.pinimg.com/736x/1a/1a/af/1a1aaf9b636794b997cf2a3237cdd160.jpg",
          "https://i.pinimg.com/736x/11/c1/33/11c1333210702b0d3501ea9f99044144.jpg"
        ],
        "image_count": 2,
        "quantity": 1,
        "price_at_order_time": 1500.0
      },
      {
        "animal_id": "c4a187e7-0ae1-4d64-b75b-cc345329d4b2",
        "name": "Buddy",
        "type": "Dog",
        "breed": "Golden Retriever",
        "age": 3,
        "price": 2000.0,
        "description": "A loyal golden retriever, vaccinated and friendly with kids.",
        "is_available": false,
        "images": [
          "https://i.pinimg.com/736x/9f/77/69/9f776960b5fe247c5cd748caaf53ccd8.jpg",
          "https://i.pinimg.com/736x/27/b5/08/27b508d831529e55c86b40ac3153222d.jpg",
          "https://i.pinimg.com/1200x/2f/3c/a1/2f3ca15c897f9fac8a2ea0718a09bcd7.jpg"
        ],
        "image_count": 3,
        "quantity": 2,
        "price_at_order_time": 1900.0
      }
    ],
    "customer_email": "jane.doe@example.com",
    "customer_username": "jane_doe",
    "customer_picture": "https://i.pinimg.com/1200x/d6/9e/85/d69e858c84bf8bf8579141b1133d868e.jpg"
  }
]

]
  
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

  /*const handleDetails = (orderId) => {
    setID(orderId);
    console.log("Selected Order ID:", orderId);
    alert('remember to write the method');
  };
*/

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
