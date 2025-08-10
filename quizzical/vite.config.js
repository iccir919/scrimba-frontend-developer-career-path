import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://neil-scrimba-frontend-career-path.netlify.app/quizzical/dist/'
})
