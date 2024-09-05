// frontend/src/main.ts
import { createApp } from 'vue';
import './assets/index.css';
import App from './App.vue';
import router from './router';
import 'primeicons/primeicons.css';
import store from './store';
import { createI18n } from 'vue-i18n';
import 'flag-icons/css/flag-icons.min.css';


import en from './locale/en.json';
import de from './locale/de.json';
// Import the translation files
const i18n = createI18n({
    locale: 'en', // Default locale
    fallbackLocale: 'en', // Fallback locale
    messages: {
      en,
      de,
    },
  });

const app = createApp(App);

app.use(i18n);
app.use(router);
app.use(store);
app.mount('#app');