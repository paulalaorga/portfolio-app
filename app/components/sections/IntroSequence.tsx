// components/sections/IntroSequence.tsx
'use client'

import { useState } from 'react'
import TerminalPhase from './TerminalPhase'
import TransitionPhase from './TransitionPhase'
import NamePhase from './NamePhase'

export default function IntroSequence({ onComplete }: { onComplete: () => void }) {
  const [currentPhase, setCurrentPhase] = useState<'terminal' | 'transition' | 'name'>('terminal')
  
  // Handle terminal phase completion
  const handleTerminalComplete = () => {
    console.log("Terminal phase complete, transitioning...")
    setCurrentPhase('transition')
    
    // Auto-transition to name phase after delay
    setTimeout(() => {
      setCurrentPhase('name')
    }, 1500)
  }
  
  // Handle name phase completion
  const handleNameComplete = () => {
    console.log("Name phase complete, signaling completion...")
    onComplete()
  }
  
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Debug information */}
      <div className="fixed top-2 right-2 bg-black/75 text-white p-2 z-[9999] text-xs font-mono">
        Current phase: {currentPhase}
      </div>
      
      {/* Skip intro button */}
      <button 
        onClick={onComplete}
        className="fixed bottom-5 left-5 text-gray-500 hover:text-cyan-400 z-[9999] text-sm font-mono"
      >
        Saltar intro
      </button>
      
      {/* Show appropriate phase */}
      {currentPhase === 'terminal' && (
        <TerminalPhase onComplete={handleTerminalComplete} />
      )}
      
      {currentPhase === 'transition' && (
        <TransitionPhase onComplete={handleNameComplete}/>
      )}
      
      {currentPhase === 'name' && (
        <NamePhase onEnterClick={handleNameComplete} />
      )}
    </div>
  )
}