import React from 'react';

const Dashboard = ({ username }) => {
  return (
    <div className="dashboard">
      <h1>Welcome to Cyber Craft</h1>
      {username ? (
        <p>Welcome, {username}!</p>
      ) : (
        <p>Welcome to Cyber Craft! Please log in to access your personalized dashboard.</p>
      )}
    </div>
  );
};

export default Dashboard;
