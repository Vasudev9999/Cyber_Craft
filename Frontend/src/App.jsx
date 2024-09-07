import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import ModalComponent from './components/Modal';
import Navbar from './components/Navigation/Navbar';
import Footer from './components/Footer/Footer'; // Import Footer here
import './App.css';
import axios from 'axios';
axios.defaults.withCredentials = true;

const App = () => {
  const [user, setUser] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/auth/check-session');
        setUser(response.data); // Set user if session exists
      } catch (error) {
        setUser(null); // No user session
      }
    };
    checkSession();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/api/auth/logout'); // Logout endpoint
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
    setModalIsOpen(false); // Close modal on logout
  };

  const openModal = (type) => {
    setModalType(type);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <Router>
      <div className="app-container">
        {/* Pass openModal, isLoggedIn, and handleLogout to Navbar */}
        <Navbar 
          openModal={openModal} 
          isLoggedIn={!!user} 
          handleLogout={handleLogout} 
        />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                username={user?.username}
                openModal={openModal}
                handleLogout={handleLogout}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ModalComponent
          isOpen={modalIsOpen}
          onClose={closeModal}
          type={modalType}
          setUser={setUser} // Pass setUser to update user state on login/register
        />
        <Footer /> {/* Add Footer here */}
      </div>
    </Router>
  );
};

export default App;
