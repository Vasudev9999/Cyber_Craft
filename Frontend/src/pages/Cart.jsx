import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

const Cart = ({ user }) => {
  const [cartItems, setCartItems] = useState([]);
  const [removingItem, setRemovingItem] = useState(null);
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
    setRemovingItem(itemId);
    try {
      await axios.post('http://localhost:8080/api/cart/remove', null, {
        params: { itemId },
        withCredentials: true,
      });
      setTimeout(() => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
        setRemovingItem(null);
      }, 300);
    } catch (error) {
      console.error('Error removing item from cart:', error);
      setRemovingItem(null);
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
          <div
            key={item.id}
            className={classNames("cart-item", { "swipe-out": removingItem === item.id })}
          >
            <img
              src={`${imagePath}${item.product.imageUrl}`}
              alt={item.product.name}
              className="cart-item-image"
            />
            <div className="cart-item-details">
              <h3>{item.product.name}</h3>
              <p>Price: ₹{item.product.price}</p>
            </div>
            <button onClick={() => removeFromCart(item.id)} className="remove-button">
              Remove
            </button>
          </div>
        ))}
      </div>
      <h3 className="cart-total">Total Price: ₹{totalPrice}</h3>
      <button className="checkout-button">Proceed to Checkout</button>
    </div>
  );
};

export default Cart;
