<template>
  <div>
    <h1>About Page</h1>
    <div v-if="userInfo && userInfo.isAuthenticated">
      <p v-if="userInfo.user.username">Welcome, {{ userInfo.user.username }}!</p>
      <p v-else>Welcome, {{ userInfo.user.first_name }} {{ userInfo.user.last_name }}!</p>
      <button @click="handleLogout">Sign Out</button>
    </div>
    <div v-else>
      <p>You are not logged in.</p>
      <a href="http://localhost:8082/login">Login with Microsoft</a>
    </div>
  </div>
</template>

<script>
import apiService from '../services/apiService';

export default {
  data() {
    return {
      userInfo: null, // Start with null to handle the loading state
    };
  },
  created() {
    this.fetchUserInfo();
  },
  methods: {
    async fetchUserInfo() {
      try {
        const response = await apiService.getUserInfo();
        this.userInfo = response.data;
      } catch (error) {
        console.error('Error fetching user info:', error);
        this.userInfo = { isAuthenticated: false }; // Handle case where fetching fails
      }
    },
    async handleLogout() {
      try {
        const response = await apiService.logout();
        if (response.data.success) {
          this.userInfo = null; // Clear user info after logout
          this.$router.push('/'); // Redirect to the homepage after logout
        } else {
          console.error('Logout failed:', response.data.message);
        }
      } catch (error) {
        console.error('Error logging out:', error);
      }
    },
  },
};
</script>
