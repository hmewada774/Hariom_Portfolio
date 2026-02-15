import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: "/", // IMPORTANT FOR VERCEL

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },

  build: {
    outDir: "build",
    target: "esnext",
    cssCodeSplit: false, // ← forces ALL CSS into index.css
  },

  server: {
    port: 3000,
    open: true,
  },
});
