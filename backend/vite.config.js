import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react/dist'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
