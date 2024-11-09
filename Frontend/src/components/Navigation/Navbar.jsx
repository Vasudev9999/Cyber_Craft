// src/components/Navigation/Navbar.js
import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import { AuthContext } from '../../context/AuthContext';
import logo from '../../assets/Company_logo/logo.png';
import cartIcon from '../../assets/cart.png';

const Navbar = () => {
  const { user, handleLogout } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const location = useLocation();
  let lastScrollTop = useRef(0).current;

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
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  const closeMobileMenu = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [lastScrollTop]);

  return (
    <nav
      className={`navbar ${showNavbar ? 'visible' : 'hidden'} ${
        isMobileMenuOpen ? 'mobile-menu-open' : ''
      }`}
    >
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/dashboard" onClick={closeMobileMenu}>
            <img src={logo} alt="Company Logo" />
          </Link>
        </div>

        <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <Link
            to="/prebuild-pc"
            className={`navbar-link ${
              location.pathname === '/prebuild-pc' ? 'active' : ''
            }`}
            onClick={closeMobileMenu}
          >
            Prebuild PC
          </Link>
          <Link
            to="/custom"
            className={`navbar-link ${
              location.pathname === '/custom' ? 'active' : ''
            }`}
            onClick={closeMobileMenu}
          >
            Custom PC
          </Link>

          {user && (
            <Link
              to="/my-orders"
              className={`navbar-link ${
                location.pathname === '/my-orders' ? 'active' : ''
              }`}
              onClick={closeMobileMenu}
            >
              My Orders
            </Link>
          )}

          <Link to="/cart" className="navbar-cart" onClick={closeMobileMenu}>
            <img src={cartIcon} alt="Cart" />
            {user && user.cartItemCount > 0 && (
              <span className="cart-count">{user.cartItemCount}</span>
            )}
          </Link>

          {/* Admin Link */}
          {user && user.isAdmin && (
            <Link
              to="/admin/dashboard"
              className={`navbar-link ${
                location.pathname === '/admin/dashboard' ? 'active' : ''
              }`}
              onClick={closeMobileMenu}
            >
              Admin Dashboard
            </Link>
          )}

          {/* User Section */}
          {user ? (
            <div
              className="navbar-user"
              onClick={toggleDropdown}
              ref={dropdownRef}
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
            >
              <span>Welcome, {user.username}!</span>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <button id="logout-button" onClick={() => { handleLogout(); closeMobileMenu(); }}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link className="navbar-login" to="/login" onClick={closeMobileMenu}>
              Login
            </Link>
          )}
        </div>

        <div
          className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;