import React, { useState } from "react";
import { FarmersTable } from "../Admintables/FarmersTable";
import { UsersTable } from "../Admintables/UsersTable";
import '../Stylesheets/AdminPanel.css';

export const AdminPanel = () => {
    const [activeTable, setActiveTable] = useState(null);
    return (
        <div className="admin-panel">
            <section className="vertical-nav">
                <button onClick={() => setActiveTable('users')}>Users</button>
                <button onClick={() => setActiveTable('farmers')}>Farmers</button>
            </section>

            <section className="Tables-section">
                {activeTable === 'users' && <UsersTable />}
                {activeTable === 'farmers' && <FarmersTable />}
            </section>
        </div>
    );
};
