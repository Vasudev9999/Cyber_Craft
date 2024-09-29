import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [processor, setProcessor] = useState("");
  const [graphicsCard, setGraphicsCard] = useState("");
  const [ram, setRam] = useState("");
  const [storage, setStorage] = useState("");

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/products", {
        name,
        price,
        description,
        imageUrl,
        processor,
        graphicsCard,
        ram,
        storage,
      });
      console.log("Product added successfully:", response.data);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="add-product-page">
      <h2>Add New Product</h2>
      <form onSubmit={handleAddProduct}>
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="processor">Processor</label>
          <input
            type="text"
            id="processor"
            value={processor}
            onChange={(e) => setProcessor(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="graphicsCard">Graphics Card</label>
          <input
            type="text"
            id="graphicsCard"
            value={graphicsCard}
            onChange={(e) => setGraphicsCard(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ram">RAM</label>
          <input
            type="text"
            id="ram"
            value={ram}
            onChange={(e) => setRam(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="storage">Storage</label>
          <input
            type="text"
            id="storage"
            value={storage}
            onChange={(e) => setStorage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
