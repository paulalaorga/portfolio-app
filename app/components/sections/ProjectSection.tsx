import Terminal, { PromptLine, OutputText, CommandLine, ProjectGrid, ProjectCard } from '../Terminal';

interface ProjectsSectionProps {
  isOpen: boolean;
  onToggle: () => void;
  autoCollapse: boolean;
  onCollapseComplete: () => void;
}

export default function ProjectsSection({ 
  isOpen, 
  onToggle, 
  autoCollapse, 
  onCollapseComplete 
}: ProjectsSectionProps) {
  return (
    <Terminal 
      title="projects.sh" 
      icon="code" 
      delay={300}
      isOpen={isOpen}
      onToggle={onToggle}
      autoCollapse={autoCollapse}
      collapseDelay={15000} // 15 segundos para ver los proyectos
      onCollapseComplete={onCollapseComplete}
    >
      <PromptLine text="./get_projects.sh --filter=recent --sort=date" />
      <OutputText>
        <p className="mb-5">
          Aquí tienes una selección de mis proyectos más recientes.
          Cada uno de ellos refleja mi enfoque en crear experiencias de usuario
          intuitivas y atractivas con un código limpio y eficiente.
        </p>
      </OutputText>
      
      <ProjectGrid>
        <ProjectCard
          title="Art History App"
          description="Aplicación interactiva para explorar períodos artísticos históricos y obras representativas."
          imageUrl="/projects/art-history-app.jpg"
          tags={["Vue.js", "REST API", "Render"]}
          link="https://art-history-app.onrender.com/#/"
        />
        <ProjectCard
          title="Shopping List App"
          description="Herramienta de lista de compras personalizada con integración de recetas del lado del servidor."
          imageUrl="/projects/shopping-list-app.jpg"
          tags={["React.js", "REST API", "GitHub Pages"]}
          link="https://paulalaorga.github.io/phase2-project/"
        />
        <ProjectCard
          title="E-commerce UI"
          description="Desarrollo de interfaces para plataforma de comercio electrónico con Magento, optimizando la experiencia de usuario y rendimiento."
          imageUrl="/projects/ecommerce-ui.jpg"
          tags={["Magento", "PHP", "HTML5", "CSS3", "JavaScript"]}
          link="#"
        />
        <ProjectCard
          title="AI Factory Dashboard"
          description="Interfaz escalable construida con Next.js y TypeScript para visualización de datos y gestión de aplicaciones AI."
          imageUrl="/projects/ai-factory.jpg"
          tags={["Next.js", "TypeScript", "Tremor", "AWS Amplify"]}
          link="#"
        />
      </ProjectGrid>
      
      <CommandLine index={1}>$ ./check_github.sh</CommandLine>
      <div className="mt-3 mb-3">
        <a href="https://github.com/paulalaorga" target="_blank" rel="noopener noreferrer" 
           className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors ml-6">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C5.374 0 0 5.373 0 12C0 17.302 3.438 21.8 8.207 23.387C8.806 23.498 9 23.126 9 22.81V20.576C5.662 21.302 4.967 19.16 4.967 19.16C4.421 17.773 3.634 17.404 3.634 17.404C2.545 16.659 3.717 16.675 3.717 16.675C4.922 16.759 5.556 17.912 5.556 17.912C6.626 19.746 8.363 19.216 9.048 18.909C9.155 18.134 9.466 17.604 9.81 17.305C7.145 17 4.343 15.971 4.343 11.374C4.343 10.063 4.812 8.993 5.579 8.153C5.455 7.85 5.044 6.629 5.696 4.977C5.696 4.977 6.704 4.655 8.997 6.207C9.954 5.941 10.98 5.808 12 5.803C13.02 5.808 14.047 5.941 15.006 6.207C17.297 4.655 18.303 4.977 18.303 4.977C18.956 6.63 18.545 7.851 18.421 8.153C19.191 8.993 19.656 10.064 19.656 11.374C19.656 15.983 16.849 16.998 14.177 17.295C14.607 17.667 15 18.397 15 19.517V22.81C15 23.129 15.192 23.504 15.801 23.386C20.566 21.797 24 17.3 24 12C24 5.373 18.627 0 12 0Z"/>
          </svg>
          Ver más proyectos en GitHub
        </a>
      </div>
    </Terminal>
  );
}