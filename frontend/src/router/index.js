// frontend/src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import StudentList from '../components/StudentList.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/students', component: StudentList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
