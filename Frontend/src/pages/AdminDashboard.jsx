// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/admin/orders', {
        withCredentials: true
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:8080/api/admin/orders/${orderId}/status`, 
        { status: newStatus },
        { withCredentials: true }
      );
      fetchOrders();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleComplete = async (orderId, completed) => {
    try {
      await axios.put(`http://localhost:8080/api/admin/orders/${orderId}/complete`,
        { completed: !completed },
        { withCredentials: true }
      );
      fetchOrders();
    } catch (error) {
      console.error('Error updating completion:', error);
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Order Management Dashboard
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Delivery Method</TableCell>
              <TableCell>Payment Status</TableCell>
              <TableCell>Order Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.user?.username}</TableCell>
                <TableCell>{order.deliveryOption}</TableCell>
                <TableCell>{order.paymentStatus}</TableCell>
                <TableCell>
                  <FormControl size="small">
                    <Select
                      value={order.deliveryStatus}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    >
                      <MenuItem value="Processing">Processing</MenuItem>
                      <MenuItem value="Shipped">Shipped</MenuItem>
                      <MenuItem value="Delivered">Delivered</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color={order.completed ? "error" : "success"}
                    onClick={() => handleComplete(order.id, order.completed)}
                  >
                    {order.completed ? "Mark Incomplete" : "Mark Complete"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminDashboard;