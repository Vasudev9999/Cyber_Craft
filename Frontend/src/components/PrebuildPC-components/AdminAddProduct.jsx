// AdminAddProduct.jsx
import React, { useState } from "react";
import axios from "axios";

const AdminAddProduct = () => {
  const [product, setProduct] = useState({
    productId: "",
    name: "",
    description: "",
    price: "",
    category: "",
    processor: "",
    graphicsCard: "",
    ram: "",
    storage: "",
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("product", new Blob([JSON.stringify(product)], { type: "application/json" }));
    formData.append("image", image);

    try {
      const response = await axios.post("http://localhost:8080/api/products/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Product added successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="admin-add-product">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="productId" placeholder="Product ID" onChange={handleChange} required />
        <input type="text" name="name" placeholder="Product Name" onChange={handleChange} required />
        <textarea name="description" placeholder="Product Description" onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" onChange={handleChange} required />
        <input type="text" name="processor" placeholder="Processor" onChange={handleChange} required />
        <input type="text" name="graphicsCard" placeholder="Graphics Card" onChange={handleChange} required />
        <input type="text" name="ram" placeholder="RAM" onChange={handleChange} required />
        <input type="text" name="storage" placeholder="Storage" onChange={handleChange} required />
        <input type="file" accept="image/*" onChange={handleImageChange} required />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AdminAddProduct;
