import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomPCStyles.css';

const CustomPC = () => {
  const navigate = useNavigate();

  const handleCardClick = (config) => {
    navigate('/custom-pc-page', { state: { preselectedConfig: config } });
  };

  const budgetConfig = {
    processor: 1,       // Intel-Core-I3-12100F (6790)
    motherboard: 1,     // ASRock B650M PRO RS Micro ATX (11400)
    cabinet: 1,         // Ant-Value-CV100-Black-600x600 (2690)
    cpuCooler: 1,       // COOLER MASTER MLW-D24M-A18PW-RW Water Cooler (4600)
    ram: 3,             // Crucial Pro Model CP2K16G4DFRA32A DDR4 3200 (4500)
    graphicsCard: 1,    // ASRock RX 570 Phantom Gaming Elite 8GB (11990)
    ssd: 1,             // Kingston NV2 1TB M.2 2280 NVMe PCIe Internal SSD (4800)
    hdd: 1,             // Seagate BarraCuda ST2000DM008 2TB (5650)
    powerSupply: 6,     // MSI MAG A650BN 650 W (5900)
    caseFan: 1,         // Antec Neon 120mm Case Fan ARGB (1100)
    modCable: 2,        // Phanteks PH-CB-C10KS_BR 24 Pin Motherboard (1100)
  };

  const midRangeConfig = {
    processor: 5,       // Intel-Core-I5-13400F (15490)
    motherboard: 4,     // ASUS TUF GAMING B650-E WIFI AMD B650 AM5 (15000)
    cabinet: 3,         // Corsair 4000D Airflow (7550)
    cpuCooler: 6,       // MSI MAG CoreLiquid 360R V2 Water Cooler (10000)
    ram: 5,             // G.SKILL Trident Z5 Neo RGB Series (9500)
    graphicsCard: 3,    // ASRock RX 7600 Steel Legend OC 8GB WHITE (26390)
    ssd: 2,             // SAMSUNG 870 EVO Series MZ-77E1T0B AM (6000)
    hdd: 1,             // Seagate BarraCuda ST2000DM008 2TB (5650)
    powerSupply: 3,     // CORSAIR RM850e Fully Modular (10000)
    caseFan: 2,         // Cooler Master MASTERFAN MF120 HALO 3IN1 (3900)
    modCable: 1,        // Lian Li Strimer Plus V2 24 PIN ATX ARGB (6200)
  };

  const highEndConfig = {
    processor: 8,       // Intel-Core-I7-13700F (32700)
    motherboard: 3,     // ASUS ROG Strix B650-A Gaming WiFi (20150)
    cabinet: 4,         // Fractal Design North FD-C-NOR1C-02 Case (9200)
    cpuCooler: 9,       // NZXT Kraken 360mm (15000)
    ram: 6,             // G.SKILL Trident Z5 Neo RGB Series 64GB (17200)
    graphicsCard: 7,    // Gigabyte RTX 3060 Windforce OC 12GB (25190)
    ssd: 4,             // SAMSUNG 990 PRO MZ-V9P2T0B AM (14300)
    hdd: 2,             // Seagate NE-ST8000DM004 8TB (11350)
    powerSupply: 5,     // CORSAIR RMe Series RM1200e (14500)
    caseFan: 3,         // Cooler Master SickleFlow ARGB Fan (1200)
    modCable: 1,        // Lian Li Strimer Plus V2 24 PIN ATX ARGB (6200)
  };

  const superRichConfig = {
    processor: 16,      // AMD Ryzen 9 7950X3D (54490)
    motherboard: 5,     // ASUS PRIME X670E-PRO WIFI (24700)
    cabinet: 8,         // NZXT H9 Flow - All White (13500)
    cpuCooler: 10,      // NZXT Kraken Elite RGB 360mm (25000)
    ram: 6,             // G.SKILL Trident Z5 Neo RGB Series 64GB (17200)
    graphicsCard: 10,   // Zotac RTX 3060 Twin Edge 12GB (106990)
    ssd: 4,             // SAMSUNG 990 PRO MZ-V9P2T0B AM (14300)
    hdd: 3,             // Seagate NE-ST8000VN004 8TB (15000)
    powerSupply: 8,     // Seasonic FOCUS V3 GX-1000W (16800)
    caseFan: 5,         // Thermaltake TOUGHFAN 12 Turbo Black PWM Fan (1600)
    modCable: 1,        // Lian Li Strimer Plus V2 24 PIN ATX ARGB (6200)
  };

  return (
    <div className="custom-pc-container">
      <div className="custom-pc-row">
        <div className="custom-pc-left-side">
          <label>Suggested Systems</label>
        </div>
        <div className="custom-pc-right-side">
          <div className="custom-pc-card" onClick={() => handleCardClick(budgetConfig)}>
            <img src="src/assets/CustomPC/BudgetPC.png" alt="Budget PC" />
            <p>Budget Custom PC from 60,000 ₹</p>
            <button className="custom-pc-button">Get More Info</button>
          </div>
          <div className="custom-pc-card" onClick={() => handleCardClick(midRangeConfig)}>
            <img src="src/assets/CustomPC/MidRangePC.png" alt="Mid Range PC" />
            <p>Mid-range Custom PC from 1,00,000 ₹</p>
            <button className="custom-pc-button">Get More Info</button>
          </div>
          <div className="custom-pc-card" onClick={() => handleCardClick(highEndConfig)}>
            <img src="src/assets/CustomPC/HighEndPC.png" alt="High End PC" />
            <p>High-end Custom PC from 1,40,000 ₹</p>
            <button className="custom-pc-button">Get More Info</button>
          </div>
          <div className="custom-pc-card" onClick={() => handleCardClick(superRichConfig)}>
            <img src="src/assets/CustomPC/SuperRichPC.png" alt="Super Rich PC" />
            <p>Super Rich Custom PC from 2,00,000 ₹</p>
            <button className="custom-pc-button">Get More Info</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomPC;