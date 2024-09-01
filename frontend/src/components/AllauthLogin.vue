<template>
  <div>
    <h1>Allauth Login</h1>
    <form @submit.prevent="secureLogin">
      <input v-model="username" type="text" placeholder="Username" required>
      <input v-model="password" type="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
    <div v-if="loginError">
      <p>Login failed: {{ loginError }}</p>
      <p>Entered Username: {{ username }}</p>
      <!-- It's unsafe to display passwords, even in a failed attempt -->
    </div>
  </div>
</template>

<script>
import apiService from '@/services/apiService';

export default {
  data() {
    return {
      username: '',
      password: '',
      loginError: null
    };
  },
  methods: {
    async secureLogin() {
      try {
        const loginData = {
          username: this.username,
          password: this.password
        };

        console.log('Sending login data:', loginData);

        const response = await apiService.secureAllauthLogin(loginData);
        
        if (response.data.success) {
          this.$router.push('/'); // Redirect to homepage on success
        } else {
          this.loginError = response.data.message;
          console.error('Login failed:', response.data.message);
        }
      } catch (error) {
        this.loginError = 'Error during login. Please check the console for more details.';
        console.error('Error during login:', error);
      }
    }
  }
}
</script>
