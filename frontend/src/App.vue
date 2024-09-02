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
            <li class="nav-item" v-if="isAuthenticated && userRole === 'normal'">
              <router-link class="nav-link" to="/signup">Sign Up for Course</router-link>
            </li>
            <li class="nav-item" v-if="isAuthenticated && userRole === 'manager'">
              <router-link class="nav-link" to="/manager-dashboard">Manager Dashboard</router-link>
            </li>
          </ul>
          <ul class="navbar-nav ms-auto">
            <li class="nav-item" v-if="!isAuthenticated">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
            <li class="nav-item" v-if="isAuthenticated">
              <a class="nav-link" href="#" @click.prevent="handleLogout">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters(['isAuthenticated']),
    ...mapState(['userRole'])  // Add userRole to the computed properties
  },
  created() {
    this.fetchAuthUser();  // Fetch authentication status and user role when the component is created
  },
  methods: {
    ...mapActions(['fetchAuthUser', 'logoutUser']),
    handleLogout() {
      this.logoutUser().then(() => {
        this.$router.push('/login');  // Redirect to login page after logout
      }).catch(error => {
        console.error('Error logging out:', error);
      });
    }
  }
};
</script>

<style>
/* Add any custom styles here */
</style>
