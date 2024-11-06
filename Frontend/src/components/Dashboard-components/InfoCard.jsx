import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./InfoCard.css";
import sideViewPCImage from "../../assets/side_view_pc.png";

const InfoCard = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle navigation when "Get info" is clicked
  const handleMoreInfoClick = () => {
    navigate("/product/111"); // Navigate to the specified URL
  };

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
          <span className="arrow" onClick={handleMoreInfoClick}>
            Get info →
          </span>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
