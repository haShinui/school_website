import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import AboutPage from '../components/AboutPage.vue';
import MicrosoftLogin from '../components/MicrosoftLogin.vue';
import { msalInstance } from '../msalConfig';
/*import AllauthLogin from '@/components/AllauthLogin.vue';*/
import LoginPage from '../components/LoginPage.vue'; // New login page



const routes = [
  { path: '/', component: HomePage },
  { path: '/about', component: AboutPage },
  { path: '/microsoft-login', component: MicrosoftLogin },
  { path: '/login', component: LoginPage },  // Add this route
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = msalInstance.getAllAccounts().length > 0;
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/microsoft-login');  // Redirect to Microsoft login if not authenticated
  } else {
    next();
  }
});

export default router;
