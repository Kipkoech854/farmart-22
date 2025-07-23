import { API_URL } from "../config";

// Sends a POST request to /auth/login with JSON data
const login = async (credentials) => {
    const response = await fetch("http://localhost:5555/auth/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
    }

    return await response.json();
};

// Sends a POST request to /auth/register with new user data
const register = async (userData) => {
    const response = await fetch("http://localhost:5555/auth/register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
    }

    return await response.json();
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
