// components/animations/MainContentTransition.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './MainContentTransition.module.css'

interface MainContentTransitionProps {
  children: React.ReactNode
  isVisible: boolean
}

export default function MainContentTransition({ 
  children, 
  isVisible 
}: MainContentTransitionProps) {
  const [contentReady, setContentReady] = useState(false)
  const [transitionPhase, setTransitionPhase] = useState(0)
  
  useEffect(() => {
    // Secuencia más compleja de transición
    if (isVisible) {
      // Fase 1: Inicialización
      setTransitionPhase(1)
      
      // Fase 2: Después de la animación de la cuadrícula
      const phase2Timer = setTimeout(() => {
        setTransitionPhase(2)
      }, 2500)
      
      // Fase 3: Después de la animación del círculo
      const phase3Timer = setTimeout(() => {
        setTransitionPhase(3)
      }, 4500)
      
      // Fase 4: Finalización y muestra del contenido
      const contentTimer = setTimeout(() => {
        setContentReady(true)
      }, 5500)
      
      return () => {
        clearTimeout(phase2Timer)
        clearTimeout(phase3Timer)
        clearTimeout(contentTimer)
      }
    } else {
      setTransitionPhase(0)
      setContentReady(false)
    }
  }, [isVisible])
  
  // Dividir la cuadrícula en secciones para efectos secuenciales
  const renderGridCells = () => {
    // Crear celdas con diferentes retardos según su posición
    return Array.from({ length: 36 }).map((_, index) => {
      const row = Math.floor(index / 6)
      const col = index % 6
      
      // Calcular un retardo basado en la distancia desde el centro
      const centerRow = 2.5
      const centerCol = 2.5
      const distanceFromCenter = Math.sqrt(
        Math.pow(row - centerRow, 2) + 
        Math.pow(col - centerCol, 2)
      )
      
      const maxDistance = Math.sqrt(
        Math.pow(5, 2) + Math.pow(5, 2)
      )
      
      // Retardo basado en la distancia (más lejos = más retardo)
      const delay = (distanceFromCenter / maxDistance) * 1.5
      
      return (
        <motion.div
          key={index}
          className={styles.gridCell}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{
            duration: 1.2,
            delay: delay,
            ease: "easeInOut"
          }}
        />
      )
    })
  }
  
  return (
    <>
      <AnimatePresence>
        {isVisible && !contentReady && (
          <motion.div 
            className={styles.transitionOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.gridContainer}>
              {renderGridCells()}
            </div>
            
            {/* Primera fase: Aparecer código digital */}
            <AnimatePresence>
              {transitionPhase >= 1 && (
                <motion.div 
                  className={styles.digitalCode}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.15 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5 }}
                />
              )}
            </AnimatePresence>
            
            {/* Segunda fase: Círculo expandiéndose */}
            <AnimatePresence>
              {transitionPhase >= 2 && (
                <motion.div 
                  className={styles.circleReveal}
                  initial={{ scale: 0 }}
                  animate={{ scale: 25 }}
                  transition={{ 
                    duration: 2.5, 
                    ease: "circOut"
                  }}
                />
              )}
            </AnimatePresence>
            
            {/* Tercera fase: Destello final */}
            <AnimatePresence>
              {transitionPhase >= 3 && (
                <motion.div 
                  className={styles.finalFlash}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.8, 0] }}
                  transition={{ 
                    duration: 1.5,
                    times: [0, 0.2, 1] 
                  }}
                />
              )}
            </AnimatePresence>
            
            {/* Líneas de escaneo horizontal */}
            <motion.div 
              className={styles.scanLine}
              animate={{ 
                top: ['0%', '100%'],
                opacity: [0.1, 0.5, 0.1] 
              }}
              transition={{ 
                duration: 4,
                times: [0, 0.5, 1],
                repeat: Infinity,
                repeatType: 'loop'
              }}
            />
            
            {/* Efectos de glitch aleatorios */}
            <div className={styles.glitchContainer}>
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  className={styles.glitchElement}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${Math.random() * 300 + 50}px`,
                    height: `${Math.random() * 3 + 1}px`
                  }}
                  animate={{
                    opacity: [0, 0.8, 0],
                    x: [0, Math.random() * 20 - 10, 0]
                  }}
                  transition={{
                    duration: 0.2,
                    repeat: Infinity,
                    repeatDelay: Math.random() * 4 + 1
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <section
        className={styles.mainContent}
        style={{ 
          opacity: contentReady ? 1 : 0,
          transform: contentReady ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 1.2s ease-out, transform 1.2s ease-out'
        }}
      >
        {children}
      </section>
    </>
  )
}