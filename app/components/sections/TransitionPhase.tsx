// components/sections/TransitionPhase.tsx
'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import styles from './TransitionPhase.module.css'

export default function TransitionPhase({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    // Trigger completion after animation duration
    const timeout = setTimeout(() => {
      onComplete()
    }, 1500) // Duration matches the animation time
    
    return () => clearTimeout(timeout)
  }, [onComplete])
  
  return (
    <motion.div 
      className={styles.transitionContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className={styles.verticalGlitch}
        animate={{
          transform: ["translateY(-100%)", "translateY(100%)"]
        }}
        transition={{ duration: 0.5, delay: 0.1 }}
      />
      <motion.div 
        className={styles.verticalGlitch}
        animate={{
          transform: ["translateY(-100%)", "translateY(100%)"]
        }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
      <motion.div 
        className={styles.verticalGlitch}
        />
      <motion.div 
        className={styles.verticalGlitch}
        animate={{
          transform: ["translateY(-100%)", "translateY(100%)"]
        }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />
    </motion.div>
  )
}
