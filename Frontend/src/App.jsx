// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import LoginPage from './components/Login';
import RegisterPage from './components/Register';
import Navbar from './components/Navigation/Navbar';
import Footer from './components/Footer/Footer';
import AddProduct from './pages/AddProduct';
import PrebuildPC from './pages/PrebuildPC';
import CustomPC from './pages/CustomPC';
import CustomPCPage from './pages/CustomPCPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import Cart from './pages/Cart';
import './App.css';
import axios from 'axios';
axios.defaults.withCredentials = true;

const App = () => {
  const [user, setUser] = useState(null);

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

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/api/auth/logout');
      setUser(null);
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('token');
      window.location.reload();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar user={user} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard username={user?.username} />} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/register" element={<RegisterPage setUser={setUser} />} />
          <Route path="/prebuild-pc" element={<PrebuildPC />} />
          <Route path="/custom" element={<CustomPC />} />
          <Route path="/custom-pc-page" element={<CustomPCPage />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/product/:productId" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;