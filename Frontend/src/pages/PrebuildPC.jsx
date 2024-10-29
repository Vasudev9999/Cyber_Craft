import React, { useState, useEffect } from 'react';
import './PrebuildPC.css';
import ProductList from './ProductList';
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';
import { useNavigate } from 'react-router-dom';

const PrebuildPC = () => {
  const [products, setProducts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    processor: '',
    graphicsCard: '',
    ram: '',
    storage: '',
    sortBy: '',
    search: ''
  });

  const navigate = useNavigate(); // For navigation to cart

  useEffect(() => {
    fetchProducts();
    checkAdminStatus();
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

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowEditProduct(true);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/products/${productId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (response.ok) {
        setProducts(products.filter(product => product.id !== productId));
      } else {
        console.error('Failed to delete product:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleAddToCart = async (productId) => {
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
      <div className="filters">
        <input
          type="text"
          name="search"
          placeholder="Search..."
          value={filters.search}
          onChange={handleFilterChange}
        />
        <select name="category" value={filters.category} onChange={handleFilterChange}>
          <option value="">All Categories</option>
          <option value="Workstation">Workstation</option>
          <option value="Gaming">Gaming</option>
          <option value="Business">Business</option>
        </select>
        <select name="processor" value={filters.processor} onChange={handleFilterChange}>
          <option value="">All Processors</option>
          <option value="Intel">Intel</option>
          <option value="AMD">AMD</option>
        </select>
        <select name="graphicsCard" value={filters.graphicsCard} onChange={handleFilterChange}>
          <option value="">All Graphics Cards</option>
          <option value="NVIDIA">NVIDIA</option>
          <option value="AMD">AMD</option>
          <option value="Integrated">Integrated</option>
        </select>
        <select name="ram" value={filters.ram} onChange={handleFilterChange}>
          <option value="">All RAM</option>
          <option value="64GB DDR4">64GB DDR4</option>
          <option value="16GB DDR4">16GB DDR4</option>
          <option value="8GB DDR4">8GB DDR4</option>
        </select>
        <select name="storage" value={filters.storage} onChange={handleFilterChange}>
          <option value="">All Storage</option>
          <option value="256GB">256GB</option>
          <option value="512GB">512GB</option>
          <option value="1TB">1TB</option>
          <option value="2TB">2TB</option>
        </select>
        <select name="sortBy" value={filters.sortBy} onChange={handleFilterChange}>
          <option value="">Sort By</option>
          <option value="date-asc">Date Updated (Old to New)</option>
          <option value="date-desc">Date Updated (New to Old)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
        </select>
      </div>
      <ProductList 
        products={products} 
        isAdmin={isAdmin} 
        onEditProduct={handleEditProduct} 
        onDeleteProduct={handleDeleteProduct} 
        onAddToCart={handleAddToCart} // Pass the add to cart handler
      />
      {isAdmin && <button className="add-product-btn" onClick={() => setShowAddProduct(true)}>Add Item</button>}
      {showAddProduct && <AddProductModal onClose={() => setShowAddProduct(false)} />}
      {showEditProduct && <EditProductModal product={selectedProduct} onClose={() => setShowEditProduct(false)} />}
    </div>
  );
};

export default PrebuildPC;