// src/pages/AdminDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css'; // Import the CSS file

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Dashboard</h1>
      <ul>
        <li>
          <Link to="/admin/orders">View All Orders</Link>
        </li>
        {/* Add more dashboard links here */}
      </ul>
    </div>
  );
};

export default AdminDashboard;