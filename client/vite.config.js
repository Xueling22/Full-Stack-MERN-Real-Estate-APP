import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':{ //每次看到api都自动加3000上去
        target:'http://localhost:3000',
        secure:false,
      },
    },
  },
  plugins: [react()],
})
