// app/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

// Definimos los estados de la animación
type AnimationState = 'initial' | 'animation' | 'main'

export default function Home() {
  // Estado para controlar la animación
  const [animationState, setAnimationState] = useState<AnimationState>('initial')
  
  // Comprobar si debemos mostrar la animación o no
  useEffect(() => {
    // Comprobar si ya hemos visto la animación antes
    const hasSeenAnimation = localStorage.getItem('hasSeenAnimation') === 'true'
    
    if (hasSeenAnimation) {
      // Si ya vimos la animación, ir directo al contenido principal
      setAnimationState('main')
    } else {
      // Si no, mostrar la animación
      setAnimationState('animation')
    }
    
    // Tecla ESC para saltar la animación
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setAnimationState('main')
        localStorage.setItem('hasSeenAnimation', 'true')
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
  
  // Función para completar la animación
  const handleAnimationComplete = () => {
    setAnimationState('main')
    localStorage.setItem('hasSeenAnimation', 'true')
  }
  
  // Función para forzar ver la animación de nuevo (para pruebas)
  const resetAnimation = () => {
    localStorage.removeItem('hasSeenAnimation')
    window.location.reload()
  }
  
  return (
    <main className="min-h-screen bg-black">
      <AnimatePresence mode="wait">
        {/* ANIMACIÓN DE INTRODUCCIÓN */}
        {animationState === 'animation' && (
          <motion.div 
            key="animation"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-center flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {/* Logo */}
              <motion.div
                className="mb-6 relative w-40 h-40"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20,
                  delay: 0.5 
                }}
              >
                <Image
                  src="/logo-pl.png"
                  alt="Paula Laorga"
                  fill
                  className="object-contain filter brightness-110 drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]"
                />
              </motion.div>
              
              {/* Nombre */}
              <motion.h1
                className="text-5xl md:text-7xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                Paula <span className="text-cyan-400">Laorga</span>
              </motion.h1>
              
              {/* Subtítulo */}
              <motion.p
                className="text-xl text-cyan-400 font-mono mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.8 }}
              >
                Front-End Developer
              </motion.p>
              
              {/* Botón */}
              <motion.button
                className="px-8 py-3 bg-transparent border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-colors duration-300 font-mono"
                onClick={handleAnimationComplete}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.4, duration: 0.8 }}
                whileHover={{ boxShadow: '0 0 15px 5px rgba(0, 240, 255, 0.3)' }}
              >
                ENTRAR
              </motion.button>
              
              {/* Botón para saltar */}
              <motion.button
                className="fixed bottom-4 left-4 text-xs text-gray-500 hover:text-cyan-400"
                onClick={handleAnimationComplete}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 3, duration: 0.8 }}
              >
                Saltar intro
              </motion.button>
            </motion.div>
          </motion.div>
        )}
        
        {/* CONTENIDO PRINCIPAL */}
        {animationState === 'main' && (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen flex items-center justify-center p-4"
          >
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 md:gap-6 mb-8">
                {/* Logo */}
                <motion.div
                  className="relative w-16 h-16 md:w-20 md:h-20"
                  whileHover={{ 
                    scale: 1.05, 
                    filter: 'drop-shadow(0 0 12px rgba(0, 240, 255, 0.7))' 
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Image 
                    src="/logo-pl.png" 
                    alt="Paula Laorga Logo" 
                    fill
                    className="object-contain"
                  />
                </motion.div>
                
                <motion.h1 
                  className="text-5xl md:text-7xl font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Paula <span className="text-cyan-400">Laorga</span>
                </motion.h1>
              </div>
              
              <motion.p
                className="text-xl md:text-2xl text-white/70 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Creando interfaces intuitivas con una perspectiva integral de 
                <span className="text-cyan-400"> comunicación</span> y 
                <span className="text-pink-500"> marketing digital</span>.
              </motion.p>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <a 
                  href="#projects" 
                  className="px-6 py-3 bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition-colors text-center group"
                >
                  <span className="flex items-center justify-center gap-2">
                    Ver proyectos
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </a>
                <a 
                  href="#contact" 
                  className="px-6 py-3 border border-white/30 text-white hover:border-cyan-400 transition-colors text-center"
                >
                  Contacto
                </a>
              </motion.div>
              
              {/* Botón para probar la animación de nuevo (solo para desarrollo) */}
              <motion.button
                onClick={resetAnimation}
                className="mt-10 text-xs text-gray-500 hover:text-cyan-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 1.5 }}
              >
                Resetear animación
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}