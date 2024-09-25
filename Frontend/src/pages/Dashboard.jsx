import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css"; // Importing the CSS file
import mountainPeaksImage from "../assets/mountain-peaks-during-night-time.jpg"; // Adjust the path if needed

const Dashboard = ({ username, openModal, handleLogout }) => {
  return (
    <div className="dashboard-container">
      <img 
        src="src\assets\antec-c8-banner.png" 
        alt="asldkasjd" 
        className="dashboard-image" // Updated class for styling
      />
      <br/>
      <img 
        src={mountainPeaksImage} 
        alt="Mountain Peaks During Night Time" 
        className="dashboard-image" // Updated class for styling
      />
    </div>
  );
};

export default Dashboard;
