// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { PrimeVueResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [PrimeVueResolver()],
    }),
    AutoImport({
      resolvers: [PrimeVueResolver()],
    }),
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:8000', // Adjust to your backend if needed
    },
  },
  build: {
    outDir: '../static/frontend', // Adjust output directory as needed
    emptyOutDir: true,
  },
});
