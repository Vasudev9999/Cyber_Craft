// src/components/Dashboard-components/InfoCard.jsx
import React from "react";
import "./InfoCard.css"; // Import the CSS for styling
import sideViewPCImage from "../../assets/side_view_pc.png"; // Correct image path

const InfoCard = () => {
  return (
    <div className="info-card">
      <div className="info-card-image">
        <img src={sideViewPCImage} alt="Side view of a PC" />
      </div>
      <div className="info-card-text">
        <h1>PANORAMA Studio DESKTOP</h1>
        <p>
          Experience the ultimate performance with our custom-built PCs.
          Tailored to meet your needs, our systems are designed for maximum
          efficiency and power. Whether you’re gaming, creating, or working, our
          PCs will deliver beyond your expectations.
        </p>
        <div className="arrow-container">
          <span className="arrow">Get info →</span>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
