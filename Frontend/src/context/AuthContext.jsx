// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the Auth Context
export const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check session on component mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/auth/check-session', { withCredentials: true });
        if (response.data) {
          setUser({
            id: response.data.userId,
            username: response.data.username,
            isAdmin: response.data.isAdmin,
            cartItemCount: response.data.cartItemCount || 0,
          });
        }
      } catch (error) {
        console.error('Session check failed:', error);
        setUser(null);
      }
    };
    checkSession();
  }, []);

  // Logout Handler
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/api/auth/logout', {}, { withCredentials: true });
      setUser(null);
      window.location.reload();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};