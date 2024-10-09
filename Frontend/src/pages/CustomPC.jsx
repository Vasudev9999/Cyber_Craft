import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomPCStyles.css';

const CustomPC = () => {
  const navigate = useNavigate();

  const handleCardClick = (config) => {
    navigate('/custom-pc-page', { state: { preselectedConfig: config } });
  };

  const budgetConfig  = {
    processor: 5, // Intel-Core-I3-12100F (6790)
    motherboard: 4, // ASRock B650M PRO RS Micro ATX (11400)
    cabinet: 1, // Ant-Value-CV100-Black-600x600 (2690)
    cpuCooler: 1, // COOLER MASTER MLW-D24M-A18PW-RW Water Cooler (4600)
    ram: 3, // Crucial Pro Model CP2K16G4DFRA32A DDR4 3200 (4500)
    graphicsCard: 1, // ASRock-RX-570-Phantom-Gaming-Elite-8GB (11990)
    ssd: 1, // Kingston NV2 1TB M.2 2280 NVMe PCIe Internal SSD (4800)
    hdd: 1, // Seagate BarraCuda ST2000DM008 2TB (5650)
    powerSupply: 1, // MSI MAG A650BN 650 W (5900)
    caseFan: 1, // Antec-Neon-120mm-Case-Fan-ARGB (790)
    modCable: 1, // Antec-Sleeved-Extension-PSU-Cable-Kit-Red-Black (2390)
  };
  
  const midRangeConfig  = {
    processor: 5, // Intel-Core-I5-13400F (15490)
    motherboard: 4, // ASUS TUF GAMING B650-E WIFI AMD B650 AM5 (15000)
    cabinet: 3, // Corsair 4000D Airflow (7550)
    cpuCooler: 6, // MSI MAG CoreLiquid 360R V2 Water Cooler (10000)
    ram: 5, // G.SKILL Trident Z5 Neo RGB Series (9500)
    graphicsCard: 3, // ASRock-RX-7600-Steel-Legend-OC-8GB-WHITE (26390)
    ssd: 2, // SAMSUNG 870 EVO Series MZ-77E1T0B AM (6000)
    hdd: 1, // Seagate BarraCuda ST2000DM008 2TB (5650)
    powerSupply: 2, // CORSAIR RM750e Fully Modular (8500)
    caseFan: 2, // Cooler-Master-MF120-Halo-White-Edition-ARGB (4040)
    modCable: 2, // Lian-Li-Strimer-Plus-V2-ARGB-12-Pin (4490)
  };
  
  const highEndConfig = {
    processor: 8, // Intel-Core-I7-13700F (32700)
    motherboard: 7, // ASUS ROG Strix B650-A Gaming WiFi AMD B650 (20150)
    cabinet: 4, // Fractal Design North FD-C-NOR1C-02 Case (9200)
    cpuCooler: 9, // NZXT Kraken 360mm (15000)
    ram: 6, // G.SKILL Trident Z5 Neo RGB Series 64GB (17200)
    graphicsCard: 7, // Gigabyte RTX 3060 Windforce OC 12GB (25190)
    ssd: 4, // SAMSUNG 990 PRO MZ-V9P1T0B AM (8500)
    hdd: 3, // Seagate Internal Hard Drive NE-ST8000DM004 8TB (11350)
    powerSupply: 8, // Seasonic FOCUS V3 GX-1000W (16800)
    caseFan: 3, // Lian-Li-UNI-Fan-SL-V2-120-ARGB (9290)
    modCable: 3, // Lian-Li-Strimer-Plus-V2-ARGB-Full-Set (10490)
  };
  

  return (
    <div className="custom-pc-container">
      <div className="custom-pc-row">
        <div className="custom-pc-left-side">
          <label>AMD Systems</label>
        </div>
        <div className="custom-pc-right-side">
          <div className="custom-pc-card" onClick={() => handleCardClick(budgetConfig)}>
            <img src="src/assets/CustomPC/C 3 White with 4 ARGB Fans.png" alt="PC 1" />
            <p>Budget custom pc from 60,000 ₹</p>
            <button className="custom-pc-button">Get More Info</button>
          </div>
          <div className="custom-pc-card" onClick={() => handleCardClick(midRangeConfig)}>
            <img src="src/assets/CustomPC/NZXT H6 Flow Black with 3 RGB Fans.png" alt="PC 2" />
            <p>Mid range custom pc from 100,000₹</p>
            <button className="custom-pc-button">Get More Info</button>
          </div>
          <div className="custom-pc-card" onClick={() => handleCardClick(highEndConfig)}>
            <img src="src/assets/CustomPC/Phanteks MagniumGear Neo Air 2 Black Wood Texture.png" alt="PC 3" />
            <p>High end custom pc from 1,40,000₹</p>
            <button className="custom-pc-button">Get More Info</button>
          </div>
        </div>
      </div>
      <div className="custom-pc-row">
        <div className="custom-pc-left-side">
          <label>Intel Systems</label>
        </div>
        <div className="custom-pc-right-side">
          <div className="custom-pc-card" onClick={() => handleCardClick(budgetConfig)}>
            <img src="src/assets/CustomPC/CG 560 ARGB.png" alt="PC 4" />
            <p>Budget custom pc from 60,000 ₹</p>
            <button className="custom-pc-button">Get More Info</button>
          </div>
          <div className="custom-pc-card" onClick={() => handleCardClick(midRangeConfig)}>
            <img src="src/assets/CustomPC/Hyte Y70 (E-ATX) Mid Tower Cabinet (White).png" alt="PC 5" />
            <p>Mid range custom pc from 100,000₹</p>
            <button className="custom-pc-button">Get More Info</button>
          </div>
          <div className="custom-pc-card" onClick={() => handleCardClick(highEndConfig)}>
            <img src="src/assets/CustomPC/Lian Li O11D Evo Rgb Black.png" alt="PC 6" />
            <p>High end custom pc from 1,40,000₹</p>
            <button className="custom-pc-button">Get More Info</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomPC;