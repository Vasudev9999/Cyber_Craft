// src/pages/OrderStatus.jsx (Final Component with Proper Order Information)
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import './OrderStatus.css';

const OrderStatus = ({ user }) => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchOrder();
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/orders/${orderId}`, { withCredentials: true });
      setOrder(response.data);
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  };

  const handlePayment = async () => {
    try {
      await axios.post('http://localhost:8080/api/orders/update-payment', null, {
        params: { orderId, status: 'Completed' },
        withCredentials: true,
      });
      fetchOrder();
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      await axios.post('http://localhost:8080/api/orders/place-order', null, {
        params: { orderId },
        withCredentials: true,
      });
      fetchOrder();
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const handleBackButton = () => {
    navigate(-1);
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
      doc.text(`${index + 1}. ${item.product.name} - ₹${item.price.toFixed(2)} x ${item.quantity}`, 14, y);
    });

    doc.text(`Total Paid: ₹${order.orderItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}`, 14, 90 + order.orderItems.length * 10);
    doc.text(`Payment Status: ${order.paymentStatus}`, 14, 100 + order.orderItems.length * 10);
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    doc.text(`Delivery By: ${deliveryDate.toDateString()}`, 14, 110 + order.orderItems.length * 10);

    doc.save(`Invoice_Order_${order.id}.pdf`);
  };

  if (!order) return <p>Loading...</p>;

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);

  const totalAmount = order.orderItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="order-status">
      <button onClick={handleBackButton} className="back-button">Back</button>
      <h2>Order Status</h2>
      
      <section>
        <h3>Order Information</h3>
        <p>Order ID: {order.id}</p>
        <p>Ordered At: {new Date(order.orderedAt).toLocaleString()}</p>
        <p>Delivery Option: {order.deliveryOption}</p>
        <p>Address: {order.address}</p>
      </section>

      <section>
        <h3>Delivery Status</h3>
        <p>{order.deliveryStatus}</p>
      </section>

      <section>
        <h3>Payment Status</h3>
        <p>{order.paymentStatus}</p>
      </section>

      {order.paymentOption !== 'Cash on Delivery' && order.paymentStatus !== 'Completed' && (
        <button onClick={handlePayment} className="payment-button">Make Payment</button>
      )}

      {order.paymentStatus === 'Completed' && (
        <div className="invoice">
          <h3>Invoice</h3>
          <p>Order ID: {order.id}</p>
          <p>Ordered At: {new Date(order.orderedAt).toLocaleString()}</p>
          <div className="invoice-products">
            {order.orderItems.map(item => (
              <div key={item.id} className="invoice-item">
                <img src={item.product.imageUrl} alt={item.product.name} className="invoice-image" />
                <div className="invoice-info">
                  <p>{item.product.name}</p>
                  <p>Price: ₹{item.price.toFixed(2)}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="invoice-total">Total Paid: ₹{totalAmount.toFixed(2)}</p>
          <p>Payment Status: {order.paymentStatus}</p>
          <p>You will receive your delivery by {deliveryDate.toDateString()}.</p>
          <button onClick={generatePDF} className="download-button">Download Invoice</button>
        </div>
      )}

      {order.paymentOption === 'Cash on Delivery' && order.paymentStatus === 'Pending' && (
        <button onClick={handlePlaceOrder} className="place-order-button">
          Place Order
        </button>
      )}
    </div>
  );
};

export default OrderStatus;