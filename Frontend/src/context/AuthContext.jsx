// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the AuthContext with default values
export const AuthContext = createContext({
  user: null,
  setUser: () => {},
});

// AuthProvider component to wrap around the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Optionally, check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/auth/check-session', {
          withCredentials: true,
        });
        if (response.data) {
          setUser({
            userId: response.data.userId,
            username: response.data.username,
            isAdmin: response.data.isAdmin,
            cartItemCount: response.data.cartItemCount,
          });
        }
      } catch (error) {
        console.error('Session check failed:', error);
      }
    };

    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};