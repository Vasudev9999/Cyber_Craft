// PrebuildPC.js
import React, { useState, useEffect } from 'react';
import './PrebuildPC.css';
import ProductList from './ProductList';
import AddProductModal from './AddProductModal';

const PrebuildPC = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    category: '',
    processor: '',
    ram: '',
    graphicsCard: '',
    storage: '',
    minPrice: '',
    maxPrice: ''
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);

  useEffect(() => {
    fetchProducts();
    checkAdminStatus();
  }, [filters]);

  const fetchProducts = async () => {
    const query = new URLSearchParams(filters).toString();
    const response = await fetch(`http://localhost:8080/api/products/filter?${query}`);
    const data = await response.json();
    setProducts(data);
  };

  const checkAdminStatus = async () => {
    const response = await fetch('http://localhost:8080/api/auth/check-admin', {
      method: 'GET',
      credentials: 'include',
    });
    if (response.ok) {
      const data = await response.json();
      setIsAdmin(data.isAdmin);
    } else {
      setIsAdmin(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="prebuild-pc">
      <input
        type="text"
        name="name"
        placeholder="Search..."
        value={filters.name}
        onChange={handleFilterChange}
      />
      <select name="category" value={filters.category} onChange={handleFilterChange}>
        <option value="">All Categories</option>
        <option value="gaming">Gaming</option>
        <option value="workstation">Workstation</option>
      </select>
      <select name="processor" value={filters.processor} onChange={handleFilterChange}>
        <option value="">All Processors</option>
        <option value="intel">Intel</option>
        <option value="amd">AMD</option>
      </select>
      <select name="ram" value={filters.ram} onChange={handleFilterChange}>
        <option value="">All RAM</option>
        <option value="8GB">8GB</option>
        <option value="16GB">16GB</option>
      </select>
      <select name="graphicsCard" value={filters.graphicsCard} onChange={handleFilterChange}>
        <option value="">All Graphics Cards</option>
        <option value="nvidia">NVIDIA</option>
        <option value="amd">AMD</option>
      </select>
      <select name="storage" value={filters.storage} onChange={handleFilterChange}>
        <option value="">All Storage</option>
        <option value="256GB">256GB</option>
        <option value="512GB">512GB</option>
      </select>
      <input
        type="number"
        name="minPrice"
        placeholder="Min Price"
        value={filters.minPrice}
        onChange={handleFilterChange}
      />
      <input
        type="number"
        name="maxPrice"
        placeholder="Max Price"
        value={filters.maxPrice}
        onChange={handleFilterChange}
      />
      <ProductList products={products} />
      {isAdmin && <button onClick={() => setShowAddProduct(true)}>Add Item</button>}
      {showAddProduct && <AddProductModal onClose={() => setShowAddProduct(false)} />}
    </div>
  );
};

export default PrebuildPC;