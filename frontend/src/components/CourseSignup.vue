<template>
  <div v-if="userInfo.isAuthenticated">
    <h1>Sign Up for Introduction Course</h1>
    <form @submit.prevent="submitSignupForm">
      <div class="mb-3">
        <label for="courseName" class="form-label">Course Name</label>
        <input type="text" id="courseName" v-model="courseName" class="form-control" readonly>
      </div>
      <div class="mb-3">
        <label for="userName" class="form-label">Your Name</label>
        <input type="text" id="userName" v-model="userName" class="form-control" readonly>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Your Email</label>
        <input type="email" id="email" v-model="email" class="form-control" readonly>
      </div>
      <button type="submit" class="btn btn-primary">Sign Up</button>
    </form>
  </div>
  <div v-else>
    <p>You need to be logged in to sign up for the introduction course.</p>
    <router-link to="/login">Login</router-link>
  </div>
</template>

<script>
import apiService from '@/services/apiService';

export default {
  data() {
    return {
      courseName: 'Introduction to Makespace',
      userName: '',
      email: '',
      userInfo: null,
    };
  },
  async created() {
    await this.fetchUserInfo();
  },
  methods: {
    async fetchUserInfo() {
      try {
        const response = await apiService.getUserInfo();
        this.userInfo = response.data;
        if (this.userInfo.isAuthenticated) {
          this.userName = `${this.userInfo.user.first_name} ${this.userInfo.user.last_name}`;
          this.email = this.userInfo.user.email;
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
    async submitSignupForm() {
      try {
        const signupData = {
          courseName: this.courseName,
          userName: this.userName,
          email: this.email,
        };
        const response = await apiService.signupForCourse(signupData);
        if (response.data.success) {
          alert('You have successfully signed up for the course!');
        } else {
          alert('Failed to sign up for the course.');
        }
      } catch (error) {
        console.error('Error signing up for the course:', error);
        alert('An error occurred while signing up. Please try again.');
      }
    },
  },
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
