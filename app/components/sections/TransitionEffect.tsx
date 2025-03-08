'use client';
import { useEffect } from 'react';
import { gsap } from 'gsap';

export default function TransitionEffect({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const transitionTimeline = gsap.timeline({
      onComplete: () => {
        onComplete();
      }
    });

    // Vertical glitch animations
    transitionTimeline
      .to('.transition-phase', { opacity: 1, duration: 0.2 })
      .to('.vertical-glitch:nth-child(1)::before', { 
        y: '100%', 
        duration: 0.5, 
        ease: 'power2.in'
      }, 0.1)
      .to('.vertical-glitch:nth-child(2)::before', { 
        y: '100%', 
        duration: 0.5, 
        ease: 'power2.in'
      }, 0.2)
      .to('.vertical-glitch:nth-child(3)::before', { 
        y: '100%', 
        duration: 0.5, 
        ease: 'power2.in'
      }, 0.3)
      .to('.vertical-glitch:nth-child(4)::before', { 
        y: '100%', 
        duration: 0.5, 
        ease: 'power2.in'
      }, 0.4)
      .to('.vertical-glitch:nth-child(5)::before', { 
        y: '100%', 
        duration: 0.5, 
        ease: 'power2.in'
      }, 0.5)
      .to('.transition-phase', { 
        opacity: 0, 
        duration: 0.3,
      }, '+=0.5');
  }, [onComplete]);

  return (
    <div className="transition-phase fixed top-0 left-0 w-full h-full z-30 opacity-0 pointer-events-none">
      <div className="vertical-glitch absolute top-0 left-0 w-[20vw] h-full overflow-hidden">
        <div className="before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-primary before:opacity-50 before:-translate-y-full"></div>
      </div>
      <div className="vertical-glitch absolute top-0 left-[20vw] w-[20vw] h-full overflow-hidden">
        <div className="before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-primary before:opacity-50 before:-translate-y-full"></div>
      </div>
      <div className="vertical-glitch absolute top-0 left-[40vw] w-[20vw] h-full overflow-hidden">
        <div className="before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-primary before:opacity-50 before:-translate-y-full"></div>
      </div>
      <div className="vertical-glitch absolute top-0 left-[60vw] w-[20vw] h-full overflow-hidden">
        <div className="before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-primary before:opacity-50 before:-translate-y-full"></div>
      </div>
      <div className="vertical-glitch absolute top-0 left-[80vw] w-[20vw] h-full overflow-hidden">
        <div className="before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-primary before:opacity-50 before:-translate-y-full"></div>
      </div>
    </div>
  );
}