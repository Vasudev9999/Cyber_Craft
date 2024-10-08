import React from 'react';
import './ProductList.css';

const ProductList = ({ products }) => {
  const imagePath = 'src/assets/product-images/'; // Set your image path here

  return (
    <div className="product-list">
      {products.map(product => (
        <div key={product.id} className="product-item">
          {console.log(product)}
          <img src={`${imagePath}${product.imageUrl}`} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
