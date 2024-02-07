import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
    port: 3000,
    open: true,
    proxy: {
      '/graphql': {
        target: 'https://your-api-service.com/graphql',
        changeOrigin: true,
        secure: false,
      },
    }
  }
})
