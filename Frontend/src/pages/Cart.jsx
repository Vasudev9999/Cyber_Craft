// Cart.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css';
import { useNavigate } from 'react-router-dom';

const Cart = ({ user }) => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const imagePath = '/src/assets/product-images/';

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      navigate('/login');
    }
  }, [user]);

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

  const removeFromCart = async (itemId) => {
    try {
      await axios.post('http://localhost:8080/api/cart/remove', null, {
        params: { itemId },
        withCredentials: true,
      });
      // Remove the item from the local state
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart">
        <h2>Your Cart</h2>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img
              src={`${imagePath}${item.product.imageUrl}`}
              alt={item.product.name}
              className="cart-item-image"
            />
            <div className="cart-item-details">
              <h3>{item.product.name}</h3>
              <p>Price: ₹{item.product.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <h3 className="cart-total">Total Price: ₹{totalPrice}</h3>
      <button className="checkout-button">Proceed to Checkout</button>
    </div>
  );
};

export default Cart;