// frontend/src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// Import PrimeVue and necessary styles
//import PrimeVue from 'primevue/config';
//import 'primevue/resources/primevue.min.css';            // Core CSS
//import 'primeicons/primeicons.css';   

//import 'primevue/resources/themes/aura-light-blue/theme.css';
//import 'primevue/resources/themes/aura-dark-blue/theme.css'; (not applied yet)
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';




const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
//app.use(PrimeVue);
