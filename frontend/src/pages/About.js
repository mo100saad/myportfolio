import React from 'react';
import { motion } from 'framer-motion';
import { FaUserGraduate, FaBriefcase, FaCode, FaLaptopCode } from 'react-icons/fa';
import './About.css';

const About = () => {
  const skills = [
    { category: "Frontend", items: ["HTML5", "CSS3", "JavaScript", "React", "Vue.js", "Responsive Design", "Bootstrap", "Tailwind CSS"] },
    { category: "Backend", items: ["Python", "Flask", "Node.js", "Express", "RESTful APIs", "GraphQL"] },
    { category: "Database", items: ["MongoDB", "MySQL", "SQLite", "PostgreSQL", "Firebase"] },
    { category: "Tools", items: ["Git", "GitHub", "VS Code", "Figma", "Postman", "Docker", "AWS"] }
  ];
  
  const education = [
    {
      degree: "BS in Computer Science",
      institution: "University Name",
      year: "2018 - 2022",
      description: "Graduated with honors. Focused on web development, algorithms, and data structures."
    },
    {
      degree: "Web Development Bootcamp",
      institution: "Coding Academy",
      year: "2022",
      description: "Intensive 12-week program covering full-stack development technologies."
    }
  ];
  
  const experience = [
    {
      position: "Frontend Developer",
      company: "Tech Solutions Inc.",
      year: "2022 - Present",
      description: "Developing responsive web applications using React.js. Collaborating with cross-functional teams to implement new features and maintain existing codebase."
    },
    {
      position: "Web Development Intern",
      company: "Digital Innovations",
      year: "2021 - 2022",
      description: "Assisted in building websites and web applications. Gained hands-on experience with industry-standard tools and practices."
    }
  ];
  
  return (
    <motion.div 
      className="page-transition"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* About Hero */}
      <section className="about-hero">
        <div className="container">
          <motion.h1 
            className="page-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            About Me
          </motion.h1>
          
          <div className="about-content">
            <motion.div 
              className="about-image"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <img src="public/about-me.jpg" alt="Your Name" />
            </motion.div>
            
            <motion.div 
              className="about-text"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              <h2>Full Stack Developer</h2>
              <p>
                Hello there! I'm a passionate Full Stack Developer with a strong foundation in both frontend and backend technologies. 
                I love creating beautiful, functional websites and applications that solve real-world problems.
              </p>
              <p>
                With a background in Computer Science and several years of hands-on experience, I specialize in building responsive 
                web applications using modern frameworks and tools. I'm constantly learning and adapting to new technologies to deliver 
                the best solutions for my clients and users.
              </p>
              <p>
                When I'm not coding, you can find me exploring new hiking trails, experimenting with photography, or diving into a good book. 
                I believe in maintaining a healthy work-life balance and finding inspiration in diverse experiences.
              </p>
              
              <div className="about-details">
                <div className="detail-item">
                  <strong>Name:</strong> Your Name
                </div>
                <div className="detail-item">
                  <strong>Email:</strong> info@yourname.com
                </div>
                <div className="detail-item">
                  <strong>Location:</strong> City, Country
                </div>
                <div className="detail-item">
                  <strong>Availability:</strong> Freelance & Full-time
                </div>
              </div>
              
              <a href="/resume" className="btn">Download Resume</a>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Skills Section */}
      <section className="section skills-section">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Technical Skills
          </motion.h2>
          
          <motion.div 
            className="skills-container"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            {skills.map((skillGroup, index) => (
              <div className="skill-group" key={index}>
                <h3>{skillGroup.category}</h3>
                <div className="skill-tags">
                  {skillGroup.items.map((skill, idx) => (
                    <span key={idx} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Education Section */}
      <section className="section education-section">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <FaUserGraduate className="section-icon" /> Education
          </motion.h2>
          
          <div className="timeline">
            {education.map((item, index) => (
              <motion.div 
                className="timeline-item"
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="timeline-content">
                  <div className="timeline-date">{item.year}</div>
                  <h3>{item.degree}</h3>
                  <h4>{item.institution}</h4>
                  <p>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Experience Section */}
      <section className="section experience-section">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <FaBriefcase className="section-icon" /> Work Experience
          </motion.h2>
          
          <div className="timeline">
            {experience.map((item, index) => (
              <motion.div 
                className="timeline-item"
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="timeline-content">
                  <div className="timeline-date">{item.year}</div>
                  <h3>{item.position}</h3>
                  <h4>{item.company}</h4>
                  <p>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;