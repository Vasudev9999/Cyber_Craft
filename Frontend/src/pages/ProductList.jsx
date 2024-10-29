import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductList.css';

const ProductList = ({ products, isAdmin, onEditProduct, onDeleteProduct, onAddToCart }) => {
  const navigate = useNavigate();
  const imagePath = 'src/assets/product-images/';

  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      onDeleteProduct(productId);
    }
  };

  const handleBuyNow = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-item">
          <img src={`${imagePath}${product.imageUrl}`} alt={product.name} />
          <h3>{product.name}</h3>
          <p className="description">{product.description}</p>
          <p className="price">₹{product.price}</p>
          <button className="add-to-cart" onClick={() => onAddToCart(product.id)}>Add to Cart</button>
          <button className="buy-now" onClick={() => handleBuyNow(product.id)}>More</button>
          {isAdmin && (
            <>
              <button className="edit" onClick={() => onEditProduct(product)}>
                Edit
              </button>
              <button
                className="delete"
                onClick={() => handleDelete(product.id)}
                style={{ backgroundColor: 'red', color: 'white' }}
              >
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductList;