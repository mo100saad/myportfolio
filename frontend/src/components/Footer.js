import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-about">
            <h3 className="footer-title">Your<span className="highlight">Name</span></h3>
            <p>
              A passionate frontend developer focused on creating intuitive, 
              dynamic user experiences with modern web technologies.
            </p>
            <div className="social-links">
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="mailto:your.email@example.com">
                <i className="far fa-envelope"></i>
              </a>
            </div>
          </div>
          
          <div className="footer-nav">
            <h3 className="footer-title">Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/resume">Resume</Link></li>
              <li><Link to="/projects">Projects</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-contact">
            <h3 className="footer-title">Contact Info</h3>
            <ul>
              <li>
                <i className="fas fa-map-marker-alt"></i>
                <span>New York, NY</span>
              </li>
              <li>
                <i className="fas fa-envelope"></i>
                <span>your.email@example.com</span>
              </li>
              <li>
                <i className="fas fa-phone"></i>
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} YourName. All rights reserved.</p>
          <p>Made with <span className="heart">❤</span> using React & Flask</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;