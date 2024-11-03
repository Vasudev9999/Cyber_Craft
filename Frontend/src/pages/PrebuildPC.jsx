import React, { useState, useEffect } from 'react';
import './PrebuildPC.css';
import ProductList from './ProductList';
import { useNavigate } from 'react-router-dom';

const PrebuildPC = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    processor: '',
    graphicsCard: '',
    ram: '',
    storage: '',
    sortBy: '',
    search: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      const query = new URLSearchParams(filters).toString();
      const response = await fetch(`http://localhost:8080/api/products?${query}`, {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error('Failed to fetch products:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const checkAuth = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/check-session', {
        method: 'GET',
        credentials: 'include',
      });
      return response.ok;
    } catch (error) {
      console.error('Error checking authentication status:', error);
      return false;
    }
  };

  const handleAddToCart = async (productId) => {
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
      alert('You need to login first.');
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
        credentials: 'include',
      });
      if (response.ok) {
        alert('Product successfully added to cart');
        navigate('/cart');
      } else {
        console.error('Failed to add product to cart:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="prebuild-pc">
      <div className="filter-container">
        <input
          type="text"
          name="search"
          placeholder="Search..."
          value={filters.search}
          onChange={handleFilterChange}
          className="filter-input"
        />
        
        <select name="category" value={filters.category} onChange={handleFilterChange} className="filter-select">
          <option value="">Category</option>
          <option value="Gaming">Gaming</option>
          <option value="Workstation">Workstation</option>
          <option value="Home">Home</option>
        </select>

        <select name="processor" value={filters.processor} onChange={handleFilterChange} className="filter-select">
          <option value="">Processor</option>
          <option value="Intel">Intel</option>
          <option value="AMD">AMD</option>
        </select>

        <select name="graphicsCard" value={filters.graphicsCard} onChange={handleFilterChange} className="filter-select">
          <option value="">Graphics Card</option>
          <option value="NVIDIA">NVIDIA</option>
          <option value="AMD">AMD</option>
        </select>

        <select name="ram" value={filters.ram} onChange={handleFilterChange} className="filter-select">
          <option value="">RAM</option>
          <option value="8GB">8GB</option>
          <option value="16GB">16GB</option>
          <option value="32GB">32GB</option>
        </select>

        <select name="storage" value={filters.storage} onChange={handleFilterChange} className="filter-select">
          <option value="">Storage</option>
          <option value="256GB SSD">256GB SSD</option>
          <option value="512GB SSD">512GB SSD</option>
          <option value="1TB HDD">1TB HDD</option>
        </select>

        <select name="sortBy" value={filters.sortBy} onChange={handleFilterChange} className="filter-select">
          <option value="">Sort By</option>
          <option value="priceAsc">Price (Low to High)</option>
          <option value="priceDesc">Price (High to Low)</option>
        </select>
      </div>

      <ProductList 
        products={products} 
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default PrebuildPC;
