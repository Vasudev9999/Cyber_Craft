import React from "react";
import "./WhatsNewCardSection.css"; // Importing CSS for this component

const WhatsNewCardSection = ({ cards }) => {
  return (
    <div className="whats-new-section">
      <h2 className="whats-new-title">What's New!</h2>
      <div className="whats-new-card-container">
        {cards.map((card, index) => (
          <div key={index} className="whats-new-card">
            <img src={card.image} alt={card.name} className="whats-new-card-image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatsNewCardSection;
