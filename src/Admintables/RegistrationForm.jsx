import axios from "axios";
import React, { useState } from "react";
import '../Stylesheets/RegistrationForm.css'

export const RegistrationForm = ({newrole}) => {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords don't match!");
            return;
        }

        try {
            const res = await axios.post(
                'https://farmart-y80m.onrender.com/api/farmers/adminregister',
                {
                    email: formData.email,
                    username: formData.username,
                    phone: formData.phone,
                    password: formData.password,
                    role:newrole
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('Registration successful:', res.data);
            

        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
            console.error('Registration error:', err);
        }
    };

    return (
        <div>
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="phone">Phone Number</label>
                <input
                    type="tel"
                    name="phone"
                    placeholder="0712345678"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="********"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength="6"
                />

                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="********"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Register</button>
            </form>
        </div>
    );
};