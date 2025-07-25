import React, { useState } from "react";
import '../Stylesheets/OverheadClassifiers.css';
import { Dropdown } from "../Utils/Dropdown";

import { AllOrders } from "./AllOrders";
import { PaidOrders } from "./PaidOrders";
import { PendingOrders } from './PendingOrders';
import { ConfirmedOrders } from './ConfirmedOrders';
import { RejectedOrders } from './RejectedOrders';
import { DeliveredOrders } from './DeliveredOrders';
import { NotDelivered } from "./NotDelivered";
import { NotPaid } from "./NotPaid"; 

export const OverheadClassifiers = () => {
  const [selected, setSelected] = useState(null);
  const role = 'customer'
  // Mapping dropdown values to components
  const componentMap = {
    'Pending': <PendingOrders />,
    'Confirmed': <ConfirmedOrders />,
    'Rejected': <RejectedOrders />,
    'Delivered': <DeliveredOrders />,
    'Not delivered': <NotDelivered />,
    'Paid': <PaidOrders />,
    'Not paid': <NotPaid />
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