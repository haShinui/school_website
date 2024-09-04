// frontend/src/main.js
import { createApp } from 'vue';
import './assets/style.css';
import PrimeVue from "primevue/config";
import App from './App.vue';
import router from './router';
import store from './store';
import Aura from '@primevue/themes/aura';
import Ripple from 'primevue/ripple';
import 'primeicons/primeicons.css';

import Select from 'primevue/select'; 

const app = createApp(App);

app.use(router);
app.use(store);
app.use(PrimeVue, {
    ripple: true, // Enable ripple effects globally
    theme: {
      preset: Aura,
    },
  });  // Use PrimeVue before mounting the app
  
app.directive('ripple', Ripple); // Register the Ripple directive globally
app.component('Select', Select);
app.mount('#app');