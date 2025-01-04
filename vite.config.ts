import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Set the correct base URL (matches subpath in the deployment URL)
  css: {
    postcss: './postcss.config.js', // Explicitly link to your PostCSS config
  },
})