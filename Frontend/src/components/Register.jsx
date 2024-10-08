import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';
import { FaGoogle, FaFacebookF, FaTwitter } from 'react-icons/fa';

const RegisterPage = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', { username, password, email });
      if (response.status === 200) {
        setUser(response.data);
        sessionStorage.setItem('username', response.data.username); // Store username in sessionStorage
        sessionStorage.setItem('token', response.data.token); // Store token in sessionStorage
        navigate('/dashboard');
      } else {
        setError('Registration failed');
      }
    } catch (error) {
      setError(error.response?.data || 'Registration failed');
    }
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      <div className="social-login">
        <button className="social-button">
          <FaGoogle size={24} color="#DB4437" /> Google
        </button>
        <button className="social-button">
          <FaFacebookF size={24} color="#4267B2" /> Facebook
        </button>
        <button className="social-button">
          <FaTwitter size={24} color="#1DA1F2" /> Twitter
        </button>
      </div>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <div className="login-link">
        <p>Already have an account?</p>
        <a href="/login">Login</a>
      </div>
    </div>
  );
};

export default RegisterPage;