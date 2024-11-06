// src/pages/Invoice.jsx (New Component for Detailed Invoice Download)
import React from 'react';
import jsPDF from 'jspdf';
import './Invoice.css';

const Invoice = ({ order }) => {
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

  if (!order) return null;

  return (
    <div className="invoice-container">
      <h2>Invoice</h2>
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
      <p className="invoice-total">Total Paid: ₹{order.orderItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
      <p>Payment Status: {order.paymentStatus}</p>
      <p>You will receive your delivery by {new Date().setDate(new Date().getDate() + 3).toDateString()}.</p>
      <button onClick={generatePDF} className="download-button">Download Invoice</button>
    </div>
  );
};

export default Invoice;