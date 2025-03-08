// app/layout.tsx
import type { Metadata } from 'next'
import { Space_Mono, Syne } from 'next/font/google'
import AnimationController from './components/animations/AnimationController'
import './globals.css'

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
})

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
})

export const metadata: Metadata = {
  title: 'Paula Laorga | Front-End Developer',
  description: 'Portfolio de Paula Laorga, desarrolladora front-end con experiencia en React, Vue.js, TypeScript y Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${spaceMono.variable} ${syne.variable}`}>
      <body className="bg-background text-foreground">
        <AnimationController>
          {children}
        </AnimationController>
      </body>
    </html>
  )
}