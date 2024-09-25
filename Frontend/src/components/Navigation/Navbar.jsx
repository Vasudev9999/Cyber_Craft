import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, handleLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  let lastScrollTop = 0;
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleScroll = () => {
    const currentScrollTop = window.pageYOffset;
    setShowNavbar(currentScrollTop < lastScrollTop || currentScrollTop === 0);
    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`navbar ${showNavbar ? "visible" : "hidden"} ${
        isMobileMenuOpen ? "mobile-menu-open" : ""
      }`}
    >
      <div className="navbar-links">
        <div className="navbar-logo">
          <Link to="/dashboard">
            <img src="src/assets/Company_logo/logo.png" alt="Company Logo" />
          </Link>
        </div>

        <Link
          to="/prebuild-pc"
          className={`navbar-link ${
            location.pathname === "/prebuild-pc" ? "active" : ""
          }`}
        >
          Prebuild PC
        </Link>

        <Link
          to="/custom"
          className={`navbar-link ${
            location.pathname === "/custom" ? "active" : ""
          }`}
        >
          Custom PC
        </Link>

        <Link
          to="/monitor"
          className={`navbar-link ${
            location.pathname === "/monitor" ? "active" : ""
          }`}
        >
          Monitor
        </Link>

        <Link
          to="/gaming"
          className={`navbar-link ${
            location.pathname === "/gaming" ? "active" : ""
          }`}
        >
          Gaming
        </Link>

        <Link to="/cart" className="navbar-cart">
          <img src="src/assets/cart.png" alt="Cart" />
        </Link>

        <Link className="navbar-login" to="/login">
          Login
        </Link>
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