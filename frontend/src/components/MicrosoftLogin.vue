<template>
  <div>
    <h1>Microsoft Login</h1>
    <button @click="initiateMicrosoftLogin">Login with Microsoft</button>
  </div>
</template>

<script>
import apiService from '@/services/apiService';

export default {
  methods: {
    async initiateMicrosoftLogin() {
      try {
        // Send a POST request to initiate the Microsoft login
        const response = await apiService.post('microsoft-secure-login/', null);
        if (response.data.login_url) {
          window.location.href = response.data.login_url; // Redirect to the Microsoft login URL
        } else {
          console.error('Microsoft login URL not found.');
        }
      } catch (error) {
        console.error('Error initiating Microsoft login:', error);
      }
    }
  }
}
</script>
