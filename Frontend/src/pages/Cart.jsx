import React, { useState, useEffect } from 'react';
import './Cart.css';

const Cart = ({ userId }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/cart/${userId}`, {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setCartItems(data.products || []);
          setTotalPrice(data.totalPrice || 0);
        } else {
          console.error('Failed to fetch cart items:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [userId]);

  const handleRemoveItem = async (productId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/cart/${userId}/remove/${productId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (response.ok) {
        setCartItems(cartItems.filter(item => item.id !== productId));
      } else {
        console.error('Failed to remove item from cart:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleCheckout = () => {
    // Implement checkout functionality
    alert('Proceeding to checkout...');
  };

  return (
    <div className="cart">
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>
                <img src={`src/assets/product-images/${item.imageUrl}`} alt={item.name} />
                <div>
                  <h2>{item.name}</h2>
                  <p>₹{item.price}</p>
                  <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <h3>Total Price: ₹{totalPrice}</h3>
          <button className="checkout" onClick={handleCheckout}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
