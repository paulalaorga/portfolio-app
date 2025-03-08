// app/fonts.ts
import { Space_Mono, Syne } from 'next/font/google'

// Define the Space Mono font (for terminal and tech-like elements)
export const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-space-mono',
})

// Define the Syne font (for headings and main text)
export const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  display: 'swap',
  variable: '--font-syne',
})