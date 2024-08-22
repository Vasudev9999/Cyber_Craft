import React, { useState } from 'react';
import axios from 'axios';

function Login({ onClose, setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', { username, password });
      setUser(username); // Update user state on successful login
      onClose(); // Close the modal
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="modal-form">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
