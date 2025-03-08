/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        foreground: '#ffffff',
        primary: '#00f0ff',
        'primary-glow': 'rgba(0, 240, 255, 0.6)',
        secondary: '#ff0099',
        'secondary-glow': 'rgba(255, 0, 153, 0.6)',
        accent: '#ffff00',
        'accent-glow': 'rgba(255, 255, 0, 0.6)',
        muted: '#666666',
        'cyan-400': '#00f0ff',
        'pink-500': '#ff0099',
      },
      fontFamily: {
        mono: ['Space Mono', 'monospace'],
        sans: ['Syne', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 10px 5px rgba(0, 240, 255, 0.6)',
        'glow-secondary': '0 0 10px 5px rgba(255, 0, 153, 0.6)',
        'glow-accent': '0 0 10px 5px rgba(255, 255, 0, 0.6)',
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at center, #080808 0%, #000000 100%)',
      },
      animation: {
        'scanner': 'scan 3s linear infinite',
        'pulse': 'pulse 1.5s infinite alternate',
        'float': 'float 15s infinite alternate ease-in-out',
      },
      keyframes: {
        scan: {
          '0%': { top: '0%', opacity: 0.5 },
          '50%': { opacity: 0.8 },
          '100%': { top: '100%', opacity: 0.5 },
        },
        pulse: {
          '0%': { boxShadow: '0 0 0 0 rgba(0, 240, 255, 0.6)' },
          '100%': { boxShadow: '0 0 10px 5px rgba(0, 240, 255, 0.6)' },
        },
        float: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(40px, 30px)' },
        },
      },
    },
  },
  plugins: [],
}

module.exports = tailwindConfig