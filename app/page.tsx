// app/page.tsx
'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function HomePage() {
  const [showDashboardLink, setShowDashboardLink] = useState(false)

  useEffect(() => {
    // Mostrar el botón "ENTRAR" después de que la animación termina
    const timer = setTimeout(() => {
      setShowDashboardLink(true)
    }, 19000) // Este tiempo coincide con el final de la animación en CSS

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="intro-container">
      {/* Noise overlay */}
      <div className="noise"></div>
      
      {/* Scanner effect */}
      <div className="scanner"></div>
      
      {/* Terminal phase */}
      <div className="terminal-phase">
        <div className="terminal">
          <div className="terminal-header">
            <div className="terminal-title">paula_laorga_terminal.sh</div>
            <div className="terminal-controls">
              <div className="control-dot red"></div>
              <div className="control-dot yellow"></div>
              <div className="control-dot green"></div>
            </div>
          </div>
          <div className="terminal-content">
            {/* ...resto del código de las líneas del terminal... */}
          </div>
        </div>
      </div>

      {/* Transition phase */}
      <div className="transition-phase">
        <div className="vertical-glitch"></div>
        <div className="vertical-glitch"></div>
        <div className="vertical-glitch"></div>
        <div className="vertical-glitch"></div>
        <div className="vertical-glitch"></div>
      </div>

      {/* Name reveal phase */}
      <div className="name-phase">
        {/* Background Elements */}
        <div className="name-bg">
          <div className="glow-circle"></div>
          <div className="glow-circle"></div>
          <div className="glow-circle"></div>
        </div>
        
        {/* Name Content */}
        <div className="name-content">
          <h1 className="name-title" data-text="Paula Laorga">Paula Laorga</h1>
          <div className="role-title">Front-End Developer</div>
          {showDashboardLink && (
            <Link href="/dashboard" className="enter-button">ENTRAR</Link>
          )}
        </div>
      </div>
      
      {/* Skip intro button - siempre visible */}
      <Link href="/dashboard" className="skip-intro">Saltar intro</Link>
    </div>
  )
}