import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaHome, FaUser, FaCode, FaFileAlt, FaEnvelope } from 'react-icons/fa';
import ErrorBoundary from './components/ErrorBoundary.jsx';

// Import pages
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Resume from './pages/Resume';
import Contact from './pages/Contact';

// Import components
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop'; 

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
    <ErrorBoundary>
      <Router>
        <ScrollToTop /> {/* ✅ Ensures page scrolls to top on route change */}
        <div className="app">
          <header className={`app-header ${scrollPosition > 100 ? 'scrolled' : ''}`}>
            <Link to="/" className="logo">
              <motion.span 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Mohammad "Mo" Saad
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
                    <NavItem to="/" icon={<FaHome />} text="Home" onClick={() => setIsMenuOpen(false)} />
                    <NavItem to="/about" icon={<FaUser />} text="About" onClick={() => setIsMenuOpen(false)} />
                    <NavItem to="/projects" icon={<FaCode />} text="Projects" onClick={() => setIsMenuOpen(false)} />
                    <NavItem to="/resume" icon={<FaFileAlt />} text="Resume" onClick={() => setIsMenuOpen(false)} />
                    <NavItem to="/contact" icon={<FaEnvelope />} text="Contact" onClick={() => setIsMenuOpen(false)} />
                  </ul>
                </motion.nav>
              )}
            </AnimatePresence>
          </header>

          <main className="app-main">
            <AnimatedRoutes />
          </main>

          <Footer /> {/* ✅ Use the imported Footer component */}
        </div>
      </Router>
    </ErrorBoundary>
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
