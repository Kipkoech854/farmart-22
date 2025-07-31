import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import '../Stylesheets/AdminPanel.css';

const COLORS = ["#2F80ED", "#27AE60", "#EB5757", "#F2C94C", "#9B51E0", "#56CCF2"];

export const BestSellingPieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://farmart-y80m.onrender.com/api/admin/orders/best-sellers")
      .then((res) => setData(res.data))
      .catch((err) => console.error("Error fetching best sellers", err));
  }, []);

  return (
    <div className="metrics-container">
      <h2 className="metrics-title">Best Selling Animal Types</h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="type"
            cx="50%"
            cy="50%"
            outerRadius={130}
            label={({ type, percent }) =>
              `${type} (${(percent * 100).toFixed(0)}%)`
            }
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
