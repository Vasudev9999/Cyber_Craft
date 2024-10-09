import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard'; // Ensure this path is correct
import NotFound from './pages/NotFound'; // Ensure this path is correct
import LoginPage from './components/Login'; // Ensure this path is correct
import RegisterPage from './components/Register'; // Ensure this path is correct
import Navbar from './components/Navigation/Navbar'; // Ensure this path is correct
import Footer from './components/Footer/Footer'; // Ensure this path is correct
import AddProduct from './pages/AddProduct'; // Ensure this path is correct
import PrebuildPC from './pages/PrebuildPC'; // Ensure this path is correct
import CustomPC from './pages/CustomPC'; // Ensure this path is correct
import CustomPCPage from './pages/CustomPCPage'; // Ensure this path is correct
import './App.css';
import axios from 'axios';
axios.defaults.withCredentials = true;

const App = () => {
  const [user, setUser] = useState(null);

  // Check if a session exists on component mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:8080/api/auth/check-session', {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (response.data) {
            setUser({ username: response.data });
          } else {
            setUser(null);
            sessionStorage.removeItem('username');
            sessionStorage.removeItem('token');
          }
        }
      } catch (error) {
        setUser(null);
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('token');
      }
    };
    checkSession();
  }, []);

  // Handle user logout
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/api/auth/logout'); // Logout endpoint
      setUser(null);
      sessionStorage.removeItem('username'); // Remove username from sessionStorage
      sessionStorage.removeItem('token'); // Remove token from sessionStorage
      window.location.reload();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Router>
      <div className="app-container">
        {/* Pass user and handleLogout to Navbar */}
        <Navbar user={user} handleLogout={handleLogout} />

        <Routes>
          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard username={user?.username} />} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/register" element={<RegisterPage setUser={setUser} />} />
          <Route path="/prebuild-pc" element={<PrebuildPC />} />
          <Route path="/custom" element={<CustomPC />} />
          <Route path="/custom-pc-page" element={<CustomPCPage />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;