import React from 'react';
import './CategoryCard.css'; // Import the CSS file for styles

const CategoryCard = ({ image, name }) => {
  return (
    <a href="#" className="category-card">
      <img src={image} alt={name} className="category-image" />
      <p className="category-name">{name}</p>
    </a>
  );
};

export default CategoryCard;
