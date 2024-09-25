import React from "react";
import "./Dashboard.css"; // Importing the CSS file
import mountainPeaksImage from "../assets/mountain-peaks-during-night-time.jpg"; // Adjust the path if needed

const Dashboard = ({ username, openModal, handleLogout }) => {
  return (
    <div className="dashboard-container">
      {/* Full-width banner */}
      <div className="sale-banner">
        <h2>Indian Festival Sale is Live Now!</h2>
      </div>

      {/* Two Flex Cards */}
      <div className="card-container">
        <div className="card">
          <div className="card-image">
            <img 
              src={mountainPeaksImage} 
              alt="Mountain Peaks During Night Time"
            />
          </div>
        </div>

        <div className="card">
          <div className="card-image">
            <img 
              src="src\assets\antec-c8-banner.png" 
              alt="Another Scenic View"
            />
          </div>
        </div>
      </div>

      {/* Text below the cards */}
      <div className="dashboard-text">
        <p>
          Don't miss out on our exclusive deals during the Indian Festival Sale! From the mountains to the forests, 
          find the perfect getaway for you. Book now and experience nature like never before.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
