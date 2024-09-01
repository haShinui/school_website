<template>
  <div>
    <h1>Home Page</h1>
    <div v-if="userInfo && userInfo.isAuthenticated">
      <p v-if="userInfo.user.username">Welcome, {{ userInfo.user.username }}!</p>
      <p v-else>Welcome, {{ userInfo.user.first_name }} {{ userInfo.user.last_name }}!</p>
    </div>
    <div v-else>
      <p>You are not logged in.</p>
      <a href="http://localhost:8082/microsoft-login/">Login with Microsoft</a>
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
  },
};
</script>
