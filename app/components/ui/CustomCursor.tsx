// components/CustomCursor.tsx
'use client'

import { useEffect, useState } from 'react'
import styles from './CustomCursor.module.css'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [followPosition, setFollowPosition] = useState({ x: 0, y: 0 })
  const [isActive, setIsActive] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show cursor after a small delay (prevents initial jumps)
    const showTimeout = setTimeout(() => {
      setIsVisible(true)
    }, 500)

    // Main cursor position updates immediately with mouse
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }
    
    // Follower cursor has a slight delay
    const updateFollower = () => {
      setFollowPosition(prev => ({
        x: prev.x + (position.x - prev.x) * 0.2,
        y: prev.y + (position.y - prev.y) * 0.2
      }))
      requestAnimationFrame(updateFollower)
    }
    
    // Track clickable elements to change cursor state
    const onMouseDown = () => setIsActive(true)
    const onMouseUp = () => setIsActive(false)

    const handleElementHover = () => {
      const handleEnter = () => setIsActive(true)
      const handleLeave = () => setIsActive(false)

      // Find all interactive elements
      const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, select, textarea')
      
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', handleEnter)
        el.addEventListener('mouseleave', handleLeave)
      })

      return () => {
        interactiveElements.forEach(el => {
          el.removeEventListener('mouseenter', handleEnter)
          el.removeEventListener('mouseleave', handleLeave)
        })
      }
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    
    const cleanupElementHover = handleElementHover()
    const animationId = requestAnimationFrame(updateFollower)

    return () => {
      clearTimeout(showTimeout)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      cleanupElementHover()
      cancelAnimationFrame(animationId)
    }
  }, [position])

  if (!isVisible) return null

  return (
    <>
      <div 
        className={`${styles.cursor} ${isActive ? styles.active : ''}`}
        style={{ 
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      />
      <div 
        className={`${styles.cursorFollower} ${isActive ? styles.active : ''}`}
        style={{ 
          transform: `translate(${followPosition.x}px, ${followPosition.y}px)`,
        }}
      />
    </>
  )
}