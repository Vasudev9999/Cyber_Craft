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
  const [animate, setAnimate] = useState(true);  // Start with true for instant display
  const [initialLoad, setInitialLoad] = useState(true); // Track first load

  // Auto-swiping effect
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(false); // Start fade-out
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % saleMessages.length);
        setAnimate(true); // Start fade-in
      }, 500); // Duration of fade-out animation
    }, 2000); // Change message every 2 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Disable initial load flag after the first render to avoid delay on subsequent renders
    setInitialLoad(false);
  }, []);

  // Handle previous swipe
  const handlePrev = () => {
    setAnimate(false); // Start fade-out
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? saleMessages.length - 1 : prevIndex - 1
      );
      setAnimate(true); // Start fade-in
    }, 500); // Duration of fade-out animation
  };

  // Handle next swipe
  const handleNext = () => {
    setAnimate(false); // Start fade-out
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % saleMessages.length);
      setAnimate(true); // Start fade-in
    }, 500); // Duration of fade-out animation
  };

  return (
    <div className="sale-banner-container">
      <div className="sale-banner">
        <button className="arrow left-arrow" onClick={handlePrev}>
          &#8249;
        </button>
        <h2 className={`sale-text ${animate || initialLoad ? 'fade-in' : 'fade-out'}`}>
          {saleMessages[currentIndex]}
        </h2>
        <button className="arrow right-arrow" onClick={handleNext}>
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default SaleBannerCarousel;
