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
            <li class="nav-item">
              <a v-if="!isAuthenticated" class="nav-link" href="#" @click.prevent="login">Login</a>
              <a v-if="isAuthenticated" class="nav-link" href="#" @click.prevent="logout">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import { msalInstance, loginRequest } from "./msalConfig";

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
    checkAccount() {
      const account = msalInstance.getAllAccounts()[0];
      if (account) {
        this.isAuthenticated = true;
      }
    },
    async login() {
      try {
        const loginResponse = await msalInstance.loginPopup(loginRequest);
        this.isAuthenticated = true;
        console.log("id_token acquired at: " + new Date().toString());
        console.log(loginResponse);
      } catch (error) {
        console.error(error);
      }
    },
    logout() {
      msalInstance.logoutPopup();
      this.isAuthenticated = false;
    }
  }
};
</script>

<style>
/* Add any custom styles here */
</style>
  