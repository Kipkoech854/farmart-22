//import { API_URL } from "../config";

// Sends a POST request to /auth/login with JSON data
export const login = async (credentials) => {
    const urls = [
        { url: "https://farmart-y80m.onrender.com/auth/login", role: "user" },
        { url: "https://farmart-y80m.onrender.com/api/farmers/farmers/login", role: "farmer" }
    ];

    for (const { url, role } of urls) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        if (response.ok) {
            const data = await response.json();
            data.role = role;
            return data; // includes token and role
        }
    }

    throw new Error('Login failed for both user and farmer');
};


// Sends a POST request to /auth/register with new user data
const register = async (userData) => {
    const url = userData.role === 'farmer'
        ? "http://localhost:5555/api/farmers/farmers/register"
        : "http://localhost:5555/auth/register";

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
        const error = new Error(data.message || 'Registration failed');
        error.status = response.status;  
        throw error;
    }

    return data;
};


export const authService = {
    login,
    register
};





// const API_URL = 'http://localhost:5555/api/auth';

// export const authService = {
//   // Login user
//   login: async (credentials) => {
//     const res = await fetch(`${API_URL}/login`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(credentials),
//     });

//     if (!res.ok) {
//       throw new Error('Login failed');
//     }

//     const data = await res.json();
//     if (data.token) {
//       localStorage.setItem('user', JSON.stringify(data));
//     }
//     return data;
//   },

//   // Register user
//   register: async (newUser) => {
//     const res = await fetch(`${API_URL}/register`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(newUser),
//     });

//     if (!res.ok) {
//       throw new Error('Registration failed');
//     }

//     const data = await res.json();
//     if (data.token) {
//       localStorage.setItem('user', JSON.stringify(data));
//     }
//     return data;
//   },

//   // Logout user
//   logout: () => {
//     localStorage.removeItem('user');
//   },

//   // Get current user info (from localStorage)
//   getCurrentUser: () => {
//     const user = localStorage.getItem('user');
//     return user ? JSON.parse(user) : null;
//   },

//   // Get just the JWT token
//   getToken: () => {
//     const user = localStorage.getItem('user');
//     return user ? JSON.parse(user).token : null;
//   }
// };
