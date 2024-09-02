<template>
    <div v-if="userRole === 'manager'">
      <h1>Manager Dashboard</h1>
      <table class="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in usersList" :key="user.username">
            <td>{{ user.username }}</td>
            <td>{{ user.first_name }}</td>
            <td>{{ user['userprofile__role'] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>Access Denied</p>
    </div>
  </template>
  
  <script>
  import { mapState, mapActions } from 'vuex';
  
  export default {
    name: 'ManagerDashboard',
    computed: {
      ...mapState(['userRole', 'usersList'])  // Get the user role and users list from Vuex state
    },
    created() {
      this.fetchUsersList();  // Fetch the users list when the component is created
    },
    methods: {
      ...mapActions(['fetchUsersList'])  // Map the fetchUsersList action
    }
  };
  </script>
  
  <style scoped>
  .table {
    width: 100%;
    margin-top: 20px;
  }
  </style>
  