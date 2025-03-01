import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [uniqueTechs, setUniqueTechs] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/api/projects');
        
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        
        const data = await response.json();
        
        if (data.status === 'success' && data.projects) {
          setProjects(data.projects);
          
          // Extract unique technologies for filtering
          const allTechs = data.projects.flatMap(project => project.technologies);
          const uniqueTechnologies = [...new Set(allTechs)];
          setUniqueTechs(uniqueTechnologies);
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
    
    fetchProjects();
  }, []);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true;
    return project.technologies.includes(filter);
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Projects
        </motion.h2>
        
        {isLoading ? (
          <div className="loading-container">
            <div className="loader"></div>
            <p>Loading projects...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p>Error: {error}</p>
            <button onClick={() => window.location.reload()} className="retry-btn">
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className="filter-container">
              <button 
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => handleFilterChange('all')}
              >
                All
              </button>
              
              {uniqueTechs.map((tech) => (
                <button
                  key={tech}
                  className={`filter-btn ${filter === tech ? 'active' : ''}`}
                  onClick={() => handleFilterChange(tech)}
                >
                  {tech}
                </button>
              ))}
            </div>
            
            <motion.div 
              className="projects-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <motion.div 
                    key={project.id}
                    className="project-card"
                    variants={itemVariants}
                  >
                    <div className="project-image">
                      <img src={project.image_url || '/images/projects/placeholder.jpg'} alt={project.title} />
                    </div>
                    
                    <div className="project-content">
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      
                      <div className="project-tech">
                        {project.technologies.map((tech, index) => (
                          <span key={index} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                      
                      <div className="project-links">
                        {project.github_url && (
                          <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="project-link github">
                            <i className="fab fa-github"></i> Code
                          </a>
                        )}
                        
                        {project.project_url && (
                          <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="project-link demo">
                            <i className="fas fa-external-link-alt"></i> Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="no-projects">
                  <p>No projects found with the selected filter.</p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;