import React from 'react';
import './path/to/app-assets/vendors/css/vendors.min.css'; // Adjust path as necessary
import './path/to/app-assets/css/bootstrap.css';
import './path/to/app-assets/css/bootstrap-extended.css';
import './path/to/app-assets/css/colors.css';
import './path/to/app-assets/css/components.css';
import './path/to/app-assets/css/themes/dark-layout.css';
import './path/to/app-assets/css/themes/bordered-layout.css';
import './path/to/app-assets/css/themes/semi-dark-layout.css';
import './path/to/app-assets/css/core/menu/menu-types/horizontal-menu.css';
import './path/to/assets/css/style.css';


const Dashboard = ({ username }) => {
  return (
    <div className="dashboard">
      {/* <h1>Welcome to Cyber Craft</h1>
      {username ? (
        <p>Welcome, {username}!</p>
      ) : (
        <p>Welcome to Cyber Craft! Please log in to access your personalized dashboard.</p>
      )} */}

      <h1>Welcome to Cyber Craft</h1>
      

    </div>
  );
};

export default Dashboard;
