import React from "react";
import "./Navbar.css";

const Navbar = ({ isLoggedIn, openModal, handleLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [showNavbar, setShowNavbar] = React.useState(true);
  let lastScrollTop = 0;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleScroll = () => {
    const currentScrollTop = window.pageYOffset;
    if (currentScrollTop > lastScrollTop) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${showNavbar ? "visible" : "hidden"}`}>
      <div className="navbar-logo">
        <img src="src/assets/Company_logo/CC_logo.png" alt="Logo" />
        <span>Cyber Craft</span>
      </div>

      <div className={`navbar-links ${isMobileMenuOpen ? "active" : ""}`}>
        <a href="#prebuild-pc">Prebuild PC</a>
        <a href="#custom-pc">Custom PC</a>
        <a href="#cart">Cart</a>
      </div>

      <div className="navbar-auth">
        {isLoggedIn ? (
          <>
            <img
              src="src/assets/Profile_sample/download.jpeg"
              alt="Profile Icon"
              className="profile-icon"
              onClick={handleLogout}
            />
          </>
        ) : (
          <>
            <button className="navbar-login" onClick={() => openModal('login')}>Login</button>
            <button className="navbar-signup" onClick={() => openModal('register')}>Sign Up</button>
          </>
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
