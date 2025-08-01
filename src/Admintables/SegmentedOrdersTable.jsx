import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Stylesheets/AdminPanel.css";

export const SegmentedOrdersTable = () => {
  const [groupedOrders, setGroupedOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://farmart-y80m.onrender.com/api/admin/orders/grouped")
      .then(res => {
        setGroupedOrders(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch grouped orders", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="orders-segmented">
      {groupedOrders.map((group) => (
        <div key={group.date} className="orders-group">
          <h3 className="order-date-heading">{group.date}</h3>
          <table className="order-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Amount</th>
                <th>Total</th>
                <th>Status</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th>Payment</th>
                <th>Delivery</th>
              </tr>
            </thead>
            <tbody>
              {group.orders.map(order => (
                <tr key={order.id}>
                  <td>{order.user_id}</td>
                  <td>{order.amount}</td>
                  <td>{order.total}</td>
                  <td>{order.status}</td>
                  <td>{order.paid ? "Yes" : "No"}</td>
                  <td>{order.delivered ? "Yes" : "No"}</td>
                  <td>{order.payment_method}</td>
                  <td>{order.delivery_method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};
