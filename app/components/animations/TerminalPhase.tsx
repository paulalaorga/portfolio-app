// components/sections/TerminalPhase.tsx
'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import styles from './TerminalPhase.module.css'

interface TerminalLine {
  text: string;
  type: 'command' | 'output';
  glitch?: boolean;
}

export default function TerminalPhase({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<TerminalLine[]>([])
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    console.log("TerminalPhase mounted")
    
    const terminalSequence: TerminalLine[] = [
      { text: "./iniciar_portfolio.sh", type: 'command' },
      { text: "sudo ./verificar_sistema.sh --configurar-entorno --iniciar", type: 'command' },
      { text: "Verificando conexión... OK", type: 'output' },
      { text: "Cargando habilidades: HTML5, CSS, JavaScript, TypeScript, React, Vue.js, Next.js", type: 'output', glitch: true },
      { text: "Inicializando componentes de diseño: UI/UX, Responsive Design, Animaciones", type: 'output', glitch: true },
      { text: "Conectando experiencia profesional... OK", type: 'output' },
      { text: "./presentar_portfolio.sh --modo=inmersivo", type: 'command' },
    ]
    
    const timeoutIds: NodeJS.Timeout[] = []
    
    // Add each line with a delay
    terminalSequence.forEach((line, index) => {
      const timeout = setTimeout(() => {
        setLines(prev => [...prev, line])
        
        // After the last command, show loading animation before completing
        if (index === terminalSequence.length - 1) {
          setLoading(true)
          setTimeout(() => {
            console.log("Terminal sequence complete, calling onComplete")
            onComplete()
          }, 3000)
        }
      }, 1000 * (index + 1))
      
      timeoutIds.push(timeout)
    })
    
    return () => {
      console.log("TerminalPhase unmounting, clearing timeouts")
      timeoutIds.forEach(id => clearTimeout(id))
    }
  }, [onComplete])
  
  return (
    <div className={styles.terminalContainer}>
      {/* Scanner effect */}
      <motion.div 
        className={styles.scanner}
        animate={{
          top: ["0%", "100%"],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <div className={styles.terminalWindow}>
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
            <motion.div 
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={styles.terminalLine}
            >
              {line.type === 'command' ? (
                <>
                  <span className={styles.commandPrompt}>$</span>
                  <span className={styles.commandText}>{line.text}</span>
                </>
              ) : (
                <div className={styles.commandOutput}>
                  {line.glitch ? (
                    <span className={styles.glitch} data-text={line.text}>
                      &gt; {line.text}
                    </span>
                  ) : (
                    <>&gt; {line.text}</>
                  )}
                </div>
              )}
            </motion.div>
          ))}
          
          {loading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={styles.terminalLine}
            >
              <div className={styles.commandOutput}>
                &gt; Iniciando visualización
                <div className={styles.loadingAnimation}>
                  <div className={styles.loadingDot}></div>
                  <div className={styles.loadingDot}></div>
                  <div className={styles.loadingDot}></div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}