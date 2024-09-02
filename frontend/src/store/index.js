import { createStore } from 'vuex';
import apiService from '@/services/apiService';  // Ensure the path is correct

export default createStore({
  state: {
    isAuthenticated: false,
    username: null,
    userRole: null,  // Store user role in state
    usersList: []  // Store the list of users for the manager page
  },
  mutations: {
    setAuthUser(state, user) {
      state.isAuthenticated = user.isAuthenticated;
      state.username = user.username;
      state.userRole = user.role;  // Store user role in state
    },
    resetAuthState(state) {
      state.isAuthenticated = false;
      state.username = null;
      state.userRole = null;  // Reset user role on logout or auth reset
      state.usersList = [];  // Clear users list on logout or auth reset
    },
    setUsersList(state, users) {
      state.usersList = users;  // Store the list of users for the manager page
    }
  },
  actions: {
    fetchAuthUser({ commit }) {
      return apiService.get('check-auth/')
        .then(response => {
          console.log("Authentication check response:", response.data);
          commit('setAuthUser', response.data);  // Pass the entire response data
        })
        .catch(error => {
          console.error("Error during authentication check:", error);
          commit('resetAuthState');
        });
    },
    login({ commit }, credentials) {
      return apiService.post('login/', credentials)
        .then(response => {
          commit('setAuthUser', response.data);  // Set user as authenticated
        })
        .catch(error => {
          console.error("Login failed:", error);
          commit('resetAuthState');
          throw error;  // Rethrow error to handle it in component
        });
    },
    logoutUser({ commit }) {
      return apiService.post('logout/')
        .then(() => {
          console.log("Logout successful");
          commit('resetAuthState');
        })
        .catch(error => {
          console.error("Logout failed:", error);
        });
    },
    signupForCourse() {
      return apiService.signupCourse()
        .then(() => {
          return { success: true };  // Return a success object for your component to handle
        })
        .catch(error => {
          console.error('Signup failed:', error);
          return { success: false, message: 'Signup failed.' };
        });
    },
    fetchUsersList({ commit }) {
      return apiService.post('manager-dashboard/')  // Making a POST request
        .then(response => {
          commit('setUsersList', response.data);  // Store the list of users in the state
        })
        .catch(error => {
          console.error("Failed to fetch users list:", error);
        });
    }
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
    username: state => state.username,
    userRole: state => state.userRole,  // Access the user's role
    usersList: state => state.usersList  // Access the list of users for the manager page
  }
});
