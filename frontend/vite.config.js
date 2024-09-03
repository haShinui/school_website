import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import {PrimeVueResolver} from '@primevue/auto-import-resolver';

export default defineConfig({
    plugins: [
        vue(),
        Components({
          resolvers: [
            PrimeVueResolver()
          ]
        })],
  server: {
    proxy: {
      // Assuming your Django app runs on port 8000
      '/api': 'http://127.0.0.1:8000',
    },
  },
  build: {
    outDir: '../static/frontend', // Adjust according to your Django setup
    emptyOutDir: true,
  },
});
