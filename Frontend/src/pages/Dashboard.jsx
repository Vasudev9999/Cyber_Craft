import React, { useEffect, useState } from "react";
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
import WhatsNewCardSection from "../components/Dashboard-components/WhatsNewCardSection";
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
    { image: ip4, name: "Monitor" },
    { image: ip4, name: "Monitor" },
    { image: ip4, name: "Monitor" },
    { image: ip4, name: "Monitor" },
    { image: ip4, name: "Monitor" },
  ];
  const [scrollEffect, setScrollEffect] = useState(0); // State to track the scroll value

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollAmount = Math.min(scrollTop / 20, 500); // Change the scroll rate and set a max
      setScrollEffect(scrollAmount); // Set the amount by which the cards should move
    };

    window.addEventListener("scroll", handleScroll); // Add scroll event listener

    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup the event listener
    };
  }, []);

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
        className="category-card-container"
        style={{
          transform: `translateX(-${scrollEffect}%)`, // Moves cards to the left
          transition: "transform 0.3s ease-out", // Smooth animation
        }}
      >
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
