import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // This makes environment variables available on `process.env`
    // in the client-side code, which is required by the prompt's guidelines.
    'process.env': process.env,
  },
})
