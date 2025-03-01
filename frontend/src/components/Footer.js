import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram, FaCanadianMapleLeaf, FaPhone} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-about">
            <h3 className="footer-title">Contact<span className="highlight"> Me</span></h3>
            <p>
              This project took a long time, so if you're here and reading this THANK YOU!
              Feel Free to use the scroll-to-the-top button or click on one of my socials!
            </p>
            <div className="social-links">
              <a href="https://github.com/mo100saad" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
                <FaGithub />
              </a>
              <a href="https://linkedin.com/in/mo100saad" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
                <FaLinkedin />
              </a>
              <a href="https://www.instagram.com/mo.saadd/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
                <FaInstagram />
              </a>
              <a href="mailto:mohammadhsaad05@gmail.com">
                <i className="far fa-envelope"></i>
                <FaEnvelope />
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
                <i className="fas fa-map-marker-alt"><FaCanadianMapleLeaf/></i>
                <span>Ottawa, Canada</span>
              </li>
              <li>
                <i className="fas fa-envelope"><FaEnvelope/></i>
                <span>mohammadhsaad05@gmail.com</span>
              </li>
              <li>
                <i className="fas fa-phone"> <FaPhone/></i>
                <span>+1 (343) 551-7568</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Mohammad Saad. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;