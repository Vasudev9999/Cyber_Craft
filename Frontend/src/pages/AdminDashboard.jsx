import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [profit, setProfit] = useState({ monthly: 0, yearly: 0, allTime: 0 });
  const [statistics, setStatistics] = useState({ sales: 0, customers: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersResponse = await axios.get('http://localhost:8080/api/orders');
        setOrders(ordersResponse.data);

        const profitResponse = await axios.get('http://localhost:8080/api/admin/profit');
        setProfit(profitResponse.data);

        const statsResponse = await axios.get('http://localhost:8080/api/admin/statistics');
        setStatistics(statsResponse.data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-cards">
        <div className="card">
          <h2>Orders</h2>
          <p>Total Orders: {orders.length}</p>
        </div>
        <div className="card">
          <h2>Profit</h2>
          <p>Monthly: ${profit.monthly}</p>
          <p>Yearly: ${profit.yearly}</p>
          <p>All Time: ${profit.allTime}</p>
        </div>
        <div className="card">
          <h2>Sales</h2>
          <p>Total Sales: ${statistics.sales}</p>
        </div>
        <div className="card">
          <h2>Customers</h2>
          <p>Total Customers: {statistics.customers}</p>
        </div>
      </div>
      <div className="orders-section">
        <h2>Recent Orders</h2>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Total</th>
              <th>Status</th>
              <th>Ordered At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.user.username}</td>
                <td>${order.orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}</td>
                <td>{order.paymentStatus}</td>
                <td>{new Date(order.orderedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;