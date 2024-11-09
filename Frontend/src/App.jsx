// src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';

// Layout Components
import Navbar from './components/Navigation/Navbar';
import Footer from './components/Footer/Footer';

// Page Components
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminOrdersPage from './pages/AdminOrdersPage';
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

// Auth Context
import { AuthProvider, AuthContext } from './context/AuthContext';

import './App.css';

// Axios Configuration
axios.defaults.withCredentials = true;

const AppRoutes = () => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      {/* Home and Authentication */}
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard username={user?.username} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

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
      <Route
        path="/admin/dashboard"
        element={
          user && user.isAdmin ? <AdminDashboard /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/admin/orders"
        element={
          user && user.isAdmin ? <AdminOrdersPage /> : <Navigate to="/login" />
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <AppRoutes />
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;