import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import '../Stylesheets/AdminPanel.css';

export const OrderMetricsChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://farmart-y80m.onrender.com/api/admin/orders/metrics")
      .then((res) => setData(res.data))
      .catch((err) => console.error("Error fetching order metrics", err));
  }, []);

  return (
    <div className="metrics-container">
      <h2 className="metrics-title">Order Traffic (Last 30 Days)</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#ea9e10ff" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
