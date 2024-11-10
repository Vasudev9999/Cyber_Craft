// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';

// Layout Components
import Navbar from './components/Navigation/Navbar';
import Footer from './components/Footer/Footer';

// Page Components
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import LoginPage from './components/Login';
import RegisterPage from './components/Register';
import AddProduct from './pages/AddProduct';
import PrebuildPC from './pages/PrebuildPC';
import CustomPC from './pages/CustomPC';
import CustomPCPage from './pages/CustomPCPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderStatus from './pages/OrderStatus';
import MyOrders from './pages/MyOrders';
import AdminDashboard from './pages/AdminDashboard'; // Import AdminDashboard

import './App.css';

const App = () => {
  const [user, setUser] = useState(null);

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
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      }
    };
    checkSession();
  }, []);

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
    <Router>
      <div className="app-container">
        <Navbar user={user} handleLogout={handleLogout} />
        <Routes>
          {/* Home and Authentication */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard username={user?.username} />} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/register" element={<RegisterPage setUser={setUser} />} />

          {/* Product Pages */}
          <Route path="/prebuild-pc" element={<PrebuildPC user={user} />} />
          <Route path="/custom" element={<CustomPC />} />
          <Route path="/custom-pc-page" element={<CustomPCPage />} />
          <Route path="/add-product" element={<AddProduct user={user} />} />
          <Route path="/product/:productId" element={<ProductDetailsPage user={user} />} />

          {/* Shopping Flow */}
          <Route path="/cart" element={<Cart user={user} />} />
          <Route path="/checkout" element={<Checkout user={user} />} />
          <Route path="/my-orders" element={<MyOrders user={user} />} />
          <Route path="/order-status/:orderId" element={<OrderStatus user={user} />} />

          {/* Admin Dashboard */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

// ProtectedRoute Component removed since no admin check is required

export default App;