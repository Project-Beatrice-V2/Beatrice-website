/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          light: '#FBF9F3',
          base: '#FAF6ED',
          muted: '#F2EBDC',
          dark: '#E7DEC7',
          deep: '#DCD0B4',
        },
        ink: {
          primary: '#1C1917',
          secondary: '#3C3836',
          muted: '#66605B',
          faint: '#A39C94',
        },
        sepia: {
          light: '#D97706',
          ink: '#8B4513',
          deep: '#6B3410',
          dark: '#4A230A',
        },
        botanical: {
          sage: '#4A5D4E',
          forest: '#2D3E30',
          moss: '#3B4D3C',
          light: '#E2E8E0',
        },
        field: {
          gold: '#C89334',
          rust: '#9E4226',
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'paper-grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'ink-sm': '0 2px 4px rgba(28, 25, 23, 0.05)',
        'ink-md': '0 4px 12px rgba(28, 25, 23, 0.08), 0 1px 2px rgba(28, 25, 23, 0.04)',
        'ink-lg': '0 12px 24px -4px rgba(28, 25, 23, 0.12), 0 4px 8px -2px rgba(28, 25, 23, 0.06)',
        'parchment-pressed': 'inset 0 2px 4px rgba(28, 25, 23, 0.06)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-33.333%)' },
        },
      },
      animation: {
        marquee: 'marquee 35s linear infinite',
      },
    },
  },
  plugins: [],
}
