<!-- frontend/src/components/HomePage.vue -->
<template>
  <div>
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
    axios.get('http://localhost:8000/api/')
      .then(response => {
        this.message = response.data.message;
      })
      .catch(error => {
        console.error("There was an error fetching the data:", error);
        this.message = "Error fetching data";
      });
  }
};
</script>
