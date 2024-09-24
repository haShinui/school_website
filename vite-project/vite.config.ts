import { defineConfig } from 'vite';
import path from 'node:path';
import react from '@vitejs/plugin-react-swc'; // Use React plugin
import tailwind from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import eslint from "vite-plugin-eslint2";

export default defineConfig({
  // Set up CSS with Tailwind and PostCSS
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  // Include React plugin
  plugins: [react(), eslint()],
  base: '/', // Make sure this is set to '/' for correct routing
  // Resolve for TypeScript paths and aliasing
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),  // Shortcut for '@' to 'src' directory
      '@services': path.resolve(__dirname, './src/services'),  // Alias for services
      '@components': path.resolve(__dirname, './src/components'),  // Alias for components
    },
  },
  
  // Dev server configuration
  server: {
    host: '0.0.0.0', // Allow access from other containers
    port: 5173, // Set the frontend port to 5173
    proxy: {
      '/api': 'http://nginx_proxy:80' // Proxy API requests to Nginx
    },
  },
  
  // Build options
  build: {
    outDir: 'dist', // Output directory for build
    emptyOutDir: true, // Clear the output directory before building
  },
});
