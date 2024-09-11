import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { FaGoogle, FaFacebookF, FaTwitter } from 'react-icons/fa'; // Import icons

const LoginPage = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', { username, password });
      setUser(response.data); // Update user state with full user data
      navigate('/dashboard'); // Redirect to dashboard
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
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
      <form onSubmit={handleSubmit} className="login-form">
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
        <div className="checkbox-group">
          {" "}
          {/* Apply the checkbox-group class here */}
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember Me</label>
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <a href="/forgot-password" className="forgot-password">
        Forgot Password?
      </a>
      <div className="register-link">
        <p>Don't have an account?</p>
        <a href="/register">Create an account</a>
      </div>
    </div>
  );
};

export default LoginPage;
