// src/pages/Checkout.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = ({ user }) => {
  const [deliveryOption, setDeliveryOption] = useState('Store Delivery');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [paymentOption, setPaymentOption] = useState('Credit Card');
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  const fetchCart = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/cart', { withCredentials: true });
      if (response.status === 200 && Array.isArray(response.data)) {
        setCartItems(response.data);
      } else {
        setError('Failed to load cart items.');
      }
    } catch (err) {
      console.error('Error fetching cart:', err);
      setError('Error fetching cart items.');
    }
  };

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleProceed = async () => {
    const { street, city, state, zipCode } = address;
    if (deliveryOption === 'Home Delivery' && (!street || !city || !state || !zipCode)) {
      setError('All address fields are required for Home Delivery.');
      return;
    }
    try {
      const params = {
        deliveryOption,
        paymentOption,
      };
      if (deliveryOption === 'Home Delivery') {
        params.street = street;
        params.city = city;
        params.state = state;
        params.zipCode = zipCode;
      }
      const response = await axios.post('http://localhost:8080/api/orders/create', null, {
        params,
        withCredentials: true,
      });
      navigate(`/order-status/${response.data.id}`);
    } catch (error) {
      console.error('Error creating order:', error);
      setError('Failed to create order. Please try again.');
    }
  };

  const totalAmount = cartItems.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  return (
    <div className="checkout-container">
      <button onClick={() => navigate(-1)} className="back-button">Back</button>
      <h2 className="checkout-title">Checkout</h2>

      <section className="order-details">
        <h3>Order Details</h3>
        <div className="products-list">
          {cartItems.map(item => (
            <div key={item.id} className="product-item">
              <img src={item.product.imageUrl || '/default-image.png'} alt={item.product.name || 'Product'} className="product-image" />
              <div className="product-info">
                <p>{item.product.name || 'Unnamed Product'}</p>
                <p>Price: ₹{item.product.price.toFixed(2)}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="total-amount">Total: ₹{totalAmount.toFixed(2)}</p>
      </section>

      <section className="delivery-options">
        <h3>Delivery Options</h3>
        <label className="radio-label">
          <input
            type="radio"
            value="Store Delivery"
            checked={deliveryOption === 'Store Delivery'}
            onChange={(e) => setDeliveryOption(e.target.value)}
          />
          Store Delivery (Free)
        </label>
        <label className="radio-label">
          <input
            type="radio"
            value="Home Delivery"
            checked={deliveryOption === 'Home Delivery'}
            onChange={(e) => setDeliveryOption(e.target.value)}
          />
          Home Delivery (Free)
        </label>
        {deliveryOption === 'Home Delivery' && (
          <div className="address-field">
            <label htmlFor="street">Street:</label>
            <input
              id="street"
              name="street"
              type="text"
              value={address.street}
              onChange={handleAddressChange}
              required
            />
            <label htmlFor="city">City:</label>
            <input
              id="city"
              name="city"
              type="text"
              value={address.city}
              onChange={handleAddressChange}
              required
            />
            <label htmlFor="state">State:</label>
            <input
              id="state"
              name="state"
              type="text"
              value={address.state}
              onChange={handleAddressChange}
              required
            />
            <label htmlFor="zipCode">Zip Code:</label>
            <input
              id="zipCode"
              name="zipCode"
              type="text"
              value={address.zipCode}
              onChange={handleAddressChange}
              required
            />
          </div>
        )}
      </section>

      <section className="payment-options">
        <h3>Payment Options</h3>
        <select value={paymentOption} onChange={(e) => setPaymentOption(e.target.value)}>
          <option value="Credit Card">Credit Card</option>
          <option value="PayPal">PayPal</option>
          <option value="Cash on Delivery">Cash on Delivery</option>
        </select>
      </section>

      {error && <div className="error-message">{error}</div>}

      <button onClick={handleProceed} className="next-button">Next</button>
    </div>
  );
};

export default Checkout;