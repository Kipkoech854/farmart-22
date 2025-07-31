import React, { useState, useEffect } from "react";
import '../Stylesheets/OverheadClassifiers.css';
import { Dropdown } from "../Utils/Dropdown";
import axios from "axios";

import { AllOrders } from "./AllOrders";
import { PaidOrders } from "./PaidOrders";
import { PendingOrders } from './PendingOrders';
import { ConfirmedOrders } from './ConfirmedOrders';
import { RejectedOrders } from './RejectedOrders';
import { DeliveredOrders } from './DeliveredOrders';
import { NotDelivered } from "./NotDelivered";
import { NotPaid } from "./NotPaid"; 
import { getUserRole } from "../utils/decodeToken";

export const OverheadClassifiers = () => {
  const [selected, setSelected] = useState(null);
  const [orders, setOrders] = useState([]);
  const role = getUserRole();


   useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get("http://127.0.0.1:5555/api/Order/all", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      }
    };

    fetchOrders();
  }, []);

  
 
  const componentMap = {
    'Pending': <PendingOrders order={orders} setOrders={setOrders}/>,
    'Confirmed': <ConfirmedOrders order={orders} />,
    'Rejected': <RejectedOrders order={orders} setOrders={setOrders}/>,
    'Delivered': <DeliveredOrders order={orders}/>,
    'Not delivered': <NotDelivered order={orders}/>,
    'Paid': <PaidOrders order={orders}/>,
    'Not paid': <NotPaid order={orders}/>
  };

  // Determine which component to render
  const RenderedComponent = selected ? componentMap[selected] : <AllOrders />;

  return (
    <div className="Order-menu">
      <div className="dropdown-container">
        <Dropdown
        label="Filter"
        options={Object.keys(componentMap)}
       onSelect={(option) => setSelected(option)}
      />
    </div>
   {React.cloneElement(RenderedComponent, { role })}
  </div>

  );
};













/*<nav className='overheadnav'>
              < Link to ='/PendingOrders'>Pending</Link>
              < Link to ='/ConfirmedOrders'>Confirmed</Link>
              < Link to ='/RejectedOrders'>Rejected</Link>
              < Link to ='/DeliveredOrders'>Delivered</Link>
              < Link to ='/NotDeliveredOrders'>Delivered</Link>
              < Link to ='/PaidOrders'>Paid</Link>
              < Link to ='/NotPaidOrders'>NotPaid</Link>
           </nav>*/