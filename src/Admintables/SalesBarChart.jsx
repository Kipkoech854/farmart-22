import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export const SalesBarChart = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://farmart-y80m.onrender.com/api/admin/sales/summary")
      .then(res => {
        setSalesData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch sales summary", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading bar chart...</p>;

  return (
    <div style={{ width: '100%', height: 300 }}>
      <h3 className="chart-title">Daily Sales Summary</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total_sales" fill="#4caf50" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
