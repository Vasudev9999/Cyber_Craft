// src/components/CustomPCPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './CustomPCPageStyles.css';
import axios from 'axios';

const CustomPCPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [components, setComponents] = useState({
    processors: [],
    motherboards: [],
    cabinets: [],
    cpuCoolers: [],
    rams: [],
    graphicsCards: [],
    ssds: [],
    hdds: [],
    powerSupplies: [],
    caseFans: [],
    modCables: []
  });

  const [selectedComponents, setSelectedComponents] = useState({
    processor: null,
    motherboard: null,
    cabinet: null,
    cpuCooler: null,
    ram: null,
    graphicsCard: null,
    ssd: null,
    hdd: null,
    powerSupply: null,
    caseFan: null,
    modCable: null,
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const [warning, setWarning] = useState("");
  const [user, setUser] = useState(null);
  const maxBudget = 200000;

  useEffect(() => {
    // Check user session
    const checkSession = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/auth/check-session', { withCredentials: true });
        if (response.status === 200) {
          setUser(response.data);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error("Session check failed:", error);
        navigate('/login');
      }
    };

    checkSession();

    // Fetch available components from the backend
    const fetchComponents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/components', { withCredentials: true });
        if (response.status === 200) {
          setComponents(response.data);
          // Initialize with preselected configuration or first option
          const preselectedConfig = location.state?.preselectedConfig || {};
          setSelectedComponents({
            processor: response.data.processors.find(p => p.id === preselectedConfig.processor) || response.data.processors[0] || null,
            motherboard: response.data.motherboards.find(m => m.id === preselectedConfig.motherboard) || response.data.motherboards[0] || null,
            cabinet: response.data.cabinets.find(c => c.id === preselectedConfig.cabinet) || response.data.cabinets[0] || null,
            cpuCooler: response.data.cpuCoolers.find(c => c.id === preselectedConfig.cpuCooler) || response.data.cpuCoolers[0] || null,
            ram: response.data.rams.find(r => r.id === preselectedConfig.ram) || response.data.rams[0] || null,
            graphicsCard: response.data.graphicsCards.find(g => g.id === preselectedConfig.graphicsCard) || response.data.graphicsCards[0] || null,
            ssd: response.data.ssds.find(s => s.id === preselectedConfig.ssd) || response.data.ssds[0] || null,
            hdd: response.data.hdds.find(h => h.id === preselectedConfig.hdd) || response.data.hdds[0] || null,
            powerSupply: response.data.powerSupplies.find(p => p.id === preselectedConfig.powerSupply) || response.data.powerSupplies[0] || null,
            caseFan: response.data.caseFans.find(c => c.id === preselectedConfig.caseFan) || response.data.caseFans[0] || null,
            modCable: response.data.modCables.find(m => m.id === preselectedConfig.modCable) || response.data.modCables[0] || null,
          });
        }
      } catch (error) {
        console.error("Error fetching components:", error);
      }
    };

    fetchComponents();
  }, [navigate, location.state]);

  useEffect(() => {
    // Calculate total price whenever selected components change
    const calculateTotal = () => {
      let total = 0;
      Object.values(selectedComponents).forEach(component => {
        if (component && component.price) {
          total += component.price;
        }
      });
      setTotalPrice(total);
      if (total > maxBudget) {
        setWarning("Warning: Total exceeds the maximum budget!");
      } else {
        setWarning("");
      }
    };

    calculateTotal();
  }, [selectedComponents]);

  const handleChange = (componentType, event) => {
    const selectedId = event.target.value;
    const selectedComponent = components[`${componentType}s`].find(comp => comp.id === parseInt(selectedId));
    setSelectedComponents(prevState => ({
      ...prevState,
      [componentType]: selectedComponent || null
    }));
  };

  const handleAddToCart = async () => {
    // Prepare the product data
    const productData = {
      name: 'Custom PC',
      description: 'Custom built PC with selected components',
      price: totalPrice,
      category: 'Custom PC',
      processor: selectedComponents.processor ? selectedComponents.processor.name : '',
      ram: selectedComponents.ram ? selectedComponents.ram.name : '',
      graphicsCard: selectedComponents.graphicsCard ? selectedComponents.graphicsCard.name : '',
      storage: selectedComponents.ssd ? `SSD: ${selectedComponents.ssd.name}, HDD: ${selectedComponents.hdd ? selectedComponents.hdd.name : 'None'}` : '',
      imageUrl: selectedComponents.cabinet ? selectedComponents.cabinet.image_path : 'assets/custom_pc_default.jpg',
      cabinet: selectedComponents.cabinet ? selectedComponents.cabinet.name : '',
      casefan: selectedComponents.caseFan ? selectedComponents.caseFan.name : '',
      cpucooler: selectedComponents.cpuCooler ? selectedComponents.cpuCooler.name : '',
      hdd: selectedComponents.hdd ? selectedComponents.hdd.name : '',
      modcable: selectedComponents.modCable ? selectedComponents.modCable.name : '',
      motherboard: selectedComponents.motherboard ? selectedComponents.motherboard.name : '',
      powersupply: selectedComponents.powerSupply ? selectedComponents.powerSupply.name : '',
      ssd: selectedComponents.ssd ? selectedComponents.ssd.name : '',
    };

    try {
      // Create the custom product in the backend
      const createProductResponse = await axios.post('http://localhost:8080/api/custom-products/add', productData, { withCredentials: true });
      if (createProductResponse.status === 200) {
        const customProduct = createProductResponse.data;
        // Add the custom product to the cart
        const addToCartResponse = await axios.post('http://localhost:8080/api/cart/add', null, {
          params: {
            customProductId: customProduct.id,
            quantity: 1
          },
          withCredentials: true
        });
        if (addToCartResponse.status === 200) {
          navigate('/cart');
        } else {
          alert('Failed to add custom PC to cart.');
        }
      } else {
        alert('Failed to create custom PC.');
      }
    } catch (error) {
      console.error("Error adding custom PC to cart:", error);
      alert('An error occurred while adding the custom PC to the cart.');
    }
  };

  const proceedToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="custom-pc-page-container">
      <h2>Build Your Custom PC</h2>
      <div className="selectors-container">
        {Object.keys(selectedComponents).map((componentType) => {
          const componentCategory = componentType.charAt(0).toUpperCase() + componentType.slice(1);
          const componentList = components[`${componentType}s`] || [];
          return (
            <div key={componentType} className="selector">
              <label>{componentCategory}</label>
              <select
                value={selectedComponents[componentType]?.id || 'null'}
                onChange={(e) => handleChange(componentType, e)}
              >
                <option value="null">None</option>
                {componentList.map((component) => (
                  <option key={component.id} value={component.id}>
                    {component.name} - ₹{component.price}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>

      <div className="summary-container">
        <h3>Total Price: ₹{totalPrice}</h3>
        {warning && <p className="warning">{warning}</p>}
        <button onClick={handleAddToCart} className="add-to-cart-btn">Add to Cart</button>
        <button onClick={proceedToCheckout} className="checkout-btn">Proceed to Checkout</button>
      </div>

      <div className="custom-pc-page-images">
        {selectedComponents.cabinet && (
          <img
            src={`/${selectedComponents.cabinet.image_path}`}
            alt={selectedComponents.cabinet.name}
            className="cabinet-image"
          />
        )}
        <div className="components-images">
          {Object.keys(selectedComponents).map((componentType) => {
            if (componentType === 'cabinet') return null;
            const component = selectedComponents[componentType];
            return component ? (
              <img
                key={componentType}
                src={`/${component.image_path}`}
                alt={component.name}
                className="component-image"
              />
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
};

export default CustomPCPage;