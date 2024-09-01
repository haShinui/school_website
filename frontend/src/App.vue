<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">School Website</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">About</router-link>
            </li>
          </ul>
          <ul class="navbar-nav ms-auto">
            <li class="nav-item" v-if="!isAuthenticated">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
            <li class="nav-item" v-if="isAuthenticated">
              <a class="nav-link" href="#" @click.prevent="logout">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import apiService from '@/services/apiService';

export default {
  name: 'App',
  data() {
    return {
      isAuthenticated: false,
    };
  },
  created() {
    this.checkAccount();
  },
  methods: {
    async checkAccount() {
      try {
        const response = await apiService.getUserInfo();
        this.isAuthenticated = response.data.isAuthenticated;
      } catch (error) {
        console.error('Error checking authentication status:', error);
        this.isAuthenticated = false;
      }
    },
    async logout() {
      try {
        await apiService.logout();
        this.isAuthenticated = false;
        this.$router.push('/login');
      } catch (error) {
        console.error('Error logging out:', error);
      }
    }
  }
};
</script>

<style>
/* Add any custom styles here */
</style>
