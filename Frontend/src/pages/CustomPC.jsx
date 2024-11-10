// src/components/CustomPC.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomPCStyles.css';

const CustomPC = () => {
  const navigate = useNavigate();

  const handleCardClick = (config) => {
    navigate('/custom-pc-page', { state: { preselectedConfig: config } });
  };

  const budgetConfig = {
    processor: 11,
    motherboard: 1,
    cabinet: 1,
    cpuCooler: 1,
    ram: 4,
    graphicsCard: 1,
    ssd: 10,
    hdd: 2,
    powerSupply: 6,
    caseFan: 1,
    modCable: 1,
  };

  const midRangeConfig = {
    processor: 18,
    motherboard: 4,
    cabinet: 3,
    cpuCooler: 6,
    ram: 5,
    graphicsCard: 3,
    ssd: 11,
    hdd: 2,
    powerSupply: 4,
    caseFan: 2,
    modCable: 1,
  };

  const highEndConfig = {
    processor: 9,
    motherboard: 3,
    cabinet: 4,
    cpuCooler: 9,
    ram: 7,
    graphicsCard: 7,
    ssd: 2,
    hdd: 5,
    powerSupply: 5,
    caseFan: 8,
    modCable: 3,
  };

  const superRichConfig = {
    processor: 8,
    motherboard: 3,
    cabinet: 7,
    cpuCooler: 10,
    ram: 2,
    graphicsCard: 9,
    ssd: 9,
    hdd: 5,
    powerSupply: 8,
    caseFan: 12,
    modCable: 3,
  };

  return (
    <div className="custom-pc-container">
      <div className="custom-pc-row">
        <div className="custom-pc-left-side">
          <label>Suggested Systems</label>
        </div>
        <div className="custom-pc-right-side">
          <div className="custom-pc-card" onClick={() => handleCardClick(budgetConfig)}>
            <img src="src/assets/Custom-assets/Cabinet/200-air-white-image-main-600x600.webp" alt="Budget PC" />
            <p>Budget Custom PC from ₹60,000</p>
            <button className="custom-pc-button">Get More Info</button>
          </div>
          <div className="custom-pc-card" onClick={() => handleCardClick(midRangeConfig)}>
            <img src="src/assets/Custom-assets/Cabinet/205-air-argb-white-image-main-600x600.webp" alt="Mid Range PC" />
            <p>Mid-range Custom PC from ₹1,00,000</p>
            <button className="custom-pc-button">Get More Info</button>
          </div>
          <div className="custom-pc-card" onClick={() => handleCardClick(highEndConfig)}>
            <img src="src/assets/Custom-assets/Cabinet/211-air-white-image-main-600x600.webp" alt="High End PC" />
            <p>High-end Custom PC from ₹1,40,000</p>
            <button className="custom-pc-button">Get More Info</button>
          </div>
          <div className="custom-pc-card" onClick={() => handleCardClick(superRichConfig)}>
            <img src="src/assets/Custom-assets/Cabinet/250-air-white-image-main-600x600.webp" alt="Super Rich PC" />
            <p>Super Rich Custom PC from ₹2,00,000</p>
            <button className="custom-pc-button">Get More Info</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomPC;