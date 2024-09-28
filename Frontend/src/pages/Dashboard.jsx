import React from "react";
import "./Dashboard.css";
import SaleBannerCarousel from "../components/Dashboard-components/SaleBannerCarousel";
import TitleTextDashboard from "../components/Dashboard-components/TitleTextDashboard";
import ContactTextDashboard from "../components/Dashboard-components/ContactTextDashboard";
import CategoryCard from "../components/Dashboard-components/CategoryCard";
import WhatsNewCardSection from "../components/Dashboard-components/WhatsNewCardSection";

import customPCImage from "../assets/product-catagory/custom-pc-image.png";
import prebuiltPCImage from "../assets/product-catagory/prebuild-pc-image.png";
import keyboardImage from "../assets/product-catagory/keyboard-image.png";
import monitorImage from "../assets/product-catagory/monitor-image.png";
import headphonesImage from "../assets/product-catagory/headphones-image.png";

import ip1 from "../assets/whats-new/1.jpeg";
import ip2 from "../assets/whats-new/2.jpeg";
import ip3 from "../assets/whats-new/3.jpeg";
import ip4 from "../assets/whats-new/4.jpeg";

const Dashboard = ({ username, openModal, handleLogout }) => {
  const cards = [
    { image: ip1, name: "Custom PC" },
    { image: ip2, name: "Prebuilt PC" },
    { image: ip3, name: "Keyboard" },
    { image: ip4, name: "Monitor" },
  ];

  return (
    <div className="dashboard-container">
      <SaleBannerCarousel />
      <div className="text-card-container" style={{ display: "flex" }}>
        <div style={{ flex: "0 0 40%" }}>
          <TitleTextDashboard />
        </div>
        <div style={{ flex: "0 0 60%" }}>
          <ContactTextDashboard />
        </div>
      </div>

      

      <div className="category-card-container">
        <CategoryCard image={customPCImage} name="Custom PC" />
        <CategoryCard image={prebuiltPCImage} name="Prebuilt PC" />
        <CategoryCard image={keyboardImage} name="Keyboard" />
        <CategoryCard image={monitorImage} name="Monitor" />
        <CategoryCard image={headphonesImage} name="Headphones" />
      </div>
      <WhatsNewCardSection cards={cards} />
    </div>
  );
};

export default Dashboard;
