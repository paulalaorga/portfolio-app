// components/animations/AnimationController.tsx
'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import TerminalPhase from './TerminalPhase'
import TransitionPhase from './TransitionPhase'
import NamePhase from './NamePhase'
import MainContentTransition from './MainContentTransition'

// Define the animation phases
type AnimationPhase = 'terminal' | 'transition' | 'name' | 'main'

// Skip animation in development based on query param
function shouldSkipAnimation(): boolean {
  if (typeof window === 'undefined') return false
  return new URLSearchParams(window.location.search).has('skipIntro')
}


interface AnimationControllerProps {
  children: React.ReactNode;
}

export default function AnimationController({ children }: AnimationControllerProps) {
  const [phase, setPhase] = useState<AnimationPhase>('terminal')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(false)

  // Memoizar funciones para evitar recreaciones innecesarias
  const handleTerminalComplete = useCallback(() => {
    console.log('Terminal phase complete, moving to transition')
    setPhase('transition')
  }, [])

  const handleTransitionComplete = useCallback(() => {
    console.log('Transition phase complete, moving to name')
    setPhase('name')
  }, [])

  const handleEnterClick = useCallback(() => {
    console.log('Enter clicked, transitioning to main content')
    setIsTransitioning(true)
    
    // Delay the actual phase change to allow the transition effect
    // Ahora damos más tiempo para la transición cinematográfica
    setTimeout(() => {
      setPhase('main')
      setTimeout(() => {
        setIsTransitioning(false)
      }, 6000) // Incrementado para permitir que se complete la transición cinematográfica
    }, 300)
  }, [])

  const handleSkipIntro = useCallback(() => {
    console.log('Skip intro clicked')
    setIsTransitioning(true)
    
    // Simplemente cambiamos a la fase name, sin guardar en localStorage
    setTimeout(() => {
      setPhase('name')
      setTimeout(() => {
        setIsTransitioning(false)
      }, 1500)
    }, 300)
  }, [])

  const toggleAudio = useCallback(() => {
    setAudioEnabled(prev => !prev)
    console.log("Audio toggled:", !audioEnabled)
  }, [audioEnabled])

  // Check if we should skip the animation based only on URL param
  useEffect(() => {
    console.log("AnimationController mounted, phase:", phase);
    
    // Solo saltamos la animación si hay un parámetro URL específico
    if (shouldSkipAnimation()) {
      console.log("Skipping animation due to URL param only");
      setPhase('main');
      return;
    }

    // Handle ESC key to skip animation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        console.log("ESC key pressed, skipping intro");
        if (phase === 'terminal' || phase === 'transition') {
          handleSkipIntro();
        } else if (phase === 'name') {
          handleEnterClick();
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleSkipIntro, handleEnterClick, phase])

  // Estilos para los botones
  const skipButtonStyle = {
    position: 'fixed' as const,
    bottom: '20px',
    left: '20px',
    fontFamily: 'monospace',
    fontSize: '0.8rem',
    color: 'white',
    backgroundColor: 'rgba(0, 240, 255, 0.3)',
    border: '2px solid #00f0ff',
    borderRadius: '4px',
    cursor: 'pointer',
    zIndex: 1500,
    padding: '8px 16px',
    boxShadow: '0 0 10px rgba(0, 240, 255, 0.5)',
    pointerEvents: 'auto' as const
  };
  
  const audioButtonStyle = {
    position: 'fixed' as const,
    bottom: '20px',
    right: '20px',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    border: '2px solid #00f0ff',
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    color: audioEnabled ? '#00f0ff' : 'white',
    cursor: 'pointer',
    zIndex: 1500,
    boxShadow: '0 0 10px rgba(0, 240, 255, 0.5)',
    pointerEvents: 'auto' as const
  };

  // Debug indicator
  const debugStyle = {
    position: 'fixed' as const,
    top: '10px',
    right: '10px',
    background: 'rgba(0,0,0,0.8)',
    color: 'white',
    padding: '0.5rem',
    zIndex: 2000,
    fontFamily: 'monospace',
    fontSize: '12px'
  };

  // Render appropriate phase
  return (
    <>
      {/* Debug indicator */}
      <div style={debugStyle}>
        Current Phase: {phase}<br />
        Transitioning: {isTransitioning ? 'yes' : 'no'}
      </div>
      
      <AnimatePresence mode="wait">
        {phase === 'terminal' && (
          <TerminalPhase key="terminal" onComplete={handleTerminalComplete} />
        )}
        
        {phase === 'transition' && (
          <TransitionPhase key="transition" onComplete={handleTransitionComplete} />
        )}
        
        {phase === 'name' && (
          <NamePhase key="name" onEnterClick={handleEnterClick} />
        )}
      </AnimatePresence>

      {/* Main content with transition effect */}
      <MainContentTransition isVisible={phase === 'main'}>
        {children}
      </MainContentTransition>

      {/* Contenedor independiente para los botones */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1000 }}>
        {/* Skip intro button - Solo visible en fases terminal y transition */}
        {(phase === 'terminal' || phase === 'transition') && (
          <button 
            onClick={handleSkipIntro}
            style={skipButtonStyle}
            aria-label="Saltar introducción"
            disabled={isTransitioning}
          >
            Saltar intro
          </button>
        )}

        {/* Audio toggle button - Siempre visible excepto en fase main */}
        {phase !== 'main' && (
          <button 
            onClick={toggleAudio}
            style={audioButtonStyle}
            aria-label={audioEnabled ? "Desactivar audio" : "Activar audio"}
          >
            {audioEnabled ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <line x1="23" y1="9" x2="17" y2="15"></line>
                <line x1="17" y1="9" x2="23" y2="15"></line>
              </svg>
            )}
          </button>
        )}
      </div>
    </>
  )
}