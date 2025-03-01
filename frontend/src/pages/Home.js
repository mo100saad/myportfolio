import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope} from 'react-icons/fa';

const Home = () => {
  const blobRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (blobRef.current) {
        const { clientX, clientY } = e;
        const x = clientX / window.innerWidth;
        const y = clientY / window.innerHeight;
        
        // Subtle movement of the blob based on mouse position
        blobRef.current.style.transform = `translate(${x * 20 - 10}px, ${y * 20 - 10}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);


  return (
    <section className="hero-section" id="home">
      <div className="hero-content">
        <div className="hero-text">
          <h1>Hi, I'm <span className="highlight">Mo</span></h1>
          <h2>Full Stack Developer</h2>
          <p>
            I build modern, responsive fullstack applications with a focus on creating
            exceptional user experiences through clean code and innovative design. <strong>TLDR: I'm good with computers ;)</strong>
          </p>
          <div className="hero-buttons">
            <Link to="/projects" className="btn btn-primary">View My Work</Link>
            <Link to="/contact" className="btn btn-outline">Get In Touch</Link>
          </div>
          <div className="social-icons">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="mailto:your.email@example.com">
              <FaEnvelope />
            </a>
          </div>
        </div>
        <div className="hero-image">
          <div className="blob-bg" ref={blobRef}></div>
          <div className="profile-image">
            <img src={`${process.env.PUBLIC_URL}/images/profile.jpg`} alt="Mo Saad" />
          </div>
        </div>
      </div>
      

      {/* Services Section */}
      <div className="services-section section" id="services">
        <div className="section-title">
          <h2>What I Do</h2>
          <p>Services I offer to my clients</p>
        </div>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon web-design">
              <i className="fas fa-desktop"></i>
            </div>
            <h3>Web Design</h3>
            <p>
              Creating beautiful, intuitive designs that provide exceptional user
              experiences across all devices.
            </p>
          </div>
          <div className="service-card">
            <div className="service-icon frontend">
              <i className="fas fa-code"></i>
            </div>
            <h3>Frontend Development</h3>
            <p>
              Building responsive, interactive interfaces with modern frameworks
              like React, Vue, and Angular.
            </p>
          </div>
          <div className="service-card">
            <div className="service-icon backend">
              <i className="fas fa-server"></i>
            </div>
            <h3>Backend Development</h3>
            <p>
              Developing robust, scalable server applications and APIs using
              Node.js, Python, and database technologies.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Projects Section */}
      <div className="featured-projects-section section" id="featured-projects">
        <div className="section-title">
          <h2>Featured Projects</h2>
          <p>Some of my recent work</p>
        </div>
        <div className="project-grid">
          {/* This will be populated dynamically from API later */}
          <div className="project-card">
            <div className="project-image">
              <img src="/images/projects/ecommerce.jpg" alt="E-Commerce Website" />
            </div>
            <div className="project-content">
              <h3>E-Commerce Website</h3>
              <p>
                A full-stack e-commerce platform with product catalog, shopping
                cart, and checkout functionality.
              </p>
              <div className="tech-tags">
                <span className="tech-tag">React</span>
                <span className="tech-tag">Node.js</span>
                <span className="tech-tag">MongoDB</span>
                <span className="tech-tag">Express</span>
                <span className="tech-tag">Stripe</span>
              </div>
              <div className="project-links">
                <a
                  href="https://example-ecommerce.com"
                  className="project-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-external-link-alt"></i> Live Demo
                </a>
                <a
                  href="https://github.com/yourusername/ecommerce"
                  className="project-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-github"></i> View Code
                </a>
              </div>
            </div>
          </div>
          <div className="project-card">
            <div className="project-image">
              <img src="/images/projects/task-app.jpg" alt="Task Management App" />
            </div>
            <div className="project-content">
              <h3>Task Management App</h3>
              <p>
                A productivity app that helps users manage their tasks with features
                like drag-and-drop, filters, and statistics.
              </p>
              <div className="tech-tags">
                <span className="tech-tag">Vue.js</span>
                <span className="tech-tag">Firebase</span>
                <span className="tech-tag">Tailwind CSS</span>
              </div>
              <div className="project-links">
                <a
                  href="https://task-manager-example.com"
                  className="project-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-external-link-alt"></i> Live Demo
                </a>
                <a
                  href="https://github.com/yourusername/task-manager"
                  className="project-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-github"></i> View Code
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="view-all-projects">
          <Link to="/projects" className="btn btn-primary">
            View All Projects
          </Link>
        </div>
        
      </div>

      {/* CTA Section */}
      <div className="cta-section section">
        <div className="section-container">
          <div className="cta-content">
            <h2>Interested in working together?</h2>
            <p>
              I'm always open to discussing new projects, creative ideas or
              opportunities to be part of your vision.
            </p>
            <Link to="/contact" className="btn">
              Get In Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;