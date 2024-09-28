import React, { useEffect, useState } from 'react';
import './ContactTextDashboard.css'; // Importing the CSS file for styles
import bannerImage from '../../assets/professional-esports-gamer-back-side-view-rejoices-victory-generative-ai.jpg'; // Correct the import path

const ContactTextDashboard = () => {
  const [scale, setScale] = useState(1); // Initial scale for the image

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY; // Get the amount scrolled vertically
      const newScale = Math.max(0.5, 1 - scrollTop / 5000); // Adjust scale based on scroll value
      setScale(newScale); // Set the new scale, ensuring a minimum of 0.5
    };

    window.addEventListener('scroll', handleScroll); // Attach scroll event

    return () => {
      window.removeEventListener('scroll', handleScroll); // Cleanup on component unmount
    };
  }, []);

  return (
    <div className="contact-text-card">
      <div className="banner">
        <img
          src={bannerImage}
          alt="Banner"
          className="banner-image"
          style={{ transform: `scale(${scale})` }} // Apply the scaling effect
        />
      </div>
    </div>
  );
};

export default ContactTextDashboard;
