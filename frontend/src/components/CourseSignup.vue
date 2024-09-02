<template>
  <div v-if="!accessDenied">
    <h1>Introduction Course Signup</h1>
    <button @click="handleSignupForCourse" v-if="!isSignedUp">Sign Up for Course</button>
    <p v-if="isSignedUp">You are signed up for the course!</p>
    <p v-if="signupError" class="text-danger">{{ signupError }}</p>
    <p v-if="cannotSignUp" class="text-warning">Sorry, you are not allowed to sign up. Your role is: {{ userRole }}</p>
  </div>
  <div v-else>
    <p>You do not have access to this page. Redirecting to homepage...</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      signupError: null,
      accessDenied: false,
      cannotSignUp: false,
    };
  },
  computed: {
    ...mapState(['userRole']),
    isSignedUp() {
      return this.userRole === 'signed_up';
    },
    restrictedRoles() {
      return ['signed_up', 'completed', 'manager', 'admin'];
    }
  },
  methods: {
    async handleSignupForCourse() {
      if (this.restrictedRoles.includes(this.userRole)) {
        this.cannotSignUp = true;
        console.log(`User cannot sign up, role: ${this.userRole}`);
        return;
      }

      try {
        const response = await this.$store.dispatch('signupForCourse');
        if (response && response.success) {
          this.signupError = null;
          await this.$store.dispatch('fetchAuthUser');
        } else if (response && response.message) {
          this.signupError = response.message;
        } else {
          this.signupError = 'Unexpected response format.';
        }
      } catch (error) {
        this.signupError = 'An error occurred during signup.';
        console.error('Error signing up for course:', error);
      }
    }
  },
  created() {
    if (this.userRole !== 'normal') {
      this.accessDenied = true;
      console.log(`Access denied for user with role: ${this.userRole}`);
      setTimeout(() => {
        this.$router.push('/');  // Redirect to the homepage after showing the message
      }, 2000);  // Delay for user to see the message
    } else if (this.restrictedRoles.includes(this.userRole)) {
      this.cannotSignUp = true;
      console.log(`User cannot sign up, role: ${this.userRole}`);
    } else {
      this.$store.dispatch('fetchAuthUser');
    }
  }
};
</script>

<style scoped>
.text-danger {
  color: red;
}
.text-warning {
  color: orange;
}
</style>
