<!-- frontend/src/components/AboutPage.vue -->
<template>
    <div class="container mt-5">
      <h1>{{ message }}</h1>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'AboutPage',
    data() {
      return {
        message: 'Loading...'
      };
    },
    created() {
      axios.get('http://127.0.0.1:8000/api/about/')
        .then(response => {
          this.message = response.data.message;
        })
        .catch(error => {
          console.error("There was an error fetching the about page data:", error);
          this.message = "Error loading data";
        });
    }
  };
  </script>
  