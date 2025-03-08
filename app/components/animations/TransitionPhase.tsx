// components/animations/TransitionPhase.tsx
'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import styles from './TransitionPhase.module.css'

export default function TransitionPhase({ onComplete }: { onComplete: () => void }) {
  // Keep track of the container for potential future use
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    // Complete the animation after the total duration
    const timeout = setTimeout(() => {
      onComplete()
    }, 1600) // Slightly longer to ensure all animations complete
    
    return () => clearTimeout(timeout)
  }, [onComplete])
  
  // Create an array for our glitch elements
  const glitchBars = Array(5).fill(0)
  
  return (
    <motion.div 
      ref={containerRef}
      className={styles.transitionContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {glitchBars.map((_, index) => (
        <div 
          key={index}
          className={styles.verticalGlitch}
          style={{ left: `${index * 20}vw` }}
        >
          <motion.div 
            className={styles.glitchContent}
            initial={{ y: '-100%' }}
            animate={{ y: '100%' }}
            transition={{ 
              duration: 0.5, 
              delay: 0.1 * (index + 1),
              ease: "easeInOut" 
            }}
          />
        </div>
      ))}
      
      {/* Additional digital artifacts for more cyberpunk feel */}
      <motion.div 
        className={styles.horizontalGlitch}
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ 
          opacity: [0, 0.8, 0], 
          scaleY: [0, 1, 0],
          y: [0, 100, 200]
        }}
        transition={{ 
          duration: 0.6,
          delay: 0.3,
          times: [0, 0.5, 1] 
        }}
      />
      
      <motion.div 
        className={styles.noiseOverlay}
        animate={{ 
          opacity: [0, 0.05, 0.1, 0.05, 0] 
        }}
        transition={{ 
          duration: 1,
          times: [0, 0.25, 0.5, 0.75, 1]
        }}
      />
      
      {/* Digital text glitch fragments */}
      <motion.div 
        className={styles.textGlitch}
        style={{ 
          top: '40%', 
          left: '30%',
          color: '#00f0ff'
        }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 0.7, 0],
          x: [0, 10, -5]
        }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        SYSTEM://
      </motion.div>
      
      <motion.div 
        className={styles.textGlitch}
        style={{ 
          top: '60%', 
          right: '25%',
          color: '#ff0099'
        }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 0.7, 0],
          x: [0, -15, 5]
        }}
        transition={{ duration: 0.4, delay: 0.8 }}
      >
        LOADING_MODULE
      </motion.div>
    </motion.div>
  )
}