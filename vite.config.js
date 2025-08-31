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
    // host: "143.198.238.107",
    port: "3001",
     host: "10.10.20.29",
    //  port: "3001",
  },
})
