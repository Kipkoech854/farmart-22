import { useState} from "react";
import '../Stylesheets/OverheadClassifiers.css'
import { Link } from "react-router-dom";


export const OverheadClassifiers = () => {
    return(
        <div className="overheadclassifiers">
           <nav className='overheadnav'>
              < Link to ='/PendingOrders'>Pending</Link>
              < Link to ='/ConfirmedOrders'>Confirmed</Link>
              < Link to ='/RejectedOrders'>Rejected</Link>
              < Link to ='/DeliveredOrders'>Delivered</Link>
              < Link to ='/NotDeliveredOrders'>Delivered</Link>
              < Link to ='/PaidOrders'>Paid</Link>
              < Link to ='/NotPaidOrders'>NotPaid</Link>
           </nav>
        </div>
    )
}