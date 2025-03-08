// components/effects/VerticalGlitchTransition.tsx
'use client'

import { motion } from 'framer-motion'
import styles from './VerticalGlitchTransition.module.css'

export default function VerticalGlitchTransition() {
  // Create 5 vertical bars
  return (
    <motion.div 
      className={styles.transitionContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 1.5, times: [0, 0.5, 1] }}
    >
      {[0, 1, 2, 3, 4].map((index) => (
        <div key={index} className={styles.verticalGlitch} style={{ left: `${index * 20}vw` }}>
          <motion.div 
            className={styles.glitchFill}
            initial={{ y: "-100%" }}
            animate={{ y: "100%" }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1 + 0.1,
              ease: "easeInOut" 
            }}
          />
        </div>
      ))}
    </motion.div>
  );
}