import React, { useState, useEffect } from 'react';
import './PrebuildPC.css';
import ProductList from './ProductList';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PrebuildPC = ({ user }) => {
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
      // Construct the query string from the filters
      const query = Object.keys(filters)
        .filter((key) => filters[key])
        .map((key) => `${key}=${encodeURIComponent(filters[key])}`)
        .join('&');

      const response = await axios.get(`http://localhost:8080/api/products?${query}`, {
        withCredentials: true
      });

      if (response.status === 200) {
        setProducts(response.data);
      } else {
        console.error('Failed to fetch products:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addToCart = async (productId) => {
    if (!user) {
      alert('You need to login first.');
      navigate('/login');
      return;
    }

    try {
      await axios.post(
        'http://localhost:8080/api/cart/add',
        null,
        {
          params: {
            productId,
            quantity: 1,
          },
          withCredentials: true,
        }
      );
      alert('Product added to cart.');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart.');
    }
  };


  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  return (
    <div className="prebuild-pc">
      <div className="filters">
        <label>
          Category:
          <select name="category" value={filters.category} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="Gaming">Gaming</option>
            <option value="Workstation">Workstation</option>
          </select>
        </label>

        <label>
          Processor:
          <select name="processor" value={filters.processor} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="Intel">Intel</option>
            <option value="AMD">AMD</option>
          </select>
        </label>

        <label>
          Graphics Card:
          <select name="graphicsCard" value={filters.graphicsCard} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="NVIDIA">NVIDIA</option>
            <option value="AMD">AMD</option>
            <option value="Integrated">Integrated</option>
          </select>
        </label>

        <label>
          RAM:
          <select name="ram" value={filters.ram} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="8GB">8GB</option>
            <option value="16GB">16GB</option>
          </select>
        </label>

        <label>
          Storage:
          <select name="storage" value={filters.storage} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="256GB SSD">256GB SSD</option>
            <option value="1TB HDD">1TB HDD</option>
          </select>
        </label>

        <label>
          Sort By:
          <select name="sortBy" value={filters.sortBy} onChange={handleFilterChange}>
            <option value="">None</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="date-asc">Date: Oldest</option>
            <option value="date-desc">Date: Newest</option>
          </select>
        </label>

        <label>
          Search:
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Search by name"
          />
        </label>
      </div>

      <ProductList
        products={products}
        onAddToCart={addToCart}
      />
    </div>
  );
};

export default PrebuildPC;
