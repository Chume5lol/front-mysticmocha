import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,       // <-- permite acesso via IP
    port: 5174,
    proxy: {
      '/auth': 'http://10.100.3.4:8080', 
      '/api': 'http://10.100.3.4:8080'
    }
  }
})
