<template>
  <div class="login-page">
    <h1>Login</h1>
    <form @submit.prevent="secureAllauthLogin">
      <input v-model="username" type="text" placeholder="Username" required>
      <input v-model="password" type="password" placeholder="Password" required>
      <button type="submit">Login with Username and Password</button>
    </form>
    <p v-if="loginError">Login failed: {{ loginError }}</p>
    <hr>
    <h2>Or</h2>
    <button @click="initiateMicrosoftLogin">Login with Microsoft</button>
  </div>
</template>

<script>
import apiService from '@/services/apiService';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      username: '',
      password: '',
      loginError: null,
    };
  },
  methods: {
    ...mapActions(['fetchAuthUser']),
    async secureAllauthLogin() {
      try {
        const loginData = {
          username: this.username,
          password: this.password
        };

        const response = await apiService.secureAllauthLogin(loginData);
        if (response.data.success) {
          // Immediately update the Vuex store after login
          await this.fetchAuthUser();
          this.$router.push('/'); // Redirect to homepage after successful login
        } else {
          this.loginError = response.data.message;
        }
      } catch (error) {
        this.loginError = 'Error during login. Please check the console for more details.';
        console.error('Error during login:', error);
      }
    },
    async initiateMicrosoftLogin() {
      try {
        const response = await apiService.secureMicrosoftLogin();
        if (response.data.login_url) {
          window.location.href = response.data.login_url; // Redirect to the Microsoft login URL
        } else {
          console.error('Microsoft login URL not found.');
        }
      } catch (error) {
        console.error('Error initiating Microsoft login:', error);
      }
    },
  }
};
</script>

<style>
/* Add any custom styles here */
.login-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}
</style>
