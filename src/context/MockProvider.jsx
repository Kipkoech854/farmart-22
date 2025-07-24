import { createContext, useContext, useState } from 'react';

// 1. Create the context
const AuthContext = createContext();

// 2. Create the provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
  id: "123",
  name: "Gideon Kipkoech",
  email: "gideon@example.com",
  role: "farmer"
});
 // null means no user logged in

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Create a hook to use the context
export const useAuth = () => {
  return useContext(AuthContext);
};
