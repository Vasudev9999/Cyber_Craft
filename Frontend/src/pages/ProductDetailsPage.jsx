// src/pages/ProductDetailsPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetailsPage.css';
import axios from 'axios';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [user, setUser] = useState(null);
  const imagePath = '/src/assets/product-images/';

  useEffect(() => {
    // Check user session
    const checkSession = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/auth/check-session', { withCredentials: true });
        if (response.status === 200) {
          setUser(response.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Session check failed:", error);
        setUser(null);
      }
    };

    checkSession();

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/products/${productId}`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setProduct(response.data);
        } else {
          console.error('Failed to fetch product details:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const addToCart = async () => {
    if (!user) {
      alert('You need to login first.');
      navigate('/login');
      return;
    }

    try {
      await axios.post(
        'http://localhost:8080/api/cart/add',
        null,
        {
          params: {
            productId: product.id,
            quantity: 1,
          },
          withCredentials: true,
        }
      );
      alert('Product added to cart.');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart.');
    }
  };

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="product-details-page">
      <div className="product-image-section">
        <img src={`${imagePath}${product.imageUrl}`} alt={product.name} className="product-image" />
      </div>

      <div className="product-info-section">
        <h1 className="product-name">{product.name}</h1>
        <h2 className="product-price">₹{product.price.toFixed(2)}</h2>
        <table className="product-specs">
          <tbody>
            <tr><td><strong>Category:</strong></td><td>{product.category}</td></tr>
            {product.processor && <tr><td><strong>Processor:</strong></td><td>{product.processor}</td></tr>}
            {product.ram && <tr><td><strong>RAM:</strong></td><td>{product.ram}</td></tr>}
            {product.graphicsCard && <tr><td><strong>Graphics Card:</strong></td><td>{product.graphicsCard}</td></tr>}
            {product.storage && <tr><td><strong>Storage:</strong></td><td>{product.storage}</td></tr>}
            {product.cabinet && <tr><td><strong>Cabinet:</strong></td><td>{product.cabinet}</td></tr>}
            {product.casefan && <tr><td><strong>Case Fan:</strong></td><td>{product.casefan}</td></tr>}
            {product.cpucooler && <tr><td><strong>CPU Cooler:</strong></td><td>{product.cpucooler}</td></tr>}
            {product.hdd && <tr><td><strong>HDD:</strong></td><td>{product.hdd}</td></tr>}
            {product.modcable && <tr><td><strong>Mod Cable:</strong></td><td>{product.modcable}</td></tr>}
            {product.motherboard && <tr><td><strong>Motherboard:</strong></td><td>{product.motherboard}</td></tr>}
            {product.powersupply && <tr><td><strong>Power Supply:</strong></td><td>{product.powersupply}</td></tr>}
            {product.ssd && <tr><td><strong>SSD:</strong></td><td>{product.ssd}</td></tr>}
            <tr><td><strong>Created At:</strong></td><td>{new Date(product.createdAt).toLocaleDateString()}</td></tr>
          </tbody>
        </table>

        <div className="product-actions">
          <button onClick={addToCart} className="add-to-cart-button">Add to Cart</button>
          <button onClick={() => navigate('/checkout')} className="buy-now-button">Buy Now</button>
        </div>

        <div className="product-description">
          <h3>Description</h3>
          <p>{product.description}</p>
        </div>

        <button onClick={() => navigate('/prebuild-pc')} className="back-button">Back to Products</button>
      </div>
    </div>
  );
};

export default ProductDetailsPage;