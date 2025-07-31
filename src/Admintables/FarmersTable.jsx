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
        <div className="farmers-table">
            {/* Move the button outside the table */}
            <div className="table-controls">
                <button onClick={handleCreateFarmer}>
                    {Registration ? 'Cancel' : '+ New Farmer'}
                </button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>email</th>
                        <th>Phone</th>
                        <th>Verified</th>
                        <th>actions</th>
                    </tr>
                </thead>
                <tbody>
                    {normalizedFarmers.map((farmer) => (
                        <tr key={farmer.id}>
                            {/* ... keep your existing table rows ... */}
                        </tr>
                    ))}
                    {isOpen && (
                        <tr>
                            <td colSpan={5}>
                                <button onClick={() => setisOpen(false)}>Hide animals</button>
                                {Animals.length > 0 ? (
                                    Animals.map((animal, index) => (
                                        <AnimalCard key={animal.id || index} animal={animal} />
                                    ))
                                ) : (
                                    <p>No animals found</p>
                                )}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {Registration && (
                <div className="registration-form-container">
                    <RegistrationForm newrole={Role} />
                </div>
            )}
        </div>
    )
};