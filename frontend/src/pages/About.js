import React from 'react';
import { motion } from 'framer-motion';
import { FaUserGraduate, FaBriefcase} from 'react-icons/fa';
import './About.css';


const About = () => {
  const skills = [
    { category: "Frontend", items: ["HTML5", "CSS3", "JavaScript", "React", "Responsive Design", "TypeScript", "Tailwind CSS"] },
    { category: "Backend", items: ["Python","C/C++","Rust","Go","Flask", "Node.js", "Express", "RESTful APIs", "GraphQL"] },
    { category: "Database", items: ["MongoDB","PowerBI","Tableau","MySQL", "SQLite", "AWS", "Firebase"] },
    { category: "Frameworks, Libraries and Tools", items: ["PyTorch", "Django", "Spring Boot", "pandas", "Docker", "AWS (EC2, S3, Lambda, RDS, CloudWatch)", "Jenkins"] }
  ];
  
  const education = [
    {
      degree: "BA Honours Computer Science AI and Machine Learning",
      institution: "Carleton University",
      year: "2023 - 2027",
      description: "Coursework: Systems Programming, Discrete Structures, Abstract Data Types and Algorithms, Linear Algebra II"
    },
    {
      degree: "Web Development Bootcamp",
      institution: "Coding Academy",
      year: "2025",
      description: "Intensive 12-week program covering full-stack development technologies."
    }
  ];
  
  const experience = [
    {
      position: "Junior Data Analyst",
      company: "Department of National Defence (VCDS)",
      year: "Jan. 2025 – Present",
      description:
        "Analyzing large datasets to improve strategic decision-making across the VCDS branch. Developed Power BI dashboards that reduced reporting time by 40%, while automating workflows in Python to enhance efficiency.",
    },
    {
      position: "Crew Supervisor",
      company: "Crispys Resto Grill",
      year: "Aug. 2020 – Jan. 2025",
      description:
        "Led a team of 8-10 employees, ensuring seamless operations and high customer satisfaction. Implemented workflow optimizations that enhanced restaurant efficiency and service speed.",
    },
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
              <img src="/files/mosuit.jpg" alt="Your Name not displayed" />
            </motion.div>
            
            <motion.div 
              className="about-text"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              <h2>Who am I?</h2>
                <p>
                    Hey there! I'm <strong>Mohammad</strong>, a passionate <strong>Full Stack Developer</strong> with a strong background in 
                    <strong> backend engineering, cloud technologies, and AI-driven applications</strong>. I love turning complex problems 
                    into seamless, scalable, and efficient solutions—whether it's building <strong>machine learning models</strong>, 
                    optimizing <strong>multithreaded systems</strong>, or creating <strong>high-performance web applications</strong>.
                </p>
                <p>
                    Currently pursuing a <strong>B.A. Honours in Computer Science</strong> at <strong>Carleton University</strong>, 
                    I have hands-on experience working with <strong>Python, Rust, C/C++, TypeScript, and Golang</strong>. My projects 
                    range from an <strong>AI-powered UFC fight prediction model</strong> to a <strong>peer-to-peer networking system </strong> 
                    and an <strong>EV charger booking app</strong>. I specialize in <strong>React, Flask, Django, Spring Boot, AWS, Docker, 
                    and Kubernetes</strong>, ensuring that the applications I develop are both scalable and efficient.
                </p>
                <p>
                    In my current role as a <strong>Junior Data Analyst at the Department of National Defence</strong>, I enhance 
                    data workflows, automate reporting processes, and develop <strong>interactive Power BI dashboards</strong>, 
                    leading to more efficient decision-making across the organization.
                </p>
                <p>
                    <strong>Outside of Tech: </strong>  
                    When I'm not coding, you’ll find me:  
                    <ul>
                        <li>🏋️ Hitting the gym and practicing <strong>wrestling</strong> – I love the discipline and strategy it brings.</li>
                        <li>👨‍👩‍👦 Spending time with <strong>family</strong> – my biggest support system.</li>
                        <li>🌍 Exploring new ideas through <strong>books, photography, and deep conversations</strong>.</li>
                    </ul>
                </p>
                <p>
                    If you're interested in collaborating, feel free to reach out—I'm always up for a challenge and love building 
                    meaningful projects!
                </p>
              <div className="about-details">
                <div className="detail-item">
                  <strong>Name:</strong> Mohammad "Mo" Saad
                </div>
                <div className="detail-item">
                  <strong>Email:</strong> mohammadhsaad05@gmail.com
                </div>
                <div className="detail-item">
                  <strong>Location:</strong> Ottawa, Canada
                </div>
                <div className="detail-item">
                  <strong>Availability:</strong> Full Time for Co-Op Terms
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