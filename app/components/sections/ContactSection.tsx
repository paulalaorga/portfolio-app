import Terminal, { 
    PromptLine, 
    OutputText, 
    CommandLine, 
    ContactForm, 
    HighlightCyan, 
    HighlightMagenta 
  } from '../Terminal';
  
  interface ContactSectionProps {
    isOpen: boolean;
    onToggle: () => void;
    autoCollapse: boolean;
    onCollapseComplete: () => void;
  }
  
  export default function ContactSection({ 
    isOpen, 
    onToggle, 
    autoCollapse, 
    onCollapseComplete 
  }: ContactSectionProps) {
    return (
      <Terminal 
        title="contact.sh" 
        icon="mail" 
        delay={300}
        isOpen={isOpen}
        onToggle={onToggle}
        autoCollapse={autoCollapse}
        collapseDelay={18000} // 18 segundos para el formulario de contacto
        onCollapseComplete={onCollapseComplete}
      >
        <PromptLine text="./connect.sh --method=all" />
        <OutputText>
          <p className="mb-5">
            Estoy interesada en <HighlightCyan>colaboraciones</HighlightCyan> y 
            <HighlightMagenta> nuevas oportunidades</HighlightMagenta>. Puedes contactarme 
            a través del formulario a continuación o por WhatsApp.
          </p>
        </OutputText>
        
        <ContactForm />
        
        <div className="mt-10 pt-6 border-t border-cyan-400/20">
          <CommandLine index={1}>$ ./get_social_media.sh</CommandLine>
          <div className="mt-3 mb-3 flex flex-wrap gap-6 ml-6">
            <a href="https://linkedin.com/in/paulalaorga/" target="_blank" rel="noopener noreferrer" 
               className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
            <a href="https://github.com/paulalaorga" target="_blank" rel="noopener noreferrer" 
               className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C5.374 0 0 5.373 0 12C0 17.302 3.438 21.8 8.207 23.387C8.806 23.498 9 23.126 9 22.81V20.576C5.662 21.302 4.967 19.16 4.967 19.16C4.421 17.773 3.634 17.404 3.634 17.404C2.545 16.659 3.717 16.675 3.717 16.675C4.922 16.759 5.556 17.912 5.556 17.912C6.626 19.746 8.363 19.216 9.048 18.909C9.155 18.134 9.466 17.604 9.81 17.305C7.145 17 4.343 15.971 4.343 11.374C4.343 10.063 4.812 8.993 5.579 8.153C5.455 7.85 5.044 6.629 5.696 4.977C5.696 4.977 6.704 4.655 8.997 6.207C9.954 5.941 10.98 5.808 12 5.803C13.02 5.808 14.047 5.941 15.006 6.207C17.297 4.655 18.303 4.977 18.303 4.977C18.956 6.63 18.545 7.851 18.421 8.153C19.191 8.993 19.656 10.064 19.656 11.374C19.656 15.983 16.849 16.998 14.177 17.295C14.607 17.667 15 18.397 15 19.517V22.81C15 23.129 15.192 23.504 15.801 23.386C20.566 21.797 24 17.3 24 12C24 5.373 18.627 0 12 0Z"/>
              </svg>
              GitHub
            </a>
            <a href="mailto:paulalaorga@gmail.com" 
               className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
              </svg>
              Email
            </a>
            <a href="tel:+34606452632" 
               className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.574 2.81.7A2 2 0 0 1 21 16.92z"/>
              </svg>
              Teléfono
            </a>
          </div>
        </div>
      </Terminal>
    );
  }