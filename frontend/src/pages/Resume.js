import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Resume.css';

const Resume = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [pdfLoaded, setPdfLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Check if PDF exists
    const checkPdfExists = async () => {
      try {
        const response = await fetch('/files/resume.pdf');
        if (response.ok) {
          setPdfLoaded(true);
        }
      } catch (error) {
        console.error('Error checking PDF:', error);
      }
    };
    
    checkPdfExists();
  }, []);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.2 } }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: { duration: 2, repeat: Infinity }
  };

  return (
    <section id="resume" className="resume-section">
      <motion.div 
        className="resume-container"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={fadeIn}
      >
        <motion.h2 
          className="section-title"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          My Resume
        </motion.h2>
        
        {/* PDF Display Container */}
        <motion.div 
          className="pdf-container"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          whileHover={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)', scale: 1.01 }}
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
        >
          {pdfLoaded ? (
            <iframe 
              src="/files/resume.pdf" 
              title="Resume PDF"
              className="resume-pdf-viewer"
            />
          ) : (
            <motion.div 
              className="pdf-placeholder"
              animate={{ 
                backgroundColor: ['#f5f5f5', '#e8eaf6', '#f5f5f5'],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="loading-animation">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
              </div>
              <p>Resume PDF is loading...</p>
            </motion.div>
          )}
          
          {/* Corner fold effect */}
          <div className="corner-fold"></div>
          
          {/* Animated page edges */}
          <motion.div 
            className="page-edge top"
            animate={{ boxShadow: isHovering ? '0 5px 15px rgba(0,0,0,0.2)' : '0 2px 5px rgba(0,0,0,0.1)' }}
          ></motion.div>
          <motion.div 
            className="page-edge right"
            animate={{ boxShadow: isHovering ? '5px 0 15px rgba(0,0,0,0.2)' : '2px 0 5px rgba(0,0,0,0.1)' }}
          ></motion.div>
          <motion.div 
            className="page-edge bottom"
            animate={{ boxShadow: isHovering ? '0 -5px 15px rgba(0,0,0,0.2)' : '0 -2px 5px rgba(0,0,0,0.1)' }}
          ></motion.div>
          <motion.div 
            className="page-edge left"
            animate={{ boxShadow: isHovering ? '-5px 0 15px rgba(0,0,0,0.2)' : '-2px 0 5px rgba(0,0,0,0.1)' }}
          ></motion.div>
        </motion.div>
        
        <motion.div 
          className="download-resume"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <motion.a 
            href="/files/resume.pdf" 
            className="resume-btn" 
            download
            whileHover={{ scale: 1.05, backgroundColor: '#6C5CE7' }}
            whileTap={{ scale: 0.95 }}
            animate={pulseAnimation}
          >
            <motion.span 
              className="btn-text"
              initial={{ x: 0 }}
              whileHover={{ x: -8 }}
            >
              Download Resume
            </motion.span>
            <motion.span 
              className="btn-icon"
              initial={{ opacity: 0, x: -10 }}
              whileHover={{ opacity: 1, x: 0 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </motion.span>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Resume;