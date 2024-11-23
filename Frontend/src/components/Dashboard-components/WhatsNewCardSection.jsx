import React, { useRef } from "react";
import "./WhatsNewCardSection.css"; // Importing CSS for this component

const WhatsNewCardSection = ({ cards }) => {
  const scrollContainerRef = useRef(null);

  // Scroll handler for the arrows
  const scroll = (direction) => {
    const cardWidth = 375; // 350px card width + 25px gap between cards
    const scrollAmount = cardWidth * 3; // Scroll by 3 cards at a time
    if (direction === "left") {
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="whats-new-section">
      <h3 className="whats-new-title">Take a look at what’s upcomming</h3>
      <div className="whats-new-carousel-wrapper">
        <button className="scroll-arrow left-arrow" onClick={() => scroll("left")}>
          &#10094; {/* Left Arrow Icon */}
        </button>
        <div className="whats-new-card-container" ref={scrollContainerRef}>
          {cards.map((card, index) => (
            <div key={index} className="whats-new-card">
              <img src={card.image} alt={card.name} className="whats-new-card-image" />
            </div>
          ))}
        </div>
        <button className="scroll-arrow right-arrow" onClick={() => scroll("right")}>
          &#10095; {/* Right Arrow Icon */}
        </button>
      </div>
    </div>
  );
};

export default WhatsNewCardSection;
