import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/PrebuildPC.css"; 

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    processor: "",
    graphicsCard: "",
    ram: "",
    storage: "",
    productId: "",
  });

  const isAdmin = sessionStorage.getItem("isAdmin") === "true"; // Admin role check
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products/filter", {
        params: filters,
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products. Please try again later.");
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleAddProduct = () => {
    navigate("/add-product");
  };

  return (
    <div className="product-list-section">
      <h2>Available Prebuilt PCs</h2>

      {/* Filter Section */}
      <div className="filter-section">
        {/* Existing filter fields... */}
      </div>

      {/* Display "Add Product" button only for admin users */}
      {isAdmin && (
        <button className="add-product-button" onClick={handleAddProduct}>
          Add Product
        </button>
      )}

      {/* Product Cards */}
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.imageUrl} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Processor: {product.processor}</p>
              <p>Graphics Card: {product.graphicsCard}</p>
              <p>RAM: {product.ram}</p>
              <p>Storage: {product.storage}</p>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
}

export default ProductList;
