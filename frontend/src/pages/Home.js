import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram, FaLaptopCode, FaLaptopHouse, FaTruckPickup, FaAssistiveListeningSystems, FaAnchor} from 'react-icons/fa';

const Home = () => {
  const blobRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        const API_BASE_URL = process.env.REACT_APP_API_URL;
        const response = await fetch(`${API_BASE_URL}/projects?featured=true`);

        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }

        const data = await response.json();

        if (data.status === 'success' && data.projects) {
          // Filter for UFC and P2P projects
          const filteredProjects = data.projects.filter(
            (project) =>
              project.title.toLowerCase().includes('ufc') ||
              project.title.toLowerCase().includes('p2p')
          );

          setProjects(filteredProjects);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching projects:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProjects();
  }, []);
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
          <h1>Hi, I'm <span className="highlight">Mo and i'm a:</span></h1>
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
            <a href="https://github.com/mo100saad" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/mo100saad" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://instagram.com/mo.saadd" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="mailto:mohammadhsaad05@gmail.com">
              <FaEnvelope />
            </a>
          </div>
        </div>
        <div className="hero-image">
          <div className="blob-bg" ref={blobRef}></div>
          <div className="profile-image">
            <img src={`${process.env.PUBLIC_URL}/files/logo192.png`} alt="Mo Saad" />
          </div>
        </div>
      </div>
      

      {/* Services Section */}
      <div className="services-section section" id="services">
        <div className="section-title">
          <h2>What I Do Best:</h2>
        </div>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon web-design">
              <i className="fas fa-desktop"> <FaLaptopCode /> </i>
            </div>
            <h3>Web Design</h3>
            <p>
              Creating beautiful, intuitive designs that provide exceptional user
              experiences across all devices.
            </p>
          </div>
          <div className="service-card">
            <div className="service-icon frontend">
              <i className="fas fa-code"> <FaLaptopHouse /> </i>
            </div>
            <h3>Frontend Development</h3>
            <p>
              Building responsive, interactive interfaces with modern frameworks
              like React, Angular, TypeScript and also integrating AWS services.
            </p>
          </div>
          <div className="service-card">
            <div className="service-icon backend">
              <i className="fas fa-server"> <FaAnchor/> </i>
            </div>
            <h3>Backend Development</h3>
            <p>
              Developing robust, scalable server applications and APIs using
              Node.js, Python, and database technologies.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Projects Section - Dynamic from Backend */}
<div className="featured-projects-section section" id="featured-projects">
  <div className="section-title">
    <h2>Recent Projects</h2>
    <p>Some of my latest work</p>
  </div>

  {isLoading ? (
    <p className="loading">Loading projects...</p>
  ) : error ? (
    <p className="error-message">{error}</p>
  ) : projects.length > 0 ? (
    <div className="project-grid">
      {projects.map((project) => (
        <div className="project-card" key={project.id}>
          <div className="project-image">
            <img src={project.image_url || '/files/projects/placeholder.jpg'} alt={project.title} />
          </div>
          <div className="project-content">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tech-tags">
              {project.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
            <div className="project-links">
              {project.project_url && (
                <a href={project.project_url} className="project-link" target="_blank" rel="noopener noreferrer">
                  <i className="fas fa-external-link-alt"></i> Live Demo
                </a>
              )}
              {project.github_url && (
                <a href={project.github_url} className="project-link" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github"></i> View Code
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="no-projects">No recent projects found.</p>
  )}
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