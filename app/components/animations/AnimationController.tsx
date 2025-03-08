// components/animations/AnimationController.tsx
'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import TerminalPhase from '../sections/TerminalPhase'
import TransitionPhase from '../sections/TransitionPhase'
import NamePhase from '../sections/NamePhase'

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
  const [hasSeenAnimation, setHasSeenAnimation] = useState(false)

  useEffect(() => {
    // Check if we should skip the animation
    if (shouldSkipAnimation() || localStorage.getItem('hasSeenIntro') === 'true') {
      setPhase('main')
      return
    }

    // Handle ESC key to skip animation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPhase('main')
        localStorage.setItem('hasSeenIntro', 'true')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Save state when animation completes
  useEffect(() => {
    if (phase === 'main' && !hasSeenAnimation) {
      localStorage.setItem('hasSeenIntro', 'true')
      setHasSeenAnimation(true)
    }
  }, [phase, hasSeenAnimation])

  const handleTerminalComplete = () => {
    console.log('Terminal phase complete, moving to transition')
    setPhase('transition')
  }

  const handleTransitionComplete = () => {
    console.log('Transition phase complete, moving to name')
    setPhase('name')
  }

  const handleEnterClick = () => {
    console.log('Enter clicked, moving to main content')
    setPhase('main')
  }

  const handleSkipIntro = () => {
    console.log('Skip intro clicked')
    setPhase('main')
  }

  // Render appropriate phase
  return (
    <>
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

      {/* Main content */}
      {phase === 'main' ? (
        children
      ) : (
        <button 
          onClick={handleSkipIntro}
          className="fixed bottom-5 left-5 text-xs text-gray-500 hover:text-primary z-50 font-mono"
          aria-label="Saltar introducción"
        >
          Saltar intro
        </button>
      )}
    </>
  )
}