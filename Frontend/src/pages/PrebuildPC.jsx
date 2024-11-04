// PrebuildPC.jsx
import React, { useState, useEffect } from 'react';
import './PrebuildPC.css';
import ProductList from './ProductList';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';

const PrebuildPC = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    processor: '',
    graphicsCard: '',
    ram: '',
    storage: '',
    sortBy: '',
    search: '',
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, [filters]);

  const fetchProducts = async () => {
    try {
      const query = Object.keys(filters)
        .filter((key) => filters[key])
        .map((key) => `${key}=${encodeURIComponent(filters[key])}`)
        .join('&');

      const response = await axios.get(`http://localhost:8080/api/products?${query}`, {
        withCredentials: true,
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

  // Handler to open AddProductModal
  const handleAddProduct = () => {
    setIsAddModalOpen(true);
  };

  // Handler to close AddProductModal
  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    fetchProducts(); // Refresh products after adding
  };

  // Handler to open EditProductModal
  const handleEditProduct = (product) => {
    setEditProduct(product);
  };

  // Handler to close EditProductModal
  const handleCloseEditModal = () => {
    setEditProduct(null);
    fetchProducts(); // Refresh products after editing
  };

  // Handler to delete a product
  const handleDeleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/products/${productId}`, {
        withCredentials: true,
      });
      if (response.status === 204) {
        alert('Product deleted successfully.');
        fetchProducts();
      } else {
        alert('Failed to delete product.');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product.');
    }
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

        {user?.isAdmin && (
          <button className="add-product-button" onClick={handleAddProduct}>
            Add Product
          </button>
        )}
      </div>

      <ProductList
        products={products}
        isAdmin={user?.isAdmin}
        onAddToCart={addToCart}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
      />

      {isAddModalOpen && <AddProductModal onClose={handleCloseAddModal} />}
      {editProduct && <EditProductModal product={editProduct} onClose={handleCloseEditModal} />}
    </div>
  );
};

export default PrebuildPC;
