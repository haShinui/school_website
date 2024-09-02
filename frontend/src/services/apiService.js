import axios from 'axios';
import store from '@/store';  // Import Vuex store

// Create an axios instance with the base configuration
const apiService = axios.create({
  baseURL: 'http://localhost:8000/api/',  // Base URL for your Django API endpoints
  withCredentials: true,  // Ensures cookies (such as session cookies) are sent with each request
});

// Utility function to get CSRF token from cookies
function getCsrfToken() {
  const name = 'csrftoken';
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) {
    console.log('CSRF Token:', match[2]); // Log the token
    return match[2];
  }
  return null;
}

// Set the CSRF token in the Axios headers for all requests
apiService.interceptors.request.use(config => {
  const csrfToken = getCsrfToken();
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;
  }
  console.log('Request Headers:', config.headers); // Log the headers
  return config;
});

// Add a response interceptor for 401 errors
apiService.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response && error.response.status === 401) {
    store.commit('resetAuthState');  // Reset authentication state in Vuex
  }
  console.error('API Error:', error.response || error.message);
  return Promise.reject(error);
});

// Define your methods using this `apiService` instance
apiService.getHomePageData = function() {
  return this.get('home/');
};

apiService.getUserInfo = function() {
  return this.get('user-info/');
};

apiService.logout = function() {
  return this.post('logout/');
};

apiService.secureAllauthLogin = function(loginData) {
  return this.post('allauth-secure-login/', loginData);
};

apiService.secureMicrosoftLogin = function() {
  return this.post('microsoft-secure-login/');
};

apiService.signupCourse = function() {
  return this.post('signup-course/');
};

export default apiService;
