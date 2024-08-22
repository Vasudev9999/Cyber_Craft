import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import ModalComponent from './components/Modal';
import './App.css';
import axios from 'axios';

const App = () => {
  const [user, setUser] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Check session status when component mounts
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
      <div>
        <nav>
          <Link to="/">Home</Link>
          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => openModal('login')}>Login</button>
              <button onClick={() => openModal('register')}>Register</button>
            </>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route
            path="/dashboard"
            element={<Dashboard username={user} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ModalComponent
          isOpen={modalIsOpen}
          onClose={closeModal}
          type={modalType}
          setUser={setUser} // Pass setUser to update user state on login/register
        />
      </div>
    </Router>
  );
};

export default App;
