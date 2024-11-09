// src/pages/AdminOrdersPage.js
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './AdminOrdersPage.css';
import { AuthContext } from '../context/AuthContext';

const AdminOrdersPage = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line
  }, [user]);

  const fetchOrders = async () => {
    if (!user || !user.isAdmin) {
      alert('Access denied. Admins only.');
      return;
    }

    try {
      const response = await axios.get('http://localhost:8080/api/orders/admin/all', { withCredentials: true });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      alert('Failed to fetch orders. Please ensure you are logged in as admin.');
    }
  };

  const markAsDone = async (orderId) => {
    try {
      await axios.post(`http://localhost:8080/api/orders/admin/complete/${orderId}`, {}, { withCredentials: true });
      fetchOrders(); // Refresh the orders list
    } catch (error) {
      console.error('Error marking order as done:', error);
      alert('Failed to mark order as done.');
    }
  };

  return (
    <div className="admin-orders-page">
      <h1>All Orders</h1>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Delivery Option</th>
            <th>Address</th>
            <th>Payment Option</th>
            <th>Payment Status</th>
            <th>Delivery Status</th>
            <th>Ordered At</th>
            <th>Completed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="10">No orders found.</td>
            </tr>
          ) : (
            orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.user?.id}</td>
                <td>{order.deliveryOption}</td>
                <td>{order.address}</td>
                <td>{order.paymentOption}</td>
                <td>{order.paymentStatus}</td>
                <td>{order.deliveryStatus}</td>
                <td>{new Date(order.orderedAt).toLocaleString()}</td>
                <td>{order.completed ? 'Yes' : 'No'}</td>
                <td>
                  {!order.completed && (
                    <button className="done-button" onClick={() => markAsDone(order.id)}>Done</button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrdersPage;