/** @type {import('tailwindcss').Config} */
// Tokens follow DESIGN.md ("Aurora Void").
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: '#000000',
        ink: {
          900: '#07070B',
          800: '#0D0D13',
          700: '#15151D',
        },
        fg: {
          DEFAULT: '#FFFFFF',
          2: '#A1A1AA',
          3: '#6B6B76',
        },
        hairline: 'rgba(255,255,255,0.10)',
        'hairline-strong': 'rgba(255,255,255,0.18)',
        signal: '#7C8CFF',
        live: '#3DFFA8',
        aurora: {
          navy: '#112D72',
          indigo: '#4B52AA',
          lilac: '#A887DC',
          blush: '#E6C4E7',
          pearl: '#FCDBEF',
        },
        ember: {
          DEFAULT: '#FF6A2B',
          soft: '#FFB36B',
        },
      },
      fontFamily: {
        serif: ['var(--font-display)'],
        display: ['var(--font-display)'],
        sans: ['var(--font-sans)'],
        mono: ['"Geist Mono"', 'ui-monospace', 'SF Mono', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        display: '-0.035em',
        tightish: '-0.02em',
        label: '0.08em',
      },
      borderRadius: {
        card: '20px',
        frame: '28px',
      },
      maxWidth: {
        content: '1240px',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(0.8)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'marquee-slow': 'marquee 70s linear infinite',
        'pulse-dot': 'pulseDot 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
