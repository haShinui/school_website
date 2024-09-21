import axios from 'axios';

// Define the interfaces for types you are using
interface UserInfo {
  username?: string;
  first_name?: string;
  last_name?: string;
}

interface LogoutResponse {
  success: boolean;
  message?: string;
}

interface SignupResponse {
  success: boolean;
  message?: string;
}

interface ManagerCheckResponse {
  isManager: boolean;
}

// Set up the base Axios instance
const apiService = axios.create({
  baseURL: 'https://api.fgz-fablab.ch/api/', // Updated backend domain
  withCredentials: true, // Allow sending cookies for authentication
});

// Function to fetch CSRF token from the backend
const fetchCsrfToken = async () => {
  try {
    const response = await apiService.get('/csrf-token/'); // Fetch CSRF token from the server
    const csrfToken = response.data.csrfToken || response.data; // Adjust this if the key is different in your response
    if (csrfToken) {
      // Set the CSRF token in the Axios default headers
      apiService.defaults.headers.common['X-CSRFToken'] = csrfToken;
      console.log('CSRF token fetched and set in headers:', csrfToken);
    } else {
      console.warn('No CSRF token received from backend.');
    }
  } catch (error) {
    console.error('Failed to fetch CSRF token:', error);
  }
};

// Immediately fetch the CSRF token when the service is initialized
fetchCsrfToken();

// Interceptor to ensure the CSRF token is included in the Axios headers for all requests
apiService.interceptors.request.use(async config => {
  if (config.method !== 'get') {
    // Ensure CSRF token is refreshed before every non-GET request
    await fetchCsrfToken();
  }
  console.log('Request Headers:', config.headers);  // Log headers for debugging
  return config;
}, error => Promise.reject(error));

// Define API methods
const apiMethods = {
  secureAllauthLogin: async (loginData: { username: string; password: string }) => {
    try {
      const response = await apiService.post('/allauth-secure-login/', loginData);
      if (response.data.success) {
        console.log('Login successful.');
      } else {
        console.error('Login failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  },

  checkAuth: async () => {
    try {
      const response = await apiService.get('/check-auth/');
      return response.data; // should return { isAuthenticated: boolean, role: string }
    } catch (error) {
      console.error('Failed to check auth:', error);
      return { isAuthenticated: false, message: 'User is not authenticated or logged in.' }; // Return a default response
    }
  },

  secureMicrosoftLogin: async () => {
    try {
      const response = await apiService.post('/microsoft-secure-login/');
      if (response.data.success) {
        console.log('Microsoft login successful.');
      } else {
        console.error('Microsoft login failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error during Microsoft login:', error);
    }
  },

  getUserInfo: async () => {
    try {
      const response = await apiService.get<{ isAuthenticated: boolean; user: UserInfo }>('/user-info/');
      const user = response.data.user;

      if (user) {
        // Only store username, first_name, and last_name in sessionStorage
        sessionStorage.setItem('username', user.username || '');
        if (user.first_name) {
          sessionStorage.setItem('firstName', user.first_name);
        }
        if (user.last_name) {
          sessionStorage.setItem('lastName', user.last_name);
        }
        console.log('User info fetched and stored:', user);
      }
      return user;
    } catch (error) {
      console.error('Error fetching user info:', error);
      return null; // Return null if there is an error
    }
  },

  logout: async () => {
    try {
      await fetchCsrfToken(); // Ensure CSRF token is refreshed before logout
      const response = await apiService.post<LogoutResponse>('/logout/');
      if (response.data.success) {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('firstName');
        sessionStorage.removeItem('lastName');
        console.log('Logout successful. User info cleared from session storage.');
      } else {
        console.error('Logout failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  },

  fetchManagerDashboard: () => apiService.get('/manager-dashboard/'), // Fetch the manager dashboard data
  checkManager: () => apiService.get<ManagerCheckResponse>('/is-manager/'), // Check if the user is a manager
  signupCourse: () => apiService.post<SignupResponse>('/signup-course/'),
  getCsrfToken: () => apiService.get('/csrf-token/').then(response => console.log('CSRF token:', response.data)),
};

export default apiMethods;
