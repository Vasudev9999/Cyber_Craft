// src/pages/Dashboard.jsx
import React, { useState } from "react";
import "./Dashboard.css"; // Importing the CSS file
import SaleBannerCarousel from "../components/Dashboard-components/SaleBannerCarousel"; // Importing SaleBannerCarousel component
import TitleTextDashboard from "../components/Dashboard-components/TitleTextDashboard"; // Importing TitleTextDashboard component
import ContactTextDashboard from "../components/Dashboard-components/ContactTextDashboard"; // Importing ContactTextDashboard component
import CategoryCard from "../components/Dashboard-components/CategoryCard"; // Importing CategoryCard component
import InfoCard from "../components/Dashboard-components/InfoCard"; // Corrected path to InfoCard component
import customPCImage from "../assets/product-catagory/custom-pc-image.png"; // Corrected image path
import prebuiltPCImage from "../assets/product-catagory/prebuild-pc-image.png"; // Corrected image path
import keyboardImage from "../assets/product-catagory/keyboard-image.png"; // Corrected image path
import monitorImage from "../assets/product-catagory/monitor-image.png"; // Corrected image path
import headphonesImage from "../assets/product-catagory/headphones-image.png"; // Corrected image path
import WhatsNewCardSection from "../components/Dashboard-components/WhatsNewCardSection";
import ip1 from "../assets/whats-new/1 (10).png";
import ip2 from "../assets/whats-new/1 (9).png";
import ip3 from "../assets/whats-new/1 (8).png";
import ip4 from "../assets/whats-new/1 (7).png";
import ip5 from "../assets/whats-new/1 (6).png";
import ip6 from "../assets/whats-new/1 (5).png";
import ip7 from "../assets/whats-new/1 (4).png";
import ip8 from "../assets/whats-new/1 (3).png";
import ip9 from "../assets/whats-new/1 (2).png";
import ip10 from "../assets/whats-new/1 (1).png";


const Dashboard = ({ username, openModal, handleLogout }) => {
  const cards = [
    { image: ip1, name: "Custom PC" },
    { image: ip2, name: "Prebuilt PC" },
    { image: ip3, name: "Keyboard" },
    { image: ip4, name: "Monitor" },
    { image: ip5, name: "Custom PC" },
    { image: ip6, name: "Prebuilt PC" },
    { image: ip7, name: "Keyboard" },
    { image: ip8, name: "Monitor" },
    { image: ip9, name: "Custom PC" },
    { image: ip10, name: "Prebuilt PC" },
    
  ];

  const [scrollEffect] = useState(0); // State to track the scroll value

  return (
    <div className="dashboard-container">
      {/* Full-width banner */}
      <SaleBannerCarousel />

      {/* Flex container for title and contact cards */}
      <div className="text-card-container" style={{ display: "flex" }}>
        <div style={{ flex: "0 0 30%" }}>
          <TitleTextDashboard />
        </div>
        <div style={{ flex: "0 0 70%" }}>
          <ContactTextDashboard />
        </div>
      </div>


      <WhatsNewCardSection cards={cards} />
    
        
      {/* Info Card */}
      <InfoCard />

    
    </div>
  );
};

export default Dashboard;
