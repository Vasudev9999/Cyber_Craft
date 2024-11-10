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
    processor: 11,      // Intel Core i3-12100 (10,000)
    motherboard: 1,     // Asus Prime A620M-A (8,000)
    cabinet: 1,         // 200 Air White (4,000)
    cpuCooler: 1,       // Cooler Master MLW-D24M-A18PW-RW (4,600)
    ram: 4,             // Corsair Vengeance LPX 8GB DDR4 3200MHz (3,000)
    graphicsCard: 1,    // ASRock RX 570 Phantom Gaming Elite 8GB (15,000)
    ssd: 10,            // Kingston NV2 500GB M.2 NVMe Gen4 (4,000)
    hdd: 2,             // Western Digital Blue 1TB 7200 RPM (3,000)
    powerSupply: 6,     // MSI MAG A650BN 650W Intel ATX 12V (5,900)
    caseFan: 1,         // Ant Esports Sciflow ARGB Black Triple Pack (2,300)
    modCable: 1,        // Antec Sleeved Extension PSU Cable Kit Red Black (2,500),
  };

  const midRangeConfig = {
    processor: 18,      // Intel Core i5-13400F (17,000)
    motherboard: 4,     // Asus TUF Gaming B550M-Plus WIFI II (14,000)
    cabinet: 3,         // 205 Air ARGB White (4,600)
    cpuCooler: 6,       // MSI MAG CoreLiquid 360R V2 Water Cooler (10,000)
    ram: 5,             // G.Skill Ripjaws S5 24GB DDR5 5200MHz (10,000)
    graphicsCard: 3,    // ASRock RX 7600 Steel Legend OC 8GB White (25,000)
    ssd: 11,            // Samsung 980 1TB M.2 NVMe Gen3 (8,000)
    hdd: 2,             // Western Digital Blue 1TB 7200 RPM (3,000)
    powerSupply: 4,     // Corsair RM850e Fully Modular ATX Power Supply (10,000)
    caseFan: 2,         // Ant Esports Sciflow ARGB White Triple Pack (2,400)
    modCable: 1,        // Antec Sleeved Extension PSU Cable Kit Red Black (2,500),
  };

  const highEndConfig = {
    processor: 9,       // AMD Ryzen 9 9900X with Radeon Graphics (45,000)
    motherboard: 3,     // Asus ROG Crosshair X670E Hero Wi-Fi (35,000)
    cabinet: 4,         // 211 Air White (5,000)
    cpuCooler: 9,       // NZXT Kraken 360mm RL-KN360-B1 (15,000)
    ram: 7,             // G.Skill Trident Z RGB 16GB (8GBx2) DDR4 3200MHz (7,000)
    graphicsCard: 7,    // Gigabyte RTX 3060 Windforce OC 12GB (32,000)
    ssd: 2,             // Acer Predator GM7000 1TB M.2 NVMe Gen4 (9,000)
    hdd: 5,             // Western Digital Red Plus NAS 8TB (15,000)
    powerSupply: 5,     // Corsair RMe Series RM1200e ATX Power Supply (14,500)
    caseFan: 8,         // Cooler Master MasterFan MF120 Halo White ARGB Triple Pack (3,600)
    modCable: 3,        // Lian Li Strimer Plus V2 ARGB Full Set 24-Pin & 8-Pin (5,000),
  };

  const superRichConfig = {
    processor: 8,       // AMD Ryzen 9 7950X3D with Radeon Graphics (55,000)
    motherboard: 3,     // Asus ROG Crosshair X670E Hero Wi-Fi (35,000)
    cabinet: 7,         // 250 Air White (4,800)
    cpuCooler: 10,      // NZXT Kraken Elite RGB 360mm (25,000)
    ram: 2,             // Corsair Vengeance 32GB DDR5 5200MHz Black (12,000)
    graphicsCard: 9,    // Sapphire Pulse RX 7600 XT 16GB (48,000)
    ssd: 9,             // Kingston KC3000 1TB M.2 NVMe Gen4 (9,500)
    hdd: 5,             // Western Digital Red Plus NAS 8TB (15,000)
    powerSupply: 8,     // Seasonic FOCUS V3 GX-1000 1000W 80+ Gold (16,800)
    caseFan: 12,        // Lian Li ST120 Black ARGB Triple Pack (3,300)
    modCable: 3,        // Lian Li Strimer Plus V2 ARGB Full Set 24-Pin & 8-Pin (5,000),
  };

  return (
    <div className="custom-pc-container">
      <div className="custom-pc-row">
        <div className="custom-pc-left-side">
          <label>Suggested Systems</label>
        </div>
        <div className="custom-pc-right-side">
          <div className="custom-pc-card" onClick={() => handleCardClick(budgetConfig)}>
            <img src="src\assets\Custom-assets\Cabinet\200-air-white-image-main-600x600.webp" alt="Budget PC" />
            <p>Budget Custom PC from ₹60,000</p>
            <button className="custom-pc-button">Get More Info</button>
          </div>
          <div className="custom-pc-card" onClick={() => handleCardClick(midRangeConfig)}>
            <img src="src\assets\Custom-assets\Cabinet\205-air-argb-white-image-main-600x600.webp" alt="Mid Range PC" />
            <p>Mid-range Custom PC from ₹1,00,000</p>
            <button className="custom-pc-button">Get More Info</button>
          </div>
          <div className="custom-pc-card" onClick={() => handleCardClick(highEndConfig)}>
            <img src="src\assets\Custom-assets\Cabinet\211-air-white-image-main-600x600.webp" alt="High End PC" />
            <p>High-end Custom PC from ₹1,40,000</p>
            <button className="custom-pc-button">Get More Info</button>
          </div>
          <div className="custom-pc-card" onClick={() => handleCardClick(superRichConfig)}>
            <img src="src\assets\Custom-assets\Cabinet\250-air-white-image-main-600x600.webp" alt="Super Rich PC" />
            <p>Super Rich Custom PC from ₹2,00,000</p>
            <button className="custom-pc-button">Get More Info</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomPC;