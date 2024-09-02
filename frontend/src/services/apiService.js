import axios from 'axios';

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

// Method to fetch home page data
apiService.getHomePageData = function() {
  return this.get('home/');
};

// Method to fetch user info (for the AboutPage)
apiService.getUserInfo = function() {
  return this.get('user-info/');
};

// Method to log out the user
apiService.logout = function() {
  return this.post('logout/');
};

// Method to initiate the secure Microsoft login
apiService.secureMicrosoftLogin = function() {
  return this.post('microsoft-secure-login/');
};

// Method to initiate the secure Allauth login
apiService.secureAllauthLogin = function(loginData) {
  return this.post('allauth-secure-login/', loginData);
};

// Method to sign up the user for the course
apiService.signupCourse = function() {
  return this.post('signup-course/');
};

export default apiService;
