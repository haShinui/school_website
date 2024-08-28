<template>
  <div class="container mt-5">
    <h1>{{ message }}</h1>
    <div v-if="!isAuthenticated">
      <p>You are not logged in.</p>
      <button @click="login" class="btn btn-primary">Login with Microsoft</button>
    </div>
    <div v-else>
      <p>Welcome, {{ username }}!</p>
      <p>You are now logged in.</p> <!-- Message after successful login -->
      <p>This is a personalized message for logged-in users.</p>
      <button @click="logout" class="btn btn-secondary">Logout</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { msalInstance, loginRequest } from '../msalConfig';

export default {
  name: 'HomePage',
  data() {
    return {
      message: 'Loading...',
      isAuthenticated: false,
      username: ''
    };
  },
  async mounted() {
    await this.initializeMSAL();  // Ensure MSAL is initialized on mount
  },
  methods: {
    async initializeMSAL() {
      try {
        await msalInstance.initialize();  // Initialize MSAL
        console.log('MSAL initialized successfully');
      } catch (error) {
        console.error('MSAL initialization failed:', error);
      }
    },
    async checkAccount() {
      const account = msalInstance.getAllAccounts()[0];
      if (account) {
        this.isAuthenticated = true;
        this.username = account.username;
        await this.fetchHomePageData();  // Fetch data only after confirming the user is authenticated
      } else {
        this.isAuthenticated = false;
        this.message = "Please log in to see personalized content.";
      }
    },
    async login() {
      try {
        await msalInstance.initialize();  // Ensure MSAL is initialized before login
        const loginResponse = await msalInstance.loginPopup(loginRequest);
        this.isAuthenticated = true;
        this.username = loginResponse.account.username;
        this.message = "You are now logged in.";  // Update message after login
        console.log("id_token acquired at: " + new Date().toString());
        await this.fetchHomePageData();  // Re-fetch data after login
      } catch (error) {
        console.error("Login failed:", error);
        this.message = "Login failed, please try again.";
      }
    },
    logout() {
        // Deactivate the currently active account
        msalInstance.setActiveAccount(null);  // This effectively logs out the user locally

        // Clear local session state
        this.isAuthenticated = false;
        this.username = '';
        this.message = "You have been logged out.";

        // Optional: Clear local storage if you're using it for cache
        localStorage.clear();  // or sessionStorage.clear();
    },
    async fetchHomePageData() {
      try {
        const account = msalInstance.getAllAccounts()[0];
        const tokenResponse = await msalInstance.acquireTokenSilent({
          account: account,
          scopes: ["User.Read"]
        });
        const accessToken = tokenResponse.accessToken;

        const response = await axios.get('http://127.0.0.1:8000/api/home/', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        this.message = response.data.message;
      } catch (error) {
        console.error("There was an error fetching the home page data:", error);
        this.message = "Error loading data";
      }
    }
  }
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
