import { defineConfig } from 'vite';
import path from 'node:path';
import react from '@vitejs/plugin-react-swc'; // Use React plugin
import tailwind from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  // Set up CSS with Tailwind and PostCSS
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  // Include React plugin
  plugins: [react()],
  // Resolve for TypeScript paths and aliasing
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),  // Shortcut for '@' to 'src' directory
      '@services': path.resolve(__dirname, './src/services'),  // Alias for services
      '@components': path.resolve(__dirname, './src/components'),  // Alias for components
    },
  },
  
  // Dev server configuration
  server: {
    host: 'localhost', // Define the hostname
    port: 8082, // Set the frontend port to 8082
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // Proxy API requests to Django backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
  
  // Build options
  build: {
    outDir: '../static/frontend', // Output directory for build
    emptyOutDir: true, // Clear the output directory before building
    sourcemap: true, // Enable source maps for easier debugging
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            // Separate third-party dependencies into a 'vendor' chunk
            return 'vendor';
          }
        },
      },
    },
  },
});
