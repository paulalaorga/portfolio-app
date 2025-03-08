// app/dashboard/layout.tsx
import '../globals.css'
import './styles.css'
import { Space_Mono, Syne } from 'next/font/google'

// Define fonts - Solo para usar en las clases de estilos, no para redefinir las etiquetas HTML
const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata = {
  title: 'Paula Laorga | Dashboard',
  description: 'Portfolio Dashboard for Paula Laorga - Front-End Developer',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`dashboard-layout ${spaceMono.variable} ${syne.variable}`}>
      {children}
    </div>
  )
}