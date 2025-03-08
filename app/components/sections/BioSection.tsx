import Terminal, { PromptLine, OutputText, CommandLine, HighlightCyan, HighlightMagenta } from '../Terminal';

interface BioSectionProps {
  isOpen: boolean;
  onToggle: () => void;
  autoCollapse: boolean;
  onCollapseComplete: () => void;
}

export default function BioSection({ 
  isOpen, 
  onToggle, 
  autoCollapse, 
  onCollapseComplete 
}: BioSectionProps) {
  return (
    <Terminal 
      title="bio.sh" 
      icon="user" 
      delay={100}
      isOpen={isOpen}
      onToggle={onToggle}
      autoCollapse={autoCollapse}
      collapseDelay={12000} // 12 segundos para leer toda la bio
      onCollapseComplete={onCollapseComplete}
    >
      <PromptLine text="./get_info.sh --section=bio" />
      <OutputText>
        <p className="mb-4">
          Con un background en <HighlightCyan>Comunicación Corporativa</HighlightCyan>, 
          <HighlightMagenta> Marketing Digital</HighlightMagenta> y <HighlightCyan>Media</HighlightCyan>, 
          aporto una perspectiva integral al <HighlightMagenta>Desarrollo Front-End</HighlightMagenta>.
        </p>
        <p className="mb-4">
          Especializada en branding, storytelling y métricas de rendimiento, creo interfaces 
          intuitivas y de alto rendimiento.
        </p>
        <p>
          Apasionada por el aprendizaje continuo e impulsada por los resultados, 
          estoy ansiosa por contribuir de manera significativa a proyectos innovadores.
        </p>
      </OutputText>
      
      <CommandLine index={1}>$ ./list_skills.sh</CommandLine>
      <div className="ml-6 mt-3 mb-3">
        <CommandLine index={2}>➤ Frontend: HTML5, CSS, JavaScript, TypeScript, React, Vue.js, Next.js, Tailwind</CommandLine>
        <CommandLine index={3}>➤ Frameworks: Tailwind, Bootstrap, Sass</CommandLine>
        <CommandLine index={4}>➤ Backend: PHP, Node.js, APIs, Amazon AWS Amplify, GraphQL</CommandLine>
        <CommandLine index={5}>➤ Tools: Git, Jira, Notion, Vercel, Slack, Render, Monday, Adobe Suite</CommandLine>
      </div>
      
      <CommandLine index={6}>$ ./list_languages.sh</CommandLine>
      <div className="ml-6 mt-3 mb-3">
        <CommandLine index={7}>➤ English: Professional Proficiency (C2)</CommandLine>
        <CommandLine index={8}>➤ Spanish: Native</CommandLine>
      </div>
    </Terminal>
  );
}