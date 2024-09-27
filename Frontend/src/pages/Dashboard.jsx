import React from "react";
import "./Dashboard.css"; // Importing the CSS file
import SaleBannerCarousel from "../components/Dashboard-components/SaleBannerCarousel"; // Importing SaleBannerCarousel component
import TitleTextDashboard from "../components/Dashboard-components/TitleTextDashboard"; // Importing TitleTextDashboard component
import ContactTextDashboard from "../components/Dashboard-components/ContactTextDashboard"; // Importing ContactTextDashboard component
import CategoryCard from "../components/Dashboard-components/CategoryCard"; // Importing CategoryCard component
import customPCImage from "../assets/product-catagory/custom-pc-image.png"; // Corrected image path
import prebuiltPCImage from "../assets/product-catagory/prebuild-pc-image.png"; // Corrected image path
import keyboardImage from "../assets/product-catagory/keyboard-image.png"; // Corrected image path
import monitorImage from "../assets/product-catagory/monitor-image.png"; // Corrected image path
import headphonesImage from "../assets/product-catagory/headphones-image.png"; // Corrected image path

const Dashboard = ({ username, openModal, handleLogout }) => {
  return (
    <div className="dashboard-container">
      {/* Full-width banner */}
      <SaleBannerCarousel />
      {/* Flex container for title and contact cards */}
      <div className="text-card-container" style={{ display: "flex" }}>
        <div style={{ flex: "0 0 40%" }}>
          <TitleTextDashboard />
        </div>
        <div style={{ flex: "0 0 60%" }}>
          <ContactTextDashboard />
        </div>
      </div>

      {/* Category cards */}
      <div
        className="category-card-container">
        <CategoryCard image={customPCImage} name="Custom PC" />
        <CategoryCard image={prebuiltPCImage} name="Prebuilt PC" />
        <CategoryCard image={keyboardImage} name="Keyboard" />
        <CategoryCard image={monitorImage} name="Monitor" />
        <CategoryCard image={headphonesImage} name="Headphones" />
      </div>
    </div>
  );
};

export default Dashboard;
