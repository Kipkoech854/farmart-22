import React, { useState, useEffect } from "react";
import '../Stylesheets/FarmersTable.css';
import { CheckCheck, XCircle, Trash2 } from 'lucide-react';
import axios from "axios";
import AnimalCard from "./AnimalCard";
import { RegistrationForm } from "./RegistrationForm";

export const FarmersTable = () => {
    const [farmers, setFarmers] = useState([]);
    const [showRegistration, setShowRegistration] = useState(false);

    useEffect(() => {
        const fetchFarmers = async () => {
            try {
                const res = await axios.get('http://127.0.0.1:5555/api/farmers/adminFarmers');
                setFarmers(res.data);
            } catch (error) {
                alert(error.message);
            }
        };
        fetchFarmers();
    }, []);

    return (
        <div className="farmers-management">
            <FarmersTableContent
                farmers={farmers}
                onShowRegistration={() => setShowRegistration(!showRegistration)}
                showRegistration={showRegistration}
            />
        </div>
    );
};

const FarmersTableContent = ({ farmers, onShowRegistration, showRegistration }) => {
    const [expandedFarmer, setExpandedFarmer] = useState(null);
    const [animals, setAnimals] = useState([]);
    const [role, setRole] = useState('customer');

    const fetchAnimals = async (id) => {
        try {
            const res = await axios.get(`http://127.0.0.1:5555/api/farmers/adminFarmers/${id}/animals`);
            setAnimals(res.data);
            setExpandedFarmer(id);
        } catch (error) {
            alert(error.message || "Failed to fetch animals");
        }
    };

    const toggleVerification = async (id) => {
        try {
            await axios.put(`http://127.0.0.1:5555/api/farmers/farmers/${id}/toggle-verify`);
            window.location.reload();
        } catch (err) {
            alert('Failed. Check console.');
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        // Implement delete functionality
    };

    return (
        <div className="farmers-container">
            <div className="table-controls">
                <button
                    className="toggle-registration"
                    onClick={onShowRegistration}
                >
                    {showRegistration ? 'Hide Registration' : '+ New Farmer'}
                </button>
            </div>

            <div className="table-wrapper">
                <table className="farmers-table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Verified</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {farmers.map((farmer) => (
                            <React.Fragment key={farmer.id}>
                                <tr>
                                    <td>
                                        <button
                                            className="view-animals"
                                            onClick={() => fetchAnimals(farmer.id)}
                                        >
                                            {farmer.username}
                                        </button>
                                    </td>
                                    <td>{farmer.email}</td>
                                    <td>{farmer.phone}</td>
                                    <td>
                                        {farmer.verified ? (
                                            <CheckCheck size={20} color="green" strokeWidth={1.5} />
                                        ) : (
                                            <XCircle size={20} color="gray" strokeWidth={1.5} />
                                        )}
                                    </td>
                                    <td className="actions">
                                        <button
                                            className="verify-toggle"
                                            onClick={() => toggleVerification(farmer.id)}
                                        >
                                            {farmer.verified === 'verified' ? 'Disable' : 'Verify'}
                                        </button>
                                        <button
                                            className="delete"
                                            onClick={() => handleDelete(farmer.id)}
                                        >
                                            <Trash2 size={20} color="red" strokeWidth={1.5} />
                                        </button>
                                    </td>
                                </tr>
                                {expandedFarmer === farmer.id && (
                                    <tr className="animal-details">
                                        <td colSpan={5}>
                                            <div className="animals-container">
                                                <button
                                                    className="hide-animals"
                                                    onClick={() => setExpandedFarmer(null)}
                                                >
                                                    Hide Animals
                                                </button>
                                                {animals.length > 0 ? (
                                                    animals.map((animal) => (
                                                        <AnimalCard key={animal.id} animal={animal} />
                                                    ))
                                                ) : (
                                                    <p className="no-animals">No animals found</p>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            {showRegistration && (
                <div className="registration-section">
                    <RegistrationForm newrole={role} />
                </div>
            )}
        </div>
    );
};