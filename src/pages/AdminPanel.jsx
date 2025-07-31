import React, { useState } from "react";
import { FarmersTable } from "../Admintables/FarmersTable";
import { UsersTable } from "../Admintables/UsersTable";
import { OrderMetricsChart } from "../Admintables/OrderMatricsChart";
import { BestSellingPieChart } from "../Admintables/BestSellingPieChart";
import { SegmentedOrdersTable } from "../Admintables/SegmentedOrdersTable";
import { SalesBarChart } from "../Admintables/SalesBarChart";
import '../Stylesheets/AdminPanel.css';

export const AdminPanel = () => {
    const [activeTable, setActiveTable] = useState(null);
    return (
        <div className="admin-panel">
            <section className="vertical-nav">
                <button
                    className={activeTable === 'users' ? 'active' : ''}
                    onClick={() => setActiveTable('users')}
                >
                    Users
                </button>
                <button
                    className={activeTable === 'farmers' ? 'active' : ''}
                    onClick={() => setActiveTable('farmers')}
                >
                    Farmers
                </button>
                <button
                    className={activeTable === 'sales-bar' ? 'active' : ''}
                    onClick={() => setActiveTable('sales-bar')}
                >
                    Sales Bar
                </button>
                <button
                    className={activeTable === 'orders-metrics' ? 'active' : ''}
                    onClick={() => setActiveTable('orders-metrics')}
                >
                    Order Metrics
                </button>
                <button
                    className={activeTable === 'best-sellers' ? 'active' : ''}
                    onClick={() => setActiveTable('best-sellers')}
                >
                    Best Sellers
                </button>
                <button
                    className={activeTable === 'orders' ? 'active' : ''}
                    onClick={() => setActiveTable('orders')}
                >
                    Orders
                </button>

            </section>

            <section className="Tables-section">
                {activeTable === 'users' && <UsersTable />}
                {activeTable === 'farmers' && <FarmersTable />}
                {activeTable === 'orders-metrics' && <OrderMetricsChart />}
                {activeTable === 'best-sellers' && <BestSellingPieChart />}
                {activeTable === 'orders' && <SegmentedOrdersTable />}
                {activeTable === 'sales-bar' && <SalesBarChart />}
            </section>
        </div>
    );
};
