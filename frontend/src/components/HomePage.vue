<!-- frontend/src/components/HomePage.vue -->
<template>
  <div class="container mt-5">
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HomePage',
  data() {
    return {
      message: 'Loading...'
    };
  },
  created() {
    axios.get('http://127.0.0.1:8000/api/home/')
      .then(response => {
        this.message = response.data.message;
      })
      .catch(error => {
        console.error("There was an error fetching the home page data:", error);
        this.message = "Error loading data";
      });
  }
};
</script>
