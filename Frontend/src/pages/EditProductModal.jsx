import React, { useState, useEffect } from 'react';
import './AddProductModal.css';

const EditProductModal = ({ product, onClose }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    setUpdatedProduct(product);
  }, [product]);

  const handleChange = (e) => {
    setUpdatedProduct({
      ...updatedProduct,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (imageFile) {
      formData.append("file", imageFile);
    }
    formData.append("product", JSON.stringify(updatedProduct));

    try {
      const response = await fetch(`http://localhost:8080/api/products/${updatedProduct.id}`, {
        method: 'PUT',
        body: formData
      });

      if (response.ok) {
        location.reload();
        onClose();
      } else {
        console.error('Failed to update product');
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
          <input type="text" name="name" placeholder="Name" value={updatedProduct.name} onChange={handleChange} />
          <textarea name="description" placeholder="Description" value={updatedProduct.description} onChange={handleChange} />
          <input type="number" name="price" placeholder="Price" value={updatedProduct.price} onChange={handleChange} />
          <input type="text" name="category" placeholder="Category" value={updatedProduct.category} onChange={handleChange} />
          <input type="text" name="processor" placeholder="Processor" value={updatedProduct.processor} onChange={handleChange} />
          <input type="text" name="ram" placeholder="RAM" value={updatedProduct.ram} onChange={handleChange} />
          <input type="text" name="graphicsCard" placeholder="Graphics Card" value={updatedProduct.graphicsCard} onChange={handleChange} />
          <input type="text" name="storage" placeholder="Storage" value={updatedProduct.storage} onChange={handleChange} />
          <input type="file" name="image" onChange={handleImageChange} />
          <button type="submit">Update Product</button>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;