// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Login';
import Register from './components/Register';  // Create this component similarly to Login
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';  // Optional: Create a NotFound component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />  {/* Optional: Catch-all route for 404 */}
      </Routes>
    </Router>
  );
};

export default App;
