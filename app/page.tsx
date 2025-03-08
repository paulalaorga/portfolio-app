// app/page.tsx
'use client'

import { useState } from 'react'
import IntroSequence from './components/sections/IntroSequence'
import { motion } from 'framer-motion'

export default function Home() {
  const [introCompleted, setIntroCompleted] = useState(false)
  
  return (
    <main className="min-h-screen bg-black text-white">
      {!introCompleted ? (
        <IntroSequence onComplete={() => setIntroCompleted(true)} />
      ) : (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-3xl">
            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Paula <span className="text-cyan-400">Laorga</span>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-white/70 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Creando interfaces intuitivas con una perspectiva integral de 
              <span className="text-cyan-400"> comunicación</span> y 
              <span className="text-pink-500"> marketing digital</span>.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <a 
                href="#projects" 
                className="px-6 py-3 bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition-colors text-center"
              >
                Ver proyectos
              </a>
              <a 
                href="#contact" 
                className="px-6 py-3 border border-white/30 text-white hover:border-cyan-400 transition-colors text-center"
              >
                Contacto
              </a>
            </motion.div>
          </div>
        </div>
      )}
    </main>
  )
}