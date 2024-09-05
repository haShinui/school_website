// frontend/src/main.ts
import { createApp } from 'vue';
import './assets/index.css';
import App from './App.vue';
import router from './router';
import 'primeicons/primeicons.css';
import store from './store';

const app = createApp(App);

app.use(router);
app.use(store);
app.mount('#app');