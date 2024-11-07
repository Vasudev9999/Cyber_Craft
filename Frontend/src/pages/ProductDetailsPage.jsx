// ProductDetailsPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetailsPage.css';
import axios from 'axios';

const ProductDetailsPage = ({ user }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const imagePath = '/src/assets/product-images/';

  useEffect(() => {
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
            <tr><td><strong>Cabinet</strong></td><td>{product.cabinet}</td></tr>
            <tr><td><strong>Case Fan</strong></td><td>{product.casefan}</td></tr>
            <tr><td><strong>CPU Cooler</strong></td><td>{product.cpucooler}</td></tr>
            <tr><td><strong>HDD</strong></td><td>{product.hdd}</td></tr>
            <tr><td><strong>Mod Cable</strong></td><td>{product.modcable}</td></tr>
            <tr><td><strong>Motherboard</strong></td><td>{product.motherboard}</td></tr>
            <tr><td><strong>Power Supply</strong></td><td>{product.powersupply}</td></tr>
            <tr><td><strong>SSD</strong></td><td>{product.ssd}</td></tr>
            <tr><td><strong>Price</strong></td><td>₹{product.price}</td></tr>
            <tr><td><strong>Created At</strong></td><td>{new Date(product.createdAt).toLocaleDateString()}</td></tr>
          </tbody>
        </table>

        <div className="action-buttons">
          <button className="btn add-to-cart" onClick={addToCart}>Add to Cart</button>
          <button className="btn buy-now" onClick={() => navigate('/checkout')}>Buy Now</button>
        </div>

        <div className="description-container">
          <h3>Description</h3>
          <p>{product.description}</p>
        </div>

        <button className="back-button" onClick={() => navigate('/prebuild-pc')}>
          Back to Products
        </button>
      </div>
    </div>
  );
};


export default ProductDetailsPage;