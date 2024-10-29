import React, { useState, useEffect } from 'react';
import './PrebuildPC.css';
import ProductList from './ProductList';
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';

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
  const [sortBy, setSortBy] = useState('dateUpdated');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
    checkAdminStatus();
  }, [filters, sortBy, sortOrder]);

  const fetchProducts = async () => {
    try {
      const query = new URLSearchParams({
        ...filters,
        sortBy,
        sortOrder
      }).toString();
      const response = await fetch(`http://localhost:8080/api/products/filter?${query}`, {
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

  const checkAdminStatus = async () => {
    try {
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
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowEditProduct(true);
  };

  const clearFilters = () => {
    setFilters({
      name: '',
      category: '',
      processor: '',
      ram: '',
      graphicsCard: '',
      storage: '',
      minPrice: '',
      maxPrice: ''
    });
    setSortBy('dateUpdated');
    setSortOrder('asc');
  };

  return (
    <div className="prebuild-pc">
      <div className="filter-container">
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
          <option value="32GB">32GB</option>
          <option value="64GB">64GB</option>
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
          <option value="1TB">1TB</option>
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
        <select value={sortBy} onChange={handleSortChange}>
          <option value="dateUpdated">Sort by Date Updated</option>
          <option value="price">Sort by Price</option>
          <option value="name">Sort by Name</option>
          <option value="category">Sort by Category</option>
        </select>
        <select value={sortOrder} onChange={handleSortOrderChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <button onClick={clearFilters}>Clear Filters</button>
      </div>
      <ProductList products={products} isAdmin={isAdmin} onEditProduct={handleEditProduct} />
      {isAdmin && <button className="add-product-btn" onClick={() => setShowAddProduct(true)}>Add Item</button>}
      {showAddProduct && <AddProductModal onClose={() => setShowAddProduct(false)} />}
      {showEditProduct && <EditProductModal product={selectedProduct} onClose={() => setShowEditProduct(false)} />}
    </div>
  );
};

export default PrebuildPC;
