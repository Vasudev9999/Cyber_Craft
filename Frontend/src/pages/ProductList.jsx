import React from 'react';
import './ProductList.css';

const ProductList = ({ products, isAdmin, onEditProduct }) => {
  const imagePath = 'src/assets/product-images/'; // Set your image path here

  return (
    <div className="product-list">
      {products.map(product => (
        <div key={product.id} className="product-item">
          <img src={`${imagePath}${product.imageUrl}`} alt={product.name} />
          <h3>{product.name}</h3>
          <p className="description">{product.description}</p>
          <p className="price">₹{product.price}</p>
          <button className="buy-now">Buy now</button>
          {isAdmin && <button className="edit" onClick={() => onEditProduct(product)}>Edit</button>}
        </div>
      ))}
    </div>
  );
};

export default ProductList;