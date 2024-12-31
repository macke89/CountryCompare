import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures Vite uses relative paths for assets and entry points
  css: {
    postcss: './postcss.config.js', // Explicitly link to your PostCSS config
  },
})