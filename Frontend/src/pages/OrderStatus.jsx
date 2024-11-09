// src/pages/OrderStatus.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import './OrderStatus.css';

const OrderStatus = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkSessionAndFetchOrder = async () => {
      try {
        const sessionResponse = await axios.get('http://localhost:8080/api/auth/check-session', { withCredentials: true });
        if (sessionResponse.status === 200) {
          setUser(sessionResponse.data);
          fetchOrder(orderId);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error("Session check failed:", error);
        navigate('/login');
      }
    };

    checkSessionAndFetchOrder();
  }, [navigate, orderId]);

  const fetchOrder = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/orders/${id}`, { withCredentials: true });
      if (response.status === 200) {
        setOrder(response.data);
      } else {
        console.error('Failed to fetch order details:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  };

  const handlePayment = async () => {
    try {
      await axios.post('http://localhost:8080/api/orders/update-payment', null, {
        params: { orderId: order.id, status: 'Completed' },
        withCredentials: true,
      });
      fetchOrder(order.id);
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      await axios.post('http://localhost:8080/api/orders/place-order', null, {
        params: { orderId: order.id },
        withCredentials: true,
      });
      fetchOrder(order.id);
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const handleBackButton = () => {
    navigate(-1);
  };

  const handleDashboardButton = () => {
    navigate('/dashboard');
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text('Invoice', 105, 20, null, null, 'center');

    doc.setFontSize(12);
    doc.text(`Order ID: ${order.id}`, 14, 30);
    doc.text(`Ordered At: ${new Date(order.orderedAt).toLocaleString()}`, 14, 40);
    doc.text(`Delivery Option: ${order.deliveryOption}`, 14, 50);
    doc.text(`Address: ${order.address}`, 14, 60);

    doc.text('Products:', 14, 70);
    order.orderItems.forEach((item, index) => {
      const y = 80 + index * 10;
      const productName = item.product ? item.product.name : item.customProduct.name;
      doc.text(`${index + 1}. ${productName} - ₹${item.price.toFixed(2)} x ${item.quantity}`, 14, y);
    });

    const totalAmount = order.orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
    doc.text(`Total Paid: ₹${totalAmount.toFixed(2)}`, 14, 90 + order.orderItems.length * 10);
    doc.text(`Payment Status: ${order.paymentStatus}`, 14, 100 + order.orderItems.length * 10);
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    doc.text(`Delivery By: ${deliveryDate.toDateString()}`, 14, 110 + order.orderItems.length * 10);

    doc.save(`Invoice_Order_${order.id}.pdf`);
  };

  if (!order) return <p className="order-status-loading">Loading...</p>;

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);

  const totalAmount = order.orderItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className="order-status-container">
      {order.paymentStatus === 'Completed' ? (
        <button onClick={handleDashboardButton} className="order-status-dashboard-button">Go to Dashboard</button>
      ) : (
        <button onClick={handleBackButton} className="order-status-back-button">Back</button>
      )}
      <h2 className="order-status-title">Order Status</h2>
      
      <section className="order-status-section">
        <h3>Order Information</h3>
        <p>Order ID: {order.id}</p>
        <p>Ordered At: {new Date(order.orderedAt).toLocaleString()}</p>
        <p>Delivery Option: {order.deliveryOption}</p>
        <p>Address: {order.address}</p>
      </section>

      <section className="order-status-section">
        <h3>Delivery Status</h3>
        <p>{order.deliveryStatus}</p>
      </section>

      <section className="order-status-section">
        <h3>Payment Status</h3>
        <p>{order.paymentStatus}</p>
      </section>

      {order.paymentOption !== 'Cash on Delivery' && order.paymentStatus !== 'Completed' && (
        <button onClick={handlePayment} className="order-status-action-button">Make Payment</button>
      )}

      {order.paymentStatus === 'Completed' && (
        <div className="order-status-invoice">
          <h3>Invoice</h3>
          <p>Order ID: {order.id}</p>
          <p>Ordered At: {new Date(order.orderedAt).toLocaleString()}</p>
          <div className="order-status-invoice-products">
            {order.orderItems.map(item => (
              <div key={item.id} className="order-status-invoice-item">
                <div className="order-status-invoice-info">
                  <p>{item.product ? item.product.name : item.customProduct.name}</p>
                  <p>Price: ₹{item.price.toFixed(2)}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="order-status-invoice-total">Total Paid: ₹{totalAmount.toFixed(2)}</p>
          <p>Payment Status: {order.paymentStatus}</p>
          <p>You will receive your delivery by {deliveryDate.toDateString()}.</p>
          <button onClick={generatePDF} className="order-status-download-button">Download Invoice</button>
        </div>
      )}

      {order.paymentOption === 'Cash on Delivery' && order.paymentStatus === 'Pending' && (
        <button onClick={handlePlaceOrder} className="order-status-action-button">
          Place Order
        </button>
      )}
    </div>
  );
};

export default OrderStatus;