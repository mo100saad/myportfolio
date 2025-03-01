import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Resume.css';

const Resume = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <section id="resume" className="resume-section">
      <motion.div 
        className="resume-container"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={fadeIn}
      >
        <h2 className="section-title">My Resume</h2>
        
        <div className="resume-grid">
          <div className="resume-column">
            <h3 className="resume-subtitle">Education</h3>
            <div className="resume-item">
              <h4>Bachelor of Science in Computer Science</h4>
              <h5>2018 - 2022</h5>
              <p className="resume-institution">University of Technology</p>
              <p>Graduated with honors. Specialized in web development and software engineering principles.</p>
            </div>
            
            <div className="resume-item">
              <h4>Full Stack Web Development Bootcamp</h4>
              <h5>2022</h5>
              <p className="resume-institution">Tech Academy</p>
              <p>Intensive 12-week program focused on modern web technologies including React and Node.js.</p>
            </div>
          </div>

          <div className="resume-column">
            <h3 className="resume-subtitle">Professional Experience</h3>
            <div className="resume-item">
              <h4>Frontend Developer</h4>
              <h5>2022 - Present</h5>
              <p className="resume-institution">Tech Innovations Inc.</p>
              <ul>
                <li>Developed responsive web applications using React and Redux</li>
                <li>Collaborated with UI/UX designers to implement modern interfaces</li>
                <li>Improved website performance by 40% through code optimization</li>
                <li>Led a team of 3 junior developers on client projects</li>
              </ul>
            </div>
            
            <div className="resume-item">
              <h4>Web Development Intern</h4>
              <h5>2021 - 2022</h5>
              <p className="resume-institution">Digital Solutions LLC</p>
              <ul>
                <li>Assisted in developing and maintaining client websites</li>
                <li>Gained hands-on experience with JavaScript frameworks</li>
                <li>Participated in daily stand-ups and agile development processes</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="skills-section">
          <h3 className="resume-subtitle">Skills</h3>
          <div className="skills-grid">
            <div className="skill-category">
              <h4>Frontend</h4>
              <div className="skill-bars">
                <div className="skill">
                  <span>React</span>
                  <div className="skill-bar"><div className="skill-level" style={{ width: '95%' }}></div></div>
                </div>
                <div className="skill">
                  <span>JavaScript</span>
                  <div className="skill-bar"><div className="skill-level" style={{ width: '90%' }}></div></div>
                </div>
                <div className="skill">
                  <span>HTML/CSS</span>
                  <div className="skill-bar"><div className="skill-level" style={{ width: '95%' }}></div></div>
                </div>
                <div className="skill">
                  <span>Tailwind CSS</span>
                  <div className="skill-bar"><div className="skill-level" style={{ width: '85%' }}></div></div>
                </div>
              </div>
            </div>
            
            <div className="skill-category">
              <h4>Backend</h4>
              <div className="skill-bars">
                <div className="skill">
                  <span>Node.js</span>
                  <div className="skill-bar"><div className="skill-level" style={{ width: '80%' }}></div></div>
                </div>
                <div className="skill">
                  <span>Python/Flask</span>
                  <div className="skill-bar"><div className="skill-level" style={{ width: '85%' }}></div></div>
                </div>
                <div className="skill">
                  <span>MongoDB</span>
                  <div className="skill-bar"><div className="skill-level" style={{ width: '75%' }}></div></div>
                </div>
                <div className="skill">
                  <span>SQL</span>
                  <div className="skill-bar"><div className="skill-level" style={{ width: '70%' }}></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="download-resume">
          <a href="/files/resume.pdf" className="resume-btn" download>
            Download Full Resume
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Resume;