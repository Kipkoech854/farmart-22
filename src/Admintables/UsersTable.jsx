import React, { useState, useEffect } from "react";
import axios from "axios";
import '../Stylesheets/UsersTable.css';
import { CheckCheck, XCircle, Trash2 } from 'lucide-react';

export const UsersTable = () => {
    const [Users, setUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('http://127.0.0.1:5555/api/User/adminUsers');
                setUsers(res.data); 
            } catch (error) {
                alert(error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="userstable">
            <Table users={Users} />
        </div>
    )
}

const Table = ({ users }) => {
    const normalizedUsers = Array.isArray(users) ? users : users ? [users] : [];
    return (
        <div className="userstable">
            <table>
                <thead className="table-head">
                    <tr className="table-head-row">
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Verified</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {normalizedUsers.map((user) => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.role}</td>
                            <td>
                                {user.verified ? (
                                    <CheckCheck size={20} color="green" strokeWidth={1.5} />
                                ) : (
                                    <XCircle size={20} color="gray" strokeWidth={1.5} />
                                )}
                            </td>
                            <td>
                                <button className="disable-btn">Disable</button>
                                <button className="delete-btn">
                                    <Trash2 size={20} color="red" strokeWidth={1.5} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
