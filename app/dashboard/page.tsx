// app/dashboard/page.tsx
'use client'

import { useState } from 'react'
import Terminal, { 
  PromptLine, 
  OutputText, 
  CommandLine,
  HighlightCyan,
  HighlightMagenta,
} from '../components/Terminal'

// Define types for our portfolio data
interface Project {
  title: string
  description: string
  url: string
  tech: string[]
}

interface Experience {
  position: string
  company: string
  period: string
  location: string
  description: string[]
}

interface Education {
  degree: string
  institution: string
  period: string
}

export default function PortfolioDashboard() {
  // State for active section
  const [activeSection, setActiveSection] = useState('about')
  
  // Sample data from your resume
  const projects: Project[] = [
    {
      title: "Art History App",
      description: "Interactive app to explore historical art periods and representative artworks.",
      url: "https://art-history-app.onrender.com/#/",
      tech: ["Vue.js", "REST API", "Render"]
    },
    {
      title: "Shopping List App",
      description: "Personalized shopping list tool with server-side recipe integration.",
      url: "https://paulalaorga.github.io/phase2-project/",
      tech: ["React.js", "REST API"]
    }
  ]
  
  const experiences: Experience[] = [
    {
      position: "Front-End Developer",
      company: "Factory AI",
      period: "Apr '24 - Oct '24",
      location: "Sydney, NSW",
      description: [
        "Built scalable interfaces using Next.js (TypeScript) and Tremor, ensuring optimal responsiveness and smooth performance on Vercel.",
        "Enhanced application responsiveness and implemented key features to improve user experience.",
        "Managed tasks using Jira and maintained technical documentation in Notion.",
        "Integrated backend services using Amazon AWS Amplify and GraphQL."
      ]
    },
    {
      position: "Web Developer",
      company: "King Living",
      period: "Aug '23 - Aug '24",
      location: "Sydney, NSW",
      description: [
        "Developed eCommerce solutions with Magento (PHP), enhancing platform performance user interfaces with HTML5, CSS3, and JavaScript, ensuring cross-browser compatibility."
      ]
    }
  ]
  
  const education: Education[] = [
    {
      degree: "Bachelor's Degree in Computer Engineering",
      institution: "Valencia International University (VIU)",
      period: "Mar '23 - Present"
    },
    {
      degree: "Front End Development Transform Course",
      institution: "Academy Xi - Sydney",
      period: "Jul '23 - Dec '23"
    },
    {
      degree: "Master in Corporate Communication and Digital Marketing",
      institution: "CESMA Business School - Madrid",
      period: "Sep '17 - Jun '18"
    },
    {
      degree: "Bachelor of Arts in Media",
      institution: "Universidad Antonio de Nebrija - Madrid",
      period: "Sep '08 - Jun '12"
    }
  ]
  
  const skills = [
    { category: "Frontend", items: ["HTML5", "CSS", "JavaScript", "TypeScript", "React", "Vue.js", "Next.js", "Tailwind", "Bootstrap", "Sass"] },
    { category: "Backend", items: ["PHP", "Node.js", "APIs", "Amazon AWS Amplify", "GraphQL"] },
    { category: "Tools", items: ["Git", "Jira", "Notion", "Vercel", "Slack", "Render", "Monday", "Adobe Suite"] }
  ]
  
  // Create horizontal and vertical grid lines
  const horizontalLines = Array.from({ length: 8 }).map((_, index) => {
    const position = `${(index + 1) * 12.5}%`;
    return (
      <div 
        key={`h-${index}`} 
        className="grid-line grid-line-horizontal"
        style={{ top: position }}
      />
    );
  });

  const verticalLines = Array.from({ length: 8 }).map((_, index) => {
    const position = `${(index + 1) * 12.5}%`;
    return (
      <div 
        key={`v-${index}`} 
        className="grid-line grid-line-vertical"
        style={{ left: position }}
      />
    );
  });

  return (
    <div className="portfolio-dashboard">
      {/* Custom cursor */}
      
      {/* Noise overlay */}
      <div className="noise"></div>

      {/* Grid lines overlay */}
      <div className="grid-lines">
        {horizontalLines}
        {verticalLines}
      </div>

      {/* Scanner line effect */}
      <div className="scanner"></div>
      
        
        {/* Navigation */}
        <nav className="dashboard-nav">
          {['about', 'experience', 'projects', 'education', 'skills'].map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`nav-item ${activeSection === section ? 'active' : ''}`}
            >
              {section}
            </button>
          ))}
        </nav>
        
        {/* Main Content - Dashboard Grid */}
        <main className="dashboard-grid">
          {/* About Me Section */}
          <section className={`dashboard-section ${activeSection === 'about' ? 'visible' : 'hidden'}`}>
            <Terminal title="about_me.sh" icon="user" delay={100}>
              <PromptLine text="cat about_me.txt" />
              <OutputText>
                <p className="section-text">
                  With a background in Corporate Communication, Digital Marketing, and Media, I bring a 360° perspective to Front-End Development.
                </p>
                <p className="section-text">
                  Skilled in branding, storytelling, and performance metrics, I create intuitive and high-performing interfaces.
                </p>
                <p className="section-text">
                  Passionate about continuous learning and driven by results, Im eager to contribute meaningfully to innovative projects.
                </p>
                
                <CommandLine index={3}>
                  <HighlightCyan>paula@portfolio</HighlightCyan>:<HighlightMagenta>~/perfil</HighlightMagenta>$ ./mostrar_idiomas.sh
                </CommandLine>
                
                <div className="profile-section">
                  <h4 className="subsection-title">Languages</h4>
                  <ul className="profile-list">
                    <li className="profile-item">
                      <span>English</span>
                      <span className="highlight">C2</span>
                    </li>
                    <li className="profile-item">
                      <span>Spanish</span>
                      <span className="highlight">Native</span>
                    </li>
                  </ul>
                </div>
                
                <CommandLine index={4}>
                  <HighlightCyan>paula@portfolio</HighlightCyan>:<HighlightMagenta>~/contacto</HighlightMagenta>$ ./mostrar_contacto.sh
                </CommandLine>
                
                <div className="profile-section">
                  <h4 className="subsection-title">Contact</h4>
                  <ul className="profile-list">
                    <li className="profile-item">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      <span>+34 606452632</span>
                    </li>
                    <li className="profile-item">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                      <span>paulalaorga@gmail.com</span>
                    </li>
                  </ul>
                </div>
              </OutputText>
            </Terminal>
          </section>
          
          {/* Experience Section */}
          <section className={`dashboard-section ${activeSection === 'experience' ? 'visible' : 'hidden'}`}>
            <Terminal title="experience.sh" icon="code" delay={200}>
              <PromptLine text="./mostrar_experiencia.sh" />
              <OutputText>
                <div className="timeline">
                  {experiences.map((exp, index) => (
                    <div key={index} className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content">
                        <div className="timeline-header">
                          <h4 className="timeline-title">{exp.position}</h4>
                          <p className="timeline-subtitle">{exp.company}</p>
                          <p className="timeline-meta">{exp.period}</p>
                          <p className="timeline-meta">{exp.location}</p>
                        </div>
                        <div className="timeline-body">
                          <ul className="timeline-list">
                            {exp.description.map((item, i) => (
                              <li key={i} className="timeline-list-item">{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </OutputText>
            </Terminal>
          </section>

          {/* Projects Section */}
          <section className={`dashboard-section ${activeSection === 'projects' ? 'visible' : 'hidden'}`}>
            <Terminal title="projects.sh" icon="code" delay={300}>
              <PromptLine text="./mostrar_proyectos.sh" />
              <OutputText>
                <div className="projects-grid">
                  {projects.map((project, index) => (
                    <div key={index} className="cyber-panel digital-panel">
                      <div className="panel-glow-top"></div>
                      <div className="panel-glow-bottom"></div>
                      <div className="status-indicator pink"></div>
                      
                      <h4 className="project-title">{project.title}</h4>
                      <p className="project-description">{project.description}</p>
                      <div className="tech-tags">
                        {project.tech.map((tech, i) => (
                          <span key={i} className="cyber-tag">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <a 
                        href={project.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        View Project
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                          <line x1="7" y1="17" x2="17" y2="7"></line>
                          <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                      </a>
                    </div>
                  ))}
                </div>
              </OutputText>
            </Terminal>
          </section>

          {/* Education Section */}
          <section className={`dashboard-section ${activeSection === 'education' ? 'visible' : 'hidden'}`}>
            <Terminal title="education.sh" icon="code" delay={400}>
              <PromptLine text="./mostrar_educacion.sh" />
              <OutputText>
                <div className="education-grid">
                  {education.map((edu, index) => (
                    <div key={index} className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="education-content">
                        <h4 className="education-title">{edu.degree}</h4>
                        <p className="education-institution">{edu.institution}</p>
                        <p className="education-period">{edu.period}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </OutputText>
            </Terminal>
          </section>

          {/* Skills Section */}
          <section className={`dashboard-section ${activeSection === 'skills' ? 'visible' : 'hidden'}`}>
            <Terminal title="skills.sh" icon="code" delay={500}>
              <PromptLine text="./mostrar_habilidades.sh" />
              <OutputText>
                <div className="skills-grid">
                  {skills.map((skillGroup, index) => (
                    <div key={index} className="cyber-panel digital-panel">
                      <div className="panel-glow-top"></div>
                      <div className="panel-glow-bottom"></div>
                      <div className="status-indicator yellow"></div>
                      
                      <h4 className="skills-category">{skillGroup.category}</h4>
                      <div className="skills-tags">
                        {skillGroup.items.map((skill, i) => (
                          <span key={i} className="cyber-tag">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </OutputText>
            </Terminal>
          </section>
        </main>
        
        {/* Footer */}
        <footer className="dashboard-footer">
          <p className="footer-text">&copy; {new Date().getFullYear()} Paula Laorga | Front-End Developer</p>
          <div className="footer-social">
            <a href="https://github.com/paulalaorga" target="_blank" rel="noopener noreferrer" className="social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a href="https://linkedin.com/in/paulalaorga/" target="_blank" rel="noopener noreferrer" className="social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="mailto:paulalaorga@gmail.com" className="social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
          </div>
        </footer>
      </div>
  )
}