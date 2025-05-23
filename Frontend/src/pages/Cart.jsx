// src/pages/Cart.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import fileImage from '../assets/file.png'; // Import fallback image

const Cart = ({ user }) => {
  const [cartItems, setCartItems] = useState([]);
  const [removingItem, setRemovingItem] = useState(null);
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

  const totalPrice = cartItems.reduce((total, item) => {
    const product = item.product || item.customProduct;
    return total + product.price * item.quantity;
  }, 0);

  const proceedToCheckout = () => {
    navigate('/checkout');
  };

  const renderProductImage = (item) => {
    const product = item.product || item.customProduct;
    if (product.imageUrl) {
      if (item.customProduct) {
        // For custom products
        return product.imageUrl.startsWith('/') ? product.imageUrl : `/${product.imageUrl}`;
      } else {
        // For standard products
        return `/src/assets/product-images/${product.imageUrl}`;
      }
    } else {
      return fileImage; // Fallback image
    }
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => {
            const product = item.product || item.customProduct;
            return (
              <div
                key={item.id}
                className={classNames('cart-item', { 'swipe-out': removingItem === item.id })}
              >
                <img
                  src={renderProductImage(item)}
                  alt={product.name}
                  className="cart-item-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = fileImage;
                  }}
                />
                <div className="cart-item-details">
                  <h3>{product.name}</h3>
                  <p>Price: ₹{product.price.toFixed(2)}</p>
                  <p>Quantity: {item.quantity}</p>
                  {product.processor && <p>Processor: {product.processor}</p>}
                  {product.ram && <p>RAM: {product.ram}</p>}
                  {product.graphicsCard && <p>Graphics Card: {product.graphicsCard}</p>}
                  {product.storage && <p>Storage: {product.storage}</p>}
                  {product.cabinet && <p>Cabinet: {product.cabinet}</p>}
                  {product.casefan && <p>Case Fan: {product.casefan}</p>}
                  {product.cpucooler && <p>CPU Cooler: {product.cpucooler}</p>}
                  {product.hdd && <p>HDD: {product.hdd}</p>}
                  {product.modcable && <p>Mod Cable: {product.modcable}</p>}
                  {product.motherboard && <p>Motherboard: {product.motherboard}</p>}
                  {product.powersupply && <p>Power Supply: {product.powersupply}</p>}
                  {product.ssd && <p>SSD: {product.ssd}</p>}
                </div>
                <button onClick={() => removeFromCart(item.id)} className="remove-button">
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      )}
      {cartItems.length > 0 && (
        <>
          <h3 className="cart-total">Total Price: ₹{totalPrice.toFixed(2)}</h3>
          <button className="checkout-button" onClick={proceedToCheckout}>
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;