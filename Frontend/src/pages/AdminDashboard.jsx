// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/orders/admin/all', { withCredentials: true });
        setOrders(response.data);
      } catch (error) {
        setError('You are not authorized to view this page.');
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  const handleOrderStatusChange = async (orderId, status) => {
    try {
      await axios.post(`http://localhost:8080/api/orders/admin/update-status`, null, {
        params: { orderId, status },
        withCredentials: true,
      });
      setOrders(orders.map(order => order.id === orderId ? { ...order, deliveryStatus: status } : order));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Delivery Option</th>
            <th>Address</th>
            <th>Payment Option</th>
            <th>Payment Status</th>
            <th>Delivery Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} className={order.completed ? 'completed' : ''}>
              <td>{order.id}</td>
              <td>{order.user.username}</td>
              <td>{order.deliveryOption}</td>
              <td>{order.address}</td>
              <td>{order.paymentOption}</td>
              <td>{order.paymentStatus}</td>
              <td>{order.deliveryStatus}</td>
              <td>
                {!order.completed && (
                  <>
                    <button
                      className="status-button shipped"
                      onClick={() => handleOrderStatusChange(order.id, 'Shipped')}
                    >
                      Mark as Shipped
                    </button>
                    <button
                      className="status-button delivered"
                      onClick={() => handleOrderStatusChange(order.id, 'Delivered')}
                    >
                      Mark as Delivered
                    </button>
                  </>
                )}
                {order.completed && <span className="done-label">Done</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;