// app/test-animation.tsx
'use client'

import { motion } from 'framer-motion'

export default function TestAnimation() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <motion.div
        className="w-32 h-32 bg-blue-500 rounded-lg"
        animate={{
          scale: [1, 1.5, 1],
          rotate: [0, 180, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop"
        }}
      />
    </div>
  )
}