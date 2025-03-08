// components/SimpleNameReveal.tsx
'use client'

import { motion } from 'framer-motion'

export default function SimpleNameReveal({ onEnterClick }: { onEnterClick: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="text-center">
        <motion.h1 
          className="text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Paula <span className="text-cyan-400">Laorga</span>
        </motion.h1>
        
        <motion.div
          className="text-xl text-cyan-400 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Front-End Developer
        </motion.div>
        
        <motion.button
          className="px-8 py-3 bg-transparent border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-colors duration-300"
          onClick={onEnterClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          ENTRAR
        </motion.button>
      </div>
    </div>
  );
}