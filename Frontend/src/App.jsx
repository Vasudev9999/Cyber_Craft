import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import LoginPage from './components/Login'; // Import the new LoginPage component
import RegisterPage from './components/Register'; // Import the new RegisterPage component
import Navbar from './components/Navigation/Navbar';
import Footer from './components/Footer/Footer';
import PrebuildPC from './pages/PrebuildPC .jsx';
import './App.css';
import axios from 'axios';
axios.defaults.withCredentials = true;

const App = () => {
  const [user, setUser] = useState(null);

  // Check if a session exists on component mount
  useEffect(() => {
    const checkSession = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/auth/check-session');
            if (response.data) {
                setUser({ username: response.data }); // Adjusting to set user object correctly
            } else {
                setUser(null); // No user session
            }
        } catch (error) {
            setUser(null); // No user session
        }
    };
    checkSession();
}, []);


  // Handle user logout
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/api/auth/logout'); // Logout endpoint
      setUser(null);
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
          <Route
            path="/dashboard"
            element={<Dashboard username={user?.username} />}
          />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/register" element={<RegisterPage setUser={setUser} />} />
          <Route path="/prebuild-pc" element={<PrebuildPC />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
