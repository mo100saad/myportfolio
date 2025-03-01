import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaHome, FaUser, FaCode, FaFileAlt, FaEnvelope } from 'react-icons/fa';

// Import pages
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Resume from './pages/Resume';
import Contact from './pages/Contact';

// Import styles
import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Handle scrolling for navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <div className="app">
        <header className={`app-header ${scrollPosition > 100 ? 'scrolled' : ''}`}>
          <Link to="/" className="logo">
            <motion.span 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              YourName
            </motion.span>
          </Link>
          
          {/* Mobile Menu Toggle */}
          <div className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
          
          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <ul>
              <NavItem to="/" icon={<FaHome />} text="Home" />
              <NavItem to="/about" icon={<FaUser />} text="About" />
              <NavItem to="/projects" icon={<FaCode />} text="Projects" />
              <NavItem to="/resume" icon={<FaFileAlt />} text="Resume" />
              <NavItem to="/contact" icon={<FaEnvelope />} text="Contact" />
            </ul>
          </nav>
          
          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.nav 
                className="mobile-nav"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ul>
                  <NavItem 
                    to="/" 
                    icon={<FaHome />} 
                    text="Home" 
                    onClick={() => setIsMenuOpen(false)} 
                  />
                  <NavItem 
                    to="/about" 
                    icon={<FaUser />} 
                    text="About" 
                    onClick={() => setIsMenuOpen(false)} 
                  />
                  <NavItem 
                    to="/projects" 
                    icon={<FaCode />} 
                    text="Projects" 
                    onClick={() => setIsMenuOpen(false)} 
                  />
                  <NavItem 
                    to="/resume" 
                    icon={<FaFileAlt />} 
                    text="Resume" 
                    onClick={() => setIsMenuOpen(false)} 
                  />
                  <NavItem 
                    to="/contact" 
                    icon={<FaEnvelope />} 
                    text="Contact" 
                    onClick={() => setIsMenuOpen(false)} 
                  />
                </ul>
              </motion.nav>
            )}
          </AnimatePresence>
        </header>
        
        <main className="app-main">
          <AnimatedRoutes />
        </main>
        
        <footer className="app-footer">
          <div className="footer-content">
            <div className="footer-section">
              <h3>YourName</h3>
              <p>Creating innovative web solutions with passion and precision.</p>
            </div>
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/projects">Projects</Link></li>
                <li><Link to="/resume">Resume</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Contact</h3>
              <p>info@yourname.com</p>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} YourName. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

// NavItem Component
function NavItem({ to, icon, text, onClick }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <li>
      <Link 
        to={to} 
        className={isActive ? 'active' : ''}
        onClick={onClick}
      >
        <span className="nav-icon">{icon}</span>
        <span className="nav-text">{text}</span>
      </Link>
    </li>
  );
}

// Animated Routes Component
function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;