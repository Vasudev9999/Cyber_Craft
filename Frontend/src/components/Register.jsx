import React, { useState } from 'react';
import axios from 'axios';

function Register({ onClose, setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', { username, password, email });
      if (response.status === 200) {
        // Set the user session
        setUser(username); // Assuming username is used to set the user
        setError('Registration successful');
        onClose(); // Close the modal
      } else {
        setError('Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Registration failed');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <button type="submit">Register</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Register;
