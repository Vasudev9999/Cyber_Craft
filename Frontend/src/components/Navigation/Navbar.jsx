import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user, handleLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref for dropdown

  let lastScrollTop = 0;
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleScroll = () => {
    const currentScrollTop = window.pageYOffset;
    setShowNavbar(currentScrollTop < lastScrollTop || currentScrollTop === 0);
    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
  };

  const handleClickOutside = (event) => {
    // Close the dropdown if clicked outside
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside); // Listen for clicks outside
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className={`navbar ${showNavbar ? "visible" : "hidden"} ${isMobileMenuOpen ? "mobile-menu-open" : ""}`}>
      <div className="navbar-links">
        <div className="navbar-logo">
          <Link to="/dashboard">
            <img src="src/assets/Company_logo/logo.png" alt="Company Logo" />
          </Link>
        </div>

        {/* Other Links */}
        <Link to="/prebuild-pc" className={`navbar-link ${location.pathname === "/prebuild-pc" ? "active" : ""}`}>
          Prebuild PC
        </Link>
        <Link to="/custom" className={`navbar-link ${location.pathname === "/custom" ? "active" : ""}`}>
          Custom PC
        </Link>
        <Link to="/monitor" className={`navbar-link ${location.pathname === "/monitor" ? "active" : ""}`}>
          Monitor
        </Link>
        <Link to="/gaming" className={`navbar-link ${location.pathname === "/gaming" ? "active" : ""}`}>
          Gaming
        </Link>
        <Link to="/cart" className="navbar-cart">
          <img src="src/assets/cart.png" alt="Cart" />
        </Link>

        {/* If user is logged in, show username and dropdown */}
        {user ? (
          <div className="navbar-user" onClick={toggleDropdown} ref={dropdownRef}>
            <span>
              Welcome, {user.username}!
            </span>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <Link className="navbar-login" to="/login">Login</Link>
        )}
      </div>

      <div className="hamburger" onClick={toggleMobileMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
};

export default Navbar;