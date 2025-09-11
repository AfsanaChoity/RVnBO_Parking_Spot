import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  // base: process.env.VITE_BASE_PATH || "/garyh57-website",
  base: import.meta.env.VITE_BASE_PATH || '/RVnBO_Parking_Spot',

  server: {
    port: "3001",
     host: "10.10.20.29",
  },
})
