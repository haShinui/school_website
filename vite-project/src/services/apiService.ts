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

interface MicrosoftLoginResponse {
  success: boolean;
  login_url?: string;
  message?: string;
}

interface LoginResponse {
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
    const response = await apiService.get('/csrf-token/');
    const csrfToken = response.data.csrfToken || response.data;
    if (csrfToken) {
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

// Interceptor to include the API Key and ensure the CSRF token is included in the Axios headers for all requests
apiService.interceptors.request.use(async config => {
  const apiKey = process.env.REACT_APP_API_KEY; // Fetch the API key from .env
  
  // Ensure CSRF token is refreshed before every non-GET request
  if (config.method !== 'get') {
    await fetchCsrfToken();
  }
  
  // Add API key to the headers if it exists
  if (apiKey) {
    config.headers['X-API-Key'] = apiKey;
  }
  
  console.log('Request Headers:', config.headers);  // Log headers for debugging
  return config;
}, error => Promise.reject(error));

// Define API methods
const apiMethods = {
  // Allauth Login
  secureAllauthLogin: async (loginData: { username: string; password: string }): Promise<LoginResponse> => {
    try {
      const response = await apiService.post('/allauth-secure-login/', loginData);
      return response.data; // Return the whole response data
    } catch (error) {
      console.error('Error during login:', error);
      return { success: false, message: 'Login failed' }; // Return an appropriate error object
    }
  },

  // Microsoft Login Flow
  secureMicrosoftLogin: async (): Promise<MicrosoftLoginResponse> => {
    try {
      const response = await apiService.post<MicrosoftLoginResponse>('/microsoft-secure-login/');
      return response.data; // Return the login URL or an error message
    } catch (error) {
      console.error('Error during Microsoft login:', error);
      return { success: false, message: 'Error during Microsoft login' }; // Return a failure message
    }
  },

  // Check Authentication Status
  checkAuth: async () => {
    try {
      const response = await apiService.get('/check-auth/');
      return response.data; // Return the auth data
    } catch (error) {
      console.error('Failed to check auth:', error);
      return { isAuthenticated: false, message: 'User is not authenticated or logged in.' }; // Return default
    }
  },

  // Fetch User Info
  getUserInfo: async () => {
    try {
      const response = await apiService.get<{ isAuthenticated: boolean; user: UserInfo }>('/user-info/');
      const user = response.data.user;

      if (user) {
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

  // Logout
  logout: async (): Promise<LogoutResponse> => {
    try {
      await fetchCsrfToken(); // Ensure CSRF token is refreshed before logout
      const response = await apiService.post<LogoutResponse>('/logout/');
      return response.data;
    } catch (error) {
      console.error('Error during logout:', error);
      return { success: false, message: 'Error during logout' }; // Return a failure message
    }
  },

  // Fetch Manager Dashboard
  fetchManagerDashboard: async () => apiService.get('/manager-dashboard/'),

  // Check if User is a Manager
  checkManager: async () => apiService.get<ManagerCheckResponse>('/is-manager/'),

  // Sign up for a Course
  signupCourse: async () => apiService.post<SignupResponse>('/signup-course/'),

  // Fetch CSRF Token
  getCsrfToken: async () => apiService.get('/csrf-token/').then(response => console.log('CSRF token:', response.data)),
};

export default apiMethods;
