'use client'

import React, { ReactNode, useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import styles from './Terminal.module.css'

type TerminalProps = {
  children: ReactNode
  title: string
  icon?: string
  delay?: number
  autoCollapse?: boolean
  collapseDelay?: number
  onCollapseComplete?: () => void
  isOpen?: boolean
  onToggle?: () => void
}

// Main Terminal Component
export default function Terminal({ 
  children, 
  title, 
  icon = 'terminal', 
  delay = 0,
  autoCollapse = false,
  collapseDelay = 10000, // 10 seconds default
  onCollapseComplete,
  isOpen = true,
  onToggle
}: TerminalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(!isOpen)
  const timerId = useRef<NodeJS.Timeout | null>(null)

  // Effect for initial animation delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  // Effect for handling opening/closing from props
  useEffect(() => {
    setIsCollapsed(!isOpen)
  }, [isOpen])

  // Effect for auto-collapse behavior
  useEffect(() => {
    if (autoCollapse && isVisible && !isCollapsed) {
      timerId.current = setTimeout(() => {
        setIsCollapsed(true)
        if (onCollapseComplete) {
          onCollapseComplete()
        }
      }, collapseDelay)
    }

    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current)
      }
    }
  }, [autoCollapse, isVisible, isCollapsed, collapseDelay, onCollapseComplete])

  const handleHeaderClick = () => {
    if (onToggle) {
      onToggle()
    } else {
      setIsCollapsed(prev => !prev)
    }
    
    // Clear auto-collapse timer if user manually toggles
    if (timerId.current) {
      clearTimeout(timerId.current)
    }
  }

  return (
    <motion.div
      className={`${styles.terminalContainer} ${isCollapsed ? styles.collapsed : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      {/* Terminal Header */}
      <div 
        className={styles.terminalHeader}
        onClick={handleHeaderClick}
      >
        <div className={styles.terminalControls}>
          <div className={`${styles.controlDot} ${styles.red}`}></div>
          <div className={`${styles.controlDot} ${styles.yellow}`}></div>
          <div className={`${styles.controlDot} ${styles.green}`}></div>
        </div>
        <div className={styles.terminalTitle}>
          {icon && (
            <span className={styles.terminalIcon}>
              {getIcon(icon)}
            </span>
          )}
          <span>{title}</span>
        </div>
        <div className={styles.collapseIndicator}>
          {isCollapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          )}
        </div>
      </div>

      {/* Terminal Content */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div 
            className={styles.terminalContent}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Terminal Components
export function PromptLine({ text }: { text: string }) {
  return (
    <div className={styles.promptLine}>
      <span className={styles.promptSymbol}>$</span>
      <span className={styles.promptText}>{text}</span>
    </div>
  )
}

export function OutputText({ children }: { children: ReactNode }) {
  return (
    <div className={styles.outputText}>
      {children}
    </div>
  )
}

export function CommandLine({ children, index = 0 }: { children: ReactNode, index?: number }) {
  return (
    <div 
      className={styles.commandLine}
      style={{ '--index': index } as React.CSSProperties}
    >
      {children}
    </div>
  )
}

export function HighlightCyan({ children }: { children: ReactNode }) {
  return <span className={styles.highlightCyan}>{children}</span>
}

export function HighlightMagenta({ children }: { children: ReactNode }) {
  return <span className={styles.highlightMagenta}>{children}</span>
}

export function HighlightYellow({ children }: { children: ReactNode }) {
  return <span className={styles.highlightYellow}>{children}</span>
}

// Project Components
export function ProjectGrid({ children }: { children: ReactNode }) {
  return (
    <div className={styles.grid}>
      {children}
    </div>
  )
}

interface ProjectCardProps {
  title: string
  description: string
  imageUrl: string
  tags: string[]
  link: string
}

export function ProjectCard({ title, description, imageUrl, tags, link }: ProjectCardProps) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className={styles.projectCard}>
      <div className={styles.projectImage}>
        <Image 
          src={imageUrl} 
          alt={title}
          width={300}
          height={160}
          layout="responsive"
          objectFit="cover"
        />
      </div>
      <h3 className={styles.projectTitle}>{title}</h3>
      <p className={styles.projectDescription}>{description}</p>
      <div className={styles.tagList}>
        {tags.map((tag, index) => (
          <span key={index} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
    </a>
  )
}

// Contact Form Component
export function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulating form submission
    setStatus('sending')
    
    // In a real implementation, you would send the form data to your backend
    setTimeout(() => {
      setStatus('success')
      // Reset form
      setName('')
      setEmail('')
      setMessage('')
      
      // Clear success message after 5 seconds
      setTimeout(() => setStatus(null), 5000)
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className={styles.contactForm}>
      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.label}>Nombre:</label>
        <input 
          type="text" 
          id="name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={styles.input}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>Email:</label>
        <input 
          type="email" 
          id="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="message" className={styles.label}>Mensaje:</label>
        <textarea 
          id="message" 
          rows={4} 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className={styles.textarea}
        ></textarea>
      </div>
      <div>
        <button 
          type="submit"
          className={styles.submitButton}
          disabled={status === 'sending'}
        >
          {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
        </button>
        
        {status === 'success' && (
          <motion.div 
            className={styles.successMessage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            ¡Mensaje enviado correctamente! Me pondré en contacto contigo pronto.
          </motion.div>
        )}
      </div>
    </form>
  )
}

// Helper function to get icons
function getIcon(name: string) {
  switch (name) {
    case 'user':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      )
    case 'code':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      )
    case 'mail':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      )
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
          <line x1="2" y1="8" x2="22" y2="8"></line>
          <line x1="6" y1="4" x2="6" y2="8"></line>
        </svg>
      )
  }
}