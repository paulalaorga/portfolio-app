// components/CustomCursor.tsx
'use client'

import { useEffect, useState } from 'react'
import styles from './CustomCursor.module.css'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isActive, setIsActive] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show cursor after a small delay (prevents initial jumps)
    const showTimeout = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    // Update cursor position
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }
    
    // Track clickable elements
    const onMouseDown = () => setIsActive(true)
    const onMouseUp = () => setIsActive(false)

    // Track hover on interactive elements
    const addHoverListeners = () => {
      const elements = document.querySelectorAll('a, button, [role="button"], input, select, textarea')
      
      const handleEnter = () => setIsActive(true)
      const handleLeave = () => setIsActive(false)
      
      elements.forEach(el => {
        el.addEventListener('mouseenter', handleEnter)
        el.addEventListener('mouseleave', handleLeave)
      })

      return () => {
        elements.forEach(el => {
          el.removeEventListener('mouseenter', handleEnter)
          el.removeEventListener('mouseleave', handleLeave)
        })
      }
    }

    // Add event listeners
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    
    const cleanupHoverListeners = addHoverListeners()
    document.documentElement.classList.add('no-cursor')

    return () => {
      clearTimeout(showTimeout)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      cleanupHoverListeners()
      document.documentElement.classList.remove('no-cursor')
    }
  }, [position])

  if (!isVisible) return null

  return (
    <div 
      className={`${styles.cursor} ${isActive ? styles.active : ''}`}
      style={{ 
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    />
  )
}