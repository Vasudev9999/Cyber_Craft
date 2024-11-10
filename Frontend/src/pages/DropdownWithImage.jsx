// src/components/DropdownWithImage.jsx
import React, { useState, useRef, useEffect } from 'react';
import './DropdownWithImageStyles.css';

const DropdownWithImage = ({ label, options, selectedOption, onChange, noneImagePath }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  const handleOptionClick = (option) => {
    onChange(option);
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const noneOption = {
    id: 'none',
    name: 'None',
    price: 0,
    image_path: noneImagePath,
  };

  return (
    <div className="dropdown-with-image-container" ref={dropdownRef}>
      <label>{label}</label>
      <div className="dropdown-selected" onClick={() => setShowDropdown(!showDropdown)}>
        {selectedOption ? (
          <div className="option-content">
            <img src={`/${selectedOption.image_path}`} alt={selectedOption.name} className="option-image" />
            <span>{selectedOption.name}{selectedOption.price ? ` - ₹${selectedOption.price}` : ''}</span>
          </div>
        ) : (
          <div className="option-content">
            <img src={`/${noneOption.image_path}`} alt="None" className="option-image" />
            <span>Select {label}</span>
          </div>
        )}
      </div>
      {showDropdown && (
        <div className="dropdown-options">
          <div className="dropdown-option" onClick={() => handleOptionClick(null)}>
            <img src={`/${noneOption.image_path}`} alt="None" className="option-image" />
            <span>None</span>
          </div>
          {options.map((option) => (
            <div key={option.id} className="dropdown-option" onClick={() => handleOptionClick(option)}>
              <img src={`/${option.image_path}`} alt={option.name} className="option-image" />
              <span>{option.name} - ₹{option.price}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownWithImage;