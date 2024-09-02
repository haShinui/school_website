import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import AboutPage from '../components/AboutPage.vue';
import LoginPage from '../components/LoginPage.vue';
import MicrosoftLogin from '../components/MicrosoftLogin.vue';
import CourseSignup from '../components/CourseSignup.vue';
import ManagerDashboard from '../components/ManagerDashboard.vue';
import store from '@/store';  // Make sure this path is correct

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: {
      guest: true  // Only non-authenticated users can access
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: CourseSignup,
    meta: {
      //requiresAuth: true,  // Only authenticated users can access
      requiresRole: 'normal'  // Only users with 'normal' role can access
    }
  },
  {
    path: '/manager-dashboard',
    name: 'ManagerDashboard',
    component: ManagerDashboard,
    meta: {
      requiresRole: 'manager'
    }
  },
  {
    path: '/microsoft-login',
    name: 'MicrosoftLogin',
    component: MicrosoftLogin,
    meta: {
      guest: true // Only non-authenticated users can access
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  console.log(`Navigating from ${from.path} to ${to.path}`);
  const isAuthenticated = store.getters.isAuthenticated;
  console.log("User authenticated:", isAuthenticated);

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    console.log("Redirecting to login because route requires auth and user is not authenticated.");
    next('/login');
  } else if (to.matched.some(record => record.meta.guest) && isAuthenticated) {
    console.log("Redirecting to home because route is for guests only and user is authenticated.");
    next('/');
  } else {
    next();  // proceed normally for all other cases
  }
});

export default router;
