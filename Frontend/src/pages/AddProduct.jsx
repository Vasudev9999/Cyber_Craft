import React, { useState } from 'react';
import './AddProduct.css';

const AddProduct = () => {
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

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let imagePath = '';

    // Upload the image first
    if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);

        const uploadResponse = await fetch('http://localhost:8080/api/products/upload', {
            method: 'POST',
            body: formData,
            credentials: 'include', // Include credentials for authentication
        });

        if (uploadResponse.ok) {
            const uploadData = await uploadResponse.json();
            imagePath = uploadData.name; // Get the image name returned from the backend
        } else {
            console.error('Image upload failed');
            return; // Stop submission if the image upload fails
        }
    }

    // Add the product with the image path
    const newProduct = { ...product, imageUrl: imagePath };

    const response = await fetch('http://localhost:8080/api/products/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
        credentials: 'include', // Include credentials for authentication
    });

    if (response.ok) {
        onClose(); // Close modal on success
        // Optionally refresh the product list here or trigger a re-fetch
    } else {
        console.error('Failed to add product');
    }
};


return (
    <div className="modal">
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Product Name" onChange={handleChange} required />
            <textarea name="description" placeholder="Description" onChange={handleChange} required />
            <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
            <select name="category" onChange={handleChange} required>
                <option value="">Select Category</option>
                <option value="gaming">Gaming</option>
                <option value="workstation">Workstation</option>
            </select>
            <select name="processor" onChange={handleChange} required>
                <option value="">Select Processor</option>
                <option value="intel">Intel</option>
                <option value="amd">AMD</option>
            </select>
            <select name="ram" onChange={handleChange} required>
                <option value="">Select RAM</option>
                <option value="8GB">8GB</option>
                <option value="16GB">16GB</option>
            </select>
            <select name="graphicsCard" onChange={handleChange} required>
                <option value="">Select Graphics Card</option>
                <option value="nvidia">NVIDIA</option>
                <option value="amd">AMD</option>
            </select>
            <select name="storage" onChange={handleChange} required>
                <option value="">Select Storage</option>
                <option value="256GB">256GB</option>
                <option value="512GB">512GB</option>
            </select>
            <input type="file" onChange={handleImageChange} required />
            <button type="submit">Add Product</button>
        </form>
        <button onClick={onClose}>Close</button>
    </div>
);
};

export default AddProduct;
