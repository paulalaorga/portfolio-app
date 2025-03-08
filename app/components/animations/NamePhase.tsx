// components/sections/NamePhase.tsx
'use client'

import { motion } from 'framer-motion'
import styles from './NamePhase.module.css'

interface NamePhaseProps {
  onEnterClick: () => void;
}

export default function NamePhase({ onEnterClick }: NamePhaseProps) {
  // Animaciones para los círculos de resplandor
  const glowCircleAnimation = {
    animate: {
      x: [0, 40, 0],
      y: [0, 30, 0],
    },
    transition: {
      duration: 15,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  };

  return (
    <motion.div 
      className={styles.nameContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background Elements */}
      <div className={styles.backgroundElements}>
        {/* Primary glow circle */}
        <motion.div 
          className={`${styles.glowCircle} ${styles.glowCirclePrimary}`}
          animate={glowCircleAnimation.animate}
          transition={{
            ...glowCircleAnimation.transition,
            duration: 15
          }}
        />
        
        {/* Secondary glow circle */}
        <motion.div 
          className={`${styles.glowCircle} ${styles.glowCircleSecondary}`}
          animate={glowCircleAnimation.animate}
          transition={{
            ...glowCircleAnimation.transition,
            duration: 12,
            repeatType: "mirror"
          }}
        />
        
        {/* Accent glow circle */}
        <motion.div 
          className={`${styles.glowCircle} ${styles.glowCircleAccent}`}
          animate={glowCircleAnimation.animate}
          transition={{
            ...glowCircleAnimation.transition,
            duration: 10
          }}
        />

        {/* Añadimos un grid overlay para dar textura */}
      </div>
      
      {/* Name Content */}
      <div className={styles.nameContent}>
        <motion.h1 
          className={styles.nameTitle}
          data-text="Paula Laorga"
          initial={{ scale: 0.8, filter: 'blur(10px)' }}
          animate={{ 
            scale: 1, 
            filter: 'blur(0px)',
          }}
          transition={{ duration: 1.5 }}
        >
          Paula Laorga
        </motion.h1>
        
        <motion.div
          className={styles.roleTitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Front-End Developer
        </motion.div>
        
        <motion.button
          className={styles.enterButton}
          onClick={onEnterClick}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          whileHover={{ 
            boxShadow: '0 0 15px 5px rgba(0, 240, 255, 0.3)',
            y: -3
          }}
          whileTap={{ scale: 0.98 }}
        >
          ENTRAR
        </motion.button>
      </div>
    </motion.div>
  );
}