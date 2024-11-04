import React, { useState } from 'react';
import './AddProductModal.css';
import axios from 'axios';

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
    imageUrl: '',
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert('Please select an image file.');
      return;
    }

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("product", JSON.stringify(product));

    try {
      const response = await axios.post('http://localhost:8080/api/products/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        alert('Product added successfully.');
        onClose();
      } else {
        console.error('Failed to add product');
        alert('Failed to add product.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding product.');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <form className="add-product" onSubmit={handleSubmit}>
          <h2>Add New Product</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={product.name}
            onChange={handleChange}
            // required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
            // required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            // required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={product.category}
            onChange={handleChange}
            // required
          />
          <input
            type="text"
            name="processor"
            placeholder="Processor"
            value={product.processor}
            onChange={handleChange}
            // required
          />
          <input
            type="text"
            name="ram"
            placeholder="RAM"
            value={product.ram}
            onChange={handleChange}
            // required
          />
          <input
            type="text"
            name="graphicsCard"
            placeholder="Graphics Card"
            value={product.graphicsCard}
            onChange={handleChange}
            // required
          />
          <input
            type="text"
            name="storage"
            placeholder="Storage"
            value={product.storage}
            onChange={handleChange}
            // required
          />
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            // required
          />
          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
