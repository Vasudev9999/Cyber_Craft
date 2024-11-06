// src/pages/MyOrders.jsx (Final Component with User Prop)
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MyOrders.css';

const MyOrders = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/orders', { withCredentials: true });

          if (Array.isArray(response.data)) {
            setOrders(response.data);
          } else {
            setError('Unexpected response structure.');
          }
        } catch (err) {
          console.error('Error fetching orders:', err);
          setError('Failed to load orders. Please try again later.');
        } finally {
          setLoading(false);
        }
      };

      fetchOrders();
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="my-orders">
        <button onClick={() => navigate(-1)} className="back-button">Back</button>
        <h2>My Orders</h2>
        <p>Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-orders">
        <button onClick={() => navigate(-1)} className="back-button">Back</button>
        <h2>My Orders</h2>
        <p className="error">{error}</p>
      </div>
    );
  }

  return (
    <div className="my-orders">
      <button onClick={() => navigate(-1)} className="back-button">Back</button>
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card" onClick={() => navigate(`/order-status/${order.id}`)}>
              <p>Order ID: {order.id}</p>
              <p>Ordered At: {new Date(order.orderedAt).toLocaleString()}</p>
              <p>Payment Status: {order.paymentStatus}</p>
              <p>Delivery Status: {order.deliveryStatus}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;