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

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("product", JSON.stringify(product));

    try {
      const response = await fetch('http://localhost:8080/api/products/add', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const newProduct = await response.json();
        location.reload();
        onClose();
      } else {
        console.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <form className="add-product" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={product.name} onChange={handleChange} />
          <textarea name="description" placeholder="Description" value={product.description} onChange={handleChange} />
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