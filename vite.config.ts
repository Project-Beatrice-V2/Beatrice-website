import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from the site root on Vercel (https://project-beatrice.vercel.app).
const base = '/'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base,
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // three.js is only needed by the lazily imported background scene.
            if (id.includes('/node_modules/three/')) {
              return 'three';
            }
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react';
            }
            if (id.includes('gsap') || id.includes('framer-motion') || id.includes('lenis')) {
              return 'vendor-animation';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            return 'vendor';
          }
        },
      },
    },
  },
})
