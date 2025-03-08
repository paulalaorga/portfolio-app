// components/sections/EnhancedTerminal.tsx
'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import styles from './EnhancedTerminal.module.css'

interface LineProps {
  content: string;
  type: 'command' | 'output' | 'loading';
  delay: number;
  glitch?: boolean;
}

export default function EnhancedTerminal({ onComplete }: { onComplete: () => void }) {
  const lines: LineProps[] = [
    { content: "./iniciar_portfolio.sh", type: 'command', delay: 1 },
    { content: "sudo ./verificar_sistema.sh --configurar-entorno --iniciar", type: 'command', delay: 3.5 },
    { content: "> Verificando conexión... OK", type: 'output', delay: 6 },
    { content: "> Cargando habilidades: HTML5, CSS, JavaScript, TypeScript, React, Vue.js, Next.js", type: 'output', delay: 7, glitch: true },
    { content: "> Inicializando componentes de diseño: UI/UX, Responsive Design, Animaciones", type: 'output', delay: 8, glitch: true },
    { content: "> Conectando experiencia profesional... OK", type: 'output', delay: 9 },
    { content: "./presentar_portfolio.sh --modo=inmersivo --idioma=es", type: 'command', delay: 10.5 },
    { content: "> Iniciando visualización", type: 'loading', delay: 13 }
  ];
  
  // Inside your EnhancedTerminal component
useEffect(() => {
    console.log('Terminal phase mounted');
    
    const timer = setTimeout(() => {
      console.log('Terminal phase complete timer fired');
      onComplete();
    }, 14000);
    
    return () => {
      console.log('Terminal phase unmounted');
      clearTimeout(timer);
    };
  }, [onComplete]);
  
  return (
    <div className={styles.terminalContainer}>
      {/* Scanner effect */}
      <motion.div 
        className={styles.scanner}
        animate={{ 
          top: ["0%", "100%"],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity,
          ease: "linear" 
        }}
      />
      
      <motion.div 
        className={styles.terminalWindow}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className={styles.terminalHeader}>
          <div className={styles.terminalTitle}>paula_laorga_terminal.sh</div>
          <div className={styles.terminalControls}>
            <div className={`${styles.controlDot} ${styles.red}`}></div>
            <div className={`${styles.controlDot} ${styles.yellow}`}></div>
            <div className={`${styles.controlDot} ${styles.green}`}></div>
          </div>
        </div>
        
        <div className={styles.terminalContent}>
          {lines.map((line, index) => (
            <TerminalLine key={index} {...line} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function TerminalLine({ content, type, delay, glitch }: LineProps) {
  const [visible, setVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
      
      if (type === 'command') {
        // Implement typing effect for commands
        let i = 0;
        const interval = setInterval(() => {
          setTypedText(content.substring(0, i + 1));
          i++;
          
          if (i >= content.length) {
            clearInterval(interval);
          }
        }, 50);
        
        return () => clearInterval(interval);
      }
    }, delay * 1000);
    
    return () => clearTimeout(timer);
  }, [content, delay, type]);
  
  if (!visible) return null;
  
  if (type === 'command') {
    return (
      <div className={styles.terminalLine}>
        <span className={styles.commandPrompt}>$</span>
        <span className={styles.typingText}>{typedText}</span>
      </div>
    );
  }
  
  if (type === 'output') {
    return (
      <div className={styles.terminalLine}>
        <div className={`${styles.commandOutput} ${glitch ? styles.glitch : ''}`} data-text={content}>
          {content}
        </div>
      </div>
    );
  }
  
  if (type === 'loading') {
    return (
      <div className={styles.terminalLine}>
        <div className={styles.commandOutput}>
          {content}
          <div className={styles.loadingAnimation}>
            <div className={styles.loadingDot}></div>
            <div className={styles.loadingDot}></div>
            <div className={styles.loadingDot}></div>
          </div>
        </div>
      </div>
    );
  }
  
  return null;
}