import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetailsPage.css';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const imagePath = '/src/assets/product-images/';

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/products/${productId}`, {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          console.error('Failed to fetch product details:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
    fetchProduct();
  }, [productId]);

  const checkAuth = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/check-session', {
        method: 'GET',
        credentials: 'include',
      });
      return response.ok;
    } catch (error) {
      console.error('Error checking authentication status:', error);
      return false;
    }
  };

  const addToCart = async () => {
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
      alert('You need to login first.');
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/cart/add/${product.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(1),
      });
      if (response.ok) {
        alert('Product added to cart successfully');
      } else {
        console.error('Failed to add product to cart:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="product-details-page">
      <div className="product-image-container">
        <img src={`${imagePath}${product.imageUrl}`} alt={product.name} className="product-image" />
      </div>

      <div className="product-info-container">
        <h1 className="product-name">{product.name}</h1>
        <table className="specs-table">
          <tbody>
            <tr><td><strong>Category</strong></td><td>{product.category}</td></tr>
            <tr><td><strong>Processor</strong></td><td>{product.processor}</td></tr>
            <tr><td><strong>RAM</strong></td><td>{product.ram}</td></tr>
            <tr><td><strong>Graphics Card</strong></td><td>{product.graphicsCard}</td></tr>
            <tr><td><strong>Storage</strong></td><td>{product.storage}</td></tr>
            <tr><td><strong>Price</strong></td><td>₹{product.price}</td></tr>
            <tr><td><strong>Created At</strong></td><td>{new Date(product.createdAt).toLocaleDateString()}</td></tr>
          </tbody>
        </table>

        <div className="action-buttons">
          <button className="btn add-to-cart" onClick={addToCart}>Add to Cart</button>
          <button className="btn buy-now" onClick={addToCart}>Buy Now</button>
        </div>

        <div className="description-container">
          <h3>Description</h3>
          <p>{product.description}</p>
        </div>

        <button className="back-button" onClick={() => navigate('/')}>
          Back to Products
        </button>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
