// src/pages/Checkout.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';
import axios from 'axios';

const Checkout = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  
  const [deliveryOption, setDeliveryOption] = useState('Home Delivery');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [paymentOption, setPaymentOption] = useState('Credit Card');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderError, setOrderError] = useState('');

  // Fetch user session
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/auth/check-session', { withCredentials: true });
        if (response.status === 200) {
          setUser(response.data);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error("Session check failed:", error);
        navigate('/login');
      }
    };

    checkSession();
  }, [navigate]);

  // Fetch cart items
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/cart', { withCredentials: true });
        if (response.status === 200) {
          setCartItems(response.data);
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, []);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setOrderError('');
    
    // Validate form
    if (deliveryOption === 'Home Delivery') {
      const { street, city, state, zipCode } = address;
      if (!street || !city || !state || !zipCode) {
        setOrderError('Please fill in all address fields for Home Delivery.');
        setIsSubmitting(false);
        return;
      }
    }

    try {
      const params = {
        deliveryOption,
        paymentOption,
      };
      
      if (deliveryOption === 'Home Delivery') {
        params.street = address.street;
        params.city = address.city;
        params.state = address.state;
        params.zipCode = address.zipCode;
      }

      const response = await axios.post('http://localhost:8080/api/orders/create', null, {
        params,
        withCredentials: true,
      });

      if (response.status === 200) {
        const orderId = response.data.id;
        navigate(`/order-status/${orderId}`);
      } else {
        setOrderError('Failed to place the order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      setOrderError('An error occurred while placing the order.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderError.includes('Empty')) { // Optionally handle empty cart
    return (
      <div className="checkout-container">
        <h2>Checkout</h2>
        <p>Your cart is empty. Please add items to your cart before proceeding to checkout.</p>
        <button onClick={() => navigate('/cart')} className="back-to-cart-btn">Back to Cart</button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-content">
        <div className="order-summary">
          <h3>Order Summary</h3>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul>
              {cartItems.map(item => {
                const product = item.product || item.customProduct;
                return (
                  <li key={item.id} className="order-item">
                    <div className="item-details">
                      <span className="item-name">{product.name}</span>
                      <span className="item-quantity">x {item.quantity}</span>
                    </div>
                    <div className="item-price">
                      ₹{(product.price * item.quantity).toFixed(2)}
                    </div>
                    <div className="item-info">
                      {product.processor && <p>Processor: {product.processor}</p>}
                      {product.ram && <p>RAM: {product.ram}</p>}
                      {product.graphicsCard && <p>Graphics Card: {product.graphicsCard}</p>}
                      {product.storage && <p>Storage: {product.storage}</p>}
                      {product.cabinet && <p>Cabinet: {product.cabinet}</p>}
                      {product.caseFan && <p>Case Fan: {product.caseFan}</p>}
                      {product.cpuCooler && <p>CPU Cooler: {product.cpuCooler}</p>}
                      {product.hdd && <p>HDD: {product.hdd}</p>}
                      {product.modCable && <p>Mod Cable: {product.modCable}</p>}
                      {product.motherboard && <p>Motherboard: {product.motherboard}</p>}
                      {product.powerSupply && <p>Power Supply: {product.powerSupply}</p>}
                      {product.ssd && <p>SSD: {product.ssd}</p>}
                      {/* Add more product-specific details as needed */}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          <div className="total-price">
            <span>Total:</span>
            <span>₹{cartItems.reduce((total, item) => {
              const product = item.product || item.customProduct;
              return total + (product.price * item.quantity);
            }, 0).toFixed(2)}</span>
          </div>
        </div>

        <form className="checkout-form" onSubmit={handleSubmit}>
          <h3>Delivery Options</h3>
          <div className="form-group delivery-options">
            <label className="radio-label">
              <input
                type="radio"
                value="Home Delivery"
                checked={deliveryOption === 'Home Delivery'}
                onChange={(e) => setDeliveryOption(e.target.value)}
              />
              Home Delivery
            </label>
            <label className="radio-label">
              <input
                type="radio"
                value="Store Pickup"
                checked={deliveryOption === 'Store Pickup'}
                onChange={(e) => setDeliveryOption(e.target.value)}
              />
              Store Pickup
            </label>
          </div>

          {deliveryOption === 'Home Delivery' && (
            <div className="address-fields">
              <div className="form-group">
                <label htmlFor="street">Street:</label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={address.street}
                  onChange={handleAddressChange}
                  required
                  placeholder="123 Main St"
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">City:</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={address.city}
                  onChange={handleAddressChange}
                  required
                  placeholder="Mumbai"
                />
              </div>
              <div className="form-group">
                <label htmlFor="state">State:</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={address.state}
                  onChange={handleAddressChange}
                  required
                  placeholder="Maharashtra"
                />
              </div>
              <div className="form-group">
                <label htmlFor="zipCode">Zip Code:</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={address.zipCode}
                  onChange={handleAddressChange}
                  required
                  placeholder="400001"
                />
              </div>
            </div>
          )}

          <h3>Payment Options</h3>
          <div className="form-group">
            <select
              value={paymentOption}
              onChange={(e) => setPaymentOption(e.target.value)}
              required
            >
              <option value="Credit Card">Credit Card</option>
              <option value="PayPal">PayPal</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
            </select>
          </div>

          {orderError && <p className="error-message">{orderError}</p>}

          <button type="submit" className="place-order-btn" disabled={isSubmitting || cartItems.length === 0}>
            {isSubmitting ? 'Placing Order...' : 'Place Order'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;