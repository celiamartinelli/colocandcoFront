import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@scssVariables': '/src/styles/_variables.scss',
    },
    extensions: ['.js', '.jsx', '.scss', '.css'],
  },
});
