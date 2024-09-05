// src/store/index.ts
import { createStore, StoreOptions } from 'vuex';
import apiService from '@/services/apiService'; // Ensure the path is correct

// Define interfaces for better type safety
interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface AuthUser {
  isAuthenticated: boolean;
  username: string;
  role: string;
}

interface State {
  isAuthenticated: boolean;
  username: string | null;
  userRole: string | null;
  usersList: User[];  // Use the User interface
}

const store: StoreOptions<State> = {
  state: {
    isAuthenticated: false,
    username: null,
    userRole: null,
    usersList: [],
  },
  mutations: {
    setAuthUser(state, user: AuthUser) {
      state.isAuthenticated = user.isAuthenticated;
      state.username = user.username;
      state.userRole = user.role;
    },
    resetAuthState(state) {
      state.isAuthenticated = false;
      state.username = null;
      state.userRole = null;
      state.usersList = [];
    },
    setUsersList(state, users: User[]) {
      state.usersList = users;
    },
  },
  actions: {
    fetchAuthUser({ commit }) {
    return apiService.get('check-auth/')
      .then(response => {
        console.log("Authentication check response:", response.data);  // Log the API response
        const userData = response.data as AuthUser;

        if (userData.isAuthenticated) {
          commit('setAuthUser', userData);
        } else {
          commit('resetAuthState');
        }
      })
      .catch(error => {
        console.error("Error during authentication check:", error);
        commit('resetAuthState');
      });
  },
    login({ commit }, credentials: { username: string; password: string }) {
      return apiService.post('login/', credentials)
        .then(response => {
          commit('setAuthUser', response.data as AuthUser); // Ensure the type of response
        })
        .catch(error => {
          console.error("Login failed:", error);
          commit('resetAuthState');
          throw error; // Rethrow the error so it can be caught in the component
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
      if (apiService.signupCourse) {
        return apiService.signupCourse()
          .then(() => {
            return { success: true };
          })
          .catch((error) => {
            console.error('Signup failed:', error);
            return { success: false, message: 'Signup failed.' };
          });
      } else {
        console.error('signupCourse method is not defined');
        return { success: false, message: 'Signup course method is not available.' };
      }
    },
    fetchUsersList({ commit }) {
      return apiService.post('manager-dashboard/')
        .then(response => {
          commit('setUsersList', response.data as User[]);  // Type the response data
        })
        .catch(error => {
          console.error("Failed to fetch users list:", error);
        });
    },
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
    username: state => state.username,
    userRole: state => state.userRole,
    usersList: state => state.usersList,
  },
};

export default createStore(store);
