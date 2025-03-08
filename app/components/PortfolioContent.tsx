'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import BioSection from './sections/BioSection'
import ProjectsSection from './sections/ProjectSection'
import ContactSection from './sections/ContactSection'

interface PortfolioContentProps {
  initialSection?: 'bio' | 'projects' | 'contact';
  onBack?: () => void;
  showBackButton?: boolean;
}

export default function PortfolioContent({ 
  initialSection = 'bio', 
  onBack, 
  showBackButton = true 
}: PortfolioContentProps) {
  // Estados para las terminales
  const [bioTerminalOpen, setBioTerminalOpen] = useState(false)
  const [projectsTerminalOpen, setProjectsTerminalOpen] = useState(false)
  const [contactTerminalOpen, setContactTerminalOpen] = useState(false)
  
  // Estado para el control de la secuencia
  const [currentSequence, setCurrentSequence] = useState(
    initialSection === 'bio' ? 0 : 
    initialSection === 'projects' ? 1 : 
    initialSection === 'contact' ? 2 : 0
  )
  
  // Iniciar la secuencia de presentación basada en la sección inicial
  useEffect(() => {
    // Comenzar con la terminal apropiada después de un retraso inicial
    const initialTimer = setTimeout(() => {
      if (initialSection === 'bio' || initialSection === 'projects') {
        setBioTerminalOpen(true)
        
        // Si estamos comenzando en projects, activamos inmediatamente la secuencia
        if (initialSection === 'projects') {
          handleBioComplete()
        }
      } else if (initialSection === 'contact') {
        // Si estamos comenzando en contacto, activamos toda la secuencia
        setCurrentSequence(2)
        setTimeout(() => {
          setContactTerminalOpen(true)
        }, 300)
      }
    }, 500)
    
    return () => clearTimeout(initialTimer)
  }, [initialSection])
  
  // Manejar el cambio de secuencia
  const handleBioComplete = () => {
    setCurrentSequence(1)
    setTimeout(() => {
      setProjectsTerminalOpen(true)
    }, 500)
  }
  
  const handleProjectsComplete = () => {
    setCurrentSequence(2)
    setTimeout(() => {
      setContactTerminalOpen(true)
    }, 500)
  }
  
  const handleContactComplete = () => {
    setCurrentSequence(3)
    // Aquí podríamos añadir alguna acción final si es necesario
  }
  
  return (
    <main className="min-h-screen py-16 overflow-auto relative">
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        {/* Botón para volver (solo si showBackButton es true y existe onBack) */}
        {showBackButton && onBack && (
          <motion.button
            onClick={onBack}
            className="mb-8 px-4 py-2 flex items-center gap-2 text-white/70 hover:text-cyan-400 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Volver
          </motion.button>
        )}
        
        {/* Encabezado con logo */}
        <motion.header 
          className="flex items-center mb-16 pt-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div 
            className="flex items-center gap-4"
            whileHover={{ scale: 1.03 }}
          >
            <div className="w-12 h-12 relative">
              <Image 
                src="/logo-pl.png" 
                alt="PL Logo" 
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <h1 className="text-3xl font-mono text-white">
              <span className="text-cyan-400">Paula</span> Laorga<span className="text-pink-500 animate-pulse">_</span>
            </h1>
          </motion.div>
        </motion.header>
        
        {/* Sección Bio */}
        <AnimatePresence>
          {(initialSection === 'bio' || initialSection === 'projects' || bioTerminalOpen) && (
            <BioSection 
              isOpen={bioTerminalOpen}
              onToggle={() => setBioTerminalOpen(!bioTerminalOpen)}
              autoCollapse={currentSequence === 0}
              onCollapseComplete={handleBioComplete}
            />
          )}
        </AnimatePresence>
        
        {/* Sección Proyectos */}
        <AnimatePresence>
          {(currentSequence >= 1 || projectsTerminalOpen) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              id="projects"
            >
              <ProjectsSection 
                isOpen={projectsTerminalOpen}
                onToggle={() => setProjectsTerminalOpen(!projectsTerminalOpen)}
                autoCollapse={currentSequence === 1}
                onCollapseComplete={handleProjectsComplete}
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Sección Contacto */}
        <AnimatePresence>
          {(currentSequence >= 2 || contactTerminalOpen || initialSection === 'contact') && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              id="contact"
            >
              <ContactSection 
                isOpen={contactTerminalOpen || initialSection === 'contact'}
                onToggle={() => setContactTerminalOpen(!contactTerminalOpen)}
                autoCollapse={currentSequence === 2}
                onCollapseComplete={handleContactComplete}
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Footer */}
        <motion.footer 
          className="mt-20 text-center text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <div className="mb-3 flex justify-center">
            <div className="w-8 h-8 relative">
              <Image 
                src="/logo-pl.png" 
                alt="" 
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
          </div>
          <p>© {new Date().getFullYear()} Paula Laorga</p>
          <p className="mt-1">Diseñado y desarrollado con <span className="text-pink-500">♥</span></p>
        </motion.footer>
      </div>
    </main>
  )
}