import React, { useEffect, useState } from "react";
import "./SaleBannerCarousel.css"; // Import the CSS file for the carousel

const saleMessages = [
  "Indian Festival Sale is Live Now!",
  "Get up to 50% off on Electronics!",
  "Limited-time offers on Furniture!",
  "Buy 1 Get 1 Free on all Fashion items!",
  "Festive Specials: Deals on Home Appliances!"
];

const SaleBannerCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  // Auto-swiping effect
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(false); // Start fade-out
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % saleMessages.length);
        setAnimate(true); // Start fade-in
      }, 500); // Duration of fade-out animation
    }, 3000); // Change message every 2 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setInitialLoad(false);
  }, []);

  return (
    <div className="sale-banner-container">
      <div className="sale-banner">
        <h2 className={`sale-text ${animate || initialLoad ? 'fade-in' : 'fade-out'}`}>
          {saleMessages[currentIndex]}
        </h2>
      </div>
    </div>
  );
};

export default SaleBannerCarousel;
