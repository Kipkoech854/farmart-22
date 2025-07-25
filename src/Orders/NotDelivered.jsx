import React, {useState} from "react";
import { UserOrderCard } from "./UserOrderCard";
import { FarmerOrderCard } from "./FarmerOrderCard";
import { FarmerOrders } from "../Utils/FarmerFaker";
import { UserOrders } from "../Utils/UserFaker";
import '../Stylesheets/UserOrderCard.css'

export const NotDelivered = ({role}) =>{

  
    //const [Orders, setOrders] = useState([])
    const userOrders = UserOrders;
    const farmerOrders = FarmerOrders;

    const handleDeleteOrder = (e) =>{
    e.preventDefault()
    console.alert('deleting order')
  }
  

      if (role === 'customer') {
          return (
            <div>
              <UserOrderCard orders={userOrders} onDelete={handleDeleteOrder} 
                renderActions={(order) => (
                    <button className="details-btn" onClick={() =>handleConfirmDelivery(order.id)}>
                        Confirm delivery
                    </button>
                )}/>
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