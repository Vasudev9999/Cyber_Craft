// src/components/Dashboard-components/ContactTextDashboard.jsx

import React from 'react';
import './ContactTextDashboard.css'; // Importing the CSS file for styles
import bannerImage from '../../assets/professional-esports-gamer-back-side-view-rejoices-victory-generative-ai.jpg'; // Correct the import path

const ContactTextDashboard = () => {
  return (
    <div className="contact-text-card">
      <div className="banner">
        <img src={bannerImage} alt="Banner" className="banner-image" />
      </div>
    </div>
  );
};

export default ContactTextDashboard;
