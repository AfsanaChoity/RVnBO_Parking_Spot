import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  server: {
    port: "3001",
    host: true
  },
  
  preview: {
    host: true,
    port: Number(import.meta.env.PORT) || 3001,
    allowedHosts: [
      'rvnbo-parking-spot.onrender.com',
      '.onrender.com'
    ]
  }
})
