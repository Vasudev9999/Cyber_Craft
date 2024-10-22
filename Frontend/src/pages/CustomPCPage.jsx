import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import './CustomPCPageStyles.css';

const CustomPCPage = () => {
  const location = useLocation();
  const preselectedConfig = location.state?.preselectedConfig || {};

  const [components, setComponents] = useState({});
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

  const [totalBudget, setTotalBudget] = useState(0);
  const [warningMessage, setWarningMessage] = useState("");

  const maxBudget = 150000;
  const midRangeBudget = 80000;
  const highEndBudget = 150000;

  useEffect(() => {
    fetch("http://localhost:8080/api/components")
      .then((res) => res.json())
      .then((data) => {
        setComponents(data);

        setSelectedComponents({
          processor: data.processors ? data.processors.find(p => p.id === preselectedConfig.processor) || data.processors[0] : null,
          motherboard: data.motherboards ? data.motherboards.find(m => m.id === preselectedConfig.motherboard) || data.motherboards[0] : null,
          cabinet: data.cabinets ? data.cabinets.find(c => c.id === preselectedConfig.cabinet) || data.cabinets[0] : null,
          cpuCooler: data.cpuCoolers ? data.cpuCoolers.find(c => c.id === preselectedConfig.cpuCooler) || data.cpuCoolers[0] : null,
          ram: data.rams ? data.rams.find(r => r.id === preselectedConfig.ram) || data.rams[0] : null,
          graphicsCard: data.graphicsCards ? data.graphicsCards.find(g => g.id === preselectedConfig.graphicsCard) || data.graphicsCards[0] : null,
          ssd: data.ssds ? data.ssds.find(s => s.id === preselectedConfig.ssd) || data.ssds[0] : null,
          hdd: data.hdds ? data.hdds.find(h => h.id === preselectedConfig.hdd) || data.hdds[0] : null,
          powerSupply: data.powerSupplies ? data.powerSupplies.find(p => p.id === preselectedConfig.powerSupply) || data.powerSupplies[0] : null,
          caseFan: data.caseFans ? data.caseFans.find(f => f.id === preselectedConfig.caseFan) || data.caseFans[0] : null,
          modCable: data.modCables ? data.modCables.find(c => c.id === preselectedConfig.modCable) || data.modCables[0] : null,
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [preselectedConfig]);

  const handleComponentChange = (componentType, selectedId) => {
    const selectedOption = components[componentType + 's'].find(component => component.id == selectedId);
    setSelectedComponents((prevState) => ({
      ...prevState,
      [componentType]: selectedId === "null" ? null : selectedOption,
    }));
  };

  useEffect(() => {
    const total = Object.values(selectedComponents).reduce((sum, component) => {
      return sum + (component ? component.price : 0);
    }, 0);
    setTotalBudget(total);

    if (total > maxBudget) {
      setWarningMessage("Warning: Budget exceeded!");
    } else {
      setWarningMessage("");
    }
  }, [selectedComponents]);

  return (
    <div className="custom-pc-page-container">
      <div className="custom-pc-page-price-container">
        <h2>Total Price: ₹{totalBudget}</h2>
        {warningMessage && <p className="custom-pc-page-warning">{warningMessage}</p>}
      </div>

      <div className="custom-pc-page-content-container">
        <div className="custom-pc-page-image-and-dropdowns">
          <div className="custom-pc-page-left-side">
            {selectedComponents.cabinet && (
              <img
              src={('src/assets/file.png')}
              alt="Selected Cabinet"
              className="custom-pc-page-cabinet-image"
            />
            )}
          </div>

          <div className="custom-pc-page-right-side">
            {Object.keys(selectedComponents).map((componentType) => {
              const componentCategory = componentType.charAt(0).toUpperCase() + componentType.slice(1);
              const componentList = components[componentType + 's'] || [];
              return (
                <div key={componentType} className="custom-pc-page-component-select">
                  <label>{componentCategory}</label>
                  <select
                    value={selectedComponents[componentType]?.id || ''}
                    onChange={(e) =>
                      handleComponentChange(componentType, e.target.value)
                    }
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
        </div>
      </div>
    </div>
  );
};

export default CustomPCPage;
