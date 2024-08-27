import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import AboutPage from '../components/AboutPage.vue';
import { msalInstance } from '../msalConfig';  // Add this line to import msalInstance

const routes = [
  { path: '/', component: HomePage },
  { path: '/about', component: AboutPage },
  //{ path: '/waitlist', component: WaitlistForm, meta: { requiresAuth: true } },
  //{ path: '/booking', component: RoomBooking, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = msalInstance.getAllAccounts().length > 0;
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;
