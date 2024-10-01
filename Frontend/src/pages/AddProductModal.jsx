import React, { useState } from 'react';
import './AddProductModal.css';

const AddProductModal = ({ onClose }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    processor: '',
    ram: '',
    graphicsCard: '',
    storage: '',
    imageUrl: ''
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);
      const imageResponse = await fetch('http://localhost:8080/api/products/upload', {
        method: 'POST',
        body: formData
      });
      const imageData = await imageResponse.json();
      product.imageUrl = imageData.path;
    }
    const response = await fetch('http://localhost:8080/api/products/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    });
    if (response.ok) {
      alert('Product added successfully');
      onClose();
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <form className="add-product" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={product.name} onChange={handleChange} />
          <input type="text" name="description" placeholder="Description" value={product.description} onChange={handleChange} />
          <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} />
          <input type="text" name="category" placeholder="Category" value={product.category} onChange={handleChange} />
          <input type="text" name="processor" placeholder="Processor" value={product.processor} onChange={handleChange} />
          <input type="text" name="ram" placeholder="RAM" value={product.ram} onChange={handleChange} />
          <input type="text" name="graphicsCard" placeholder="Graphics Card" value={product.graphicsCard} onChange={handleChange} />
          <input type="text" name="storage" placeholder="Storage" value={product.storage} onChange={handleChange} />
          <input type="file" name="image" onChange={handleImageChange} />
          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;