// ✅ This context now manages login/signup, token storage, user role, and redirect logic
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginService, registerService } from '../services/authService';
import { isTokenExpired } from '../utils/jwt';
import { getUserRole } from '../utils/decodeToken';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');

    const logout = () => {
      localStorage.removeItem('user');
      setUser(null);
      setRole(null);
      navigate('/Signin');
    };

    if (stored) {
      const parsed = JSON.parse(stored);
      if (!isTokenExpired(parsed.token)) {
        setUser(parsed);
        setRole(getUserRole());
      } else {
        logout();
      }
    }
  }, [navigate]); // ✅ only depends on navigate

  const login = async (formData) => {
    const data = await loginService(formData);
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
    setRole(getUserRole());
    navigate('/');
  };

  const register = async (formData) => {
    const data = await registerService(formData);
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
    setRole(getUserRole());
    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setRole(null);
    navigate('/Signin');
  };

  return (
    <AuthContext.Provider value={{ user, role, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// ✅ This context now manages login/signup, token storage, user role, and redirect logic








//  Manages login/signup, token storage, user role, and redirect logic

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { loginService, registerService } from '../services/authService';
// import { getUserRole, isTokenExpired } from '../utils/jwt';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [role, setRole] = useState(null);

//   useEffect(() => {
//     const stored = localStorage.getItem('user');
//     if (stored) {
//       const parsed = JSON.parse(stored);
//       if (!isTokenExpired(parsed.token)) {
//         setUser(parsed);
//         setRole(getUserRole());
//       } else {
//         logout();
//       }
//     }
//   }, []);

//   const login = async (formData) => {
//     const data = await loginService(formData);
//     localStorage.setItem('user', JSON.stringify(data));
//     setUser(data);
//     setRole(getUserRole());
//     navigate('/');
//   };

//   const register = async (formData) => {
//     const data = await registerService(formData);
//     localStorage.setItem('user', JSON.stringify(data));
//     setUser(data);
//     setRole(getUserRole());
//     navigate('/');
//   };

//   const logout = () => {
//     localStorage.removeItem('user');
//     setUser(null);
//     setRole(null);
//     navigate('/Signin');
//   };

//   return (
//     <AuthContext.Provider value={{ user, role, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);