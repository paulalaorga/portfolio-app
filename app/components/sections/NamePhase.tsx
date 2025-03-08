// components/sections/NamePhase.tsx
'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import styles from './NamePhase.module.css'

interface NamePhaseProps {
  onEnterClick: () => void;
}

export default function NamePhase({ onEnterClick }: NamePhaseProps) {
  // State for the particles
  const [particles, setParticles] = useState<Array<{
    x: number;
    y: number;
    size: number;
    color: string;
    speed: number;
  }>>([]);

  // Generate particles on component mount
  useEffect(() => {
    const colors = ['#00f0ff', '#ff0099', '#ffff00'];
    const newParticles = Array.from({ length: 50 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 0.5 + 0.1
    }));
    
    setParticles(newParticles);
    
    // Animate particles
    let animationFrameId: number;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    const moveParticles = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          // Move particles slightly toward mouse position
          const dx = (mouseX - particle.x) * 0.01;
          const dy = (mouseY - particle.y) * 0.01;
          
          return {
            ...particle,
            x: particle.x + dx + (Math.random() - 0.5) * particle.speed,
            y: particle.y + dy + (Math.random() - 0.5) * particle.speed,
          };
        })
      );
      
      animationFrameId = requestAnimationFrame(moveParticles);
    };
    
    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(moveParticles);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.div 
      className={styles.nameContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background Elements */}
      <div className={styles.backgroundElements}>
        <div className={`${styles.glowCircle} ${styles.glowCirclePrimary}`} />
        <div className={`${styles.glowCircle} ${styles.glowCircleSecondary}`} />
        <div className={`${styles.glowCircle} ${styles.glowCircleAccent}`} />
        
        {/* Render particles */}
        <div className={styles.particlesContainer}>
          {particles.map((particle, index) => (
            <motion.div
              key={index}
              className={styles.particle}
              style={{
                left: particle.x,
                top: particle.y,
                width: particle.size,
                height: particle.size,
                backgroundColor: particle.color,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Name Content */}
      <div className={styles.nameContent}>
        <motion.h1 
          className={styles.nameTitle}
          data-text="Paula Laorga"
          initial={{ scale: 0.9, filter: 'blur(10px)' }}
          animate={{ 
            scale: 1, 
            filter: 'blur(0px)',
          }}
          transition={{ duration: 1.5 }}
        >
          Paula Laorga
          <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent filter blur-sm -z-10">
            Paula Laorga
          </span>
        </motion.h1>
        
        <motion.div
          className={styles.roleTitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Front-End Developer
        </motion.div>
        
        <motion.button
          className={styles.enterButton}
          onClick={onEnterClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          whileHover={{ 
            boxShadow: '0 0 15px 5px rgba(0, 240, 255, 0.3)' 
          }}
        >
          ENTRAR
        </motion.button>
      </div>
    </motion.div>
  );
}