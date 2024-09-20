import axios from 'axios';

// Define the interfaces for types you are using
interface UserInfo {
  username?: string;
  first_name?: string;
  last_name?: string;
  role?: string;
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
  baseURL: 'https://school-website-1-a2f6.onrender.com/api/', // Django backend URL
  withCredentials: true, // Allow sending cookies for authentication
});

// Utility function to log all Axios requests and responses for debugging
apiService.interceptors.response.use(
  response => {
    console.log('Response:', response);
    return response;
  },
  error => {
    console.error('API Error:', error.response ? error.response.data : error);
    return Promise.reject(error);
  }
);

// Fetch CSRF token and set it up in Axios interceptors
const fetchCsrfToken = async () => {
  try {
    const response = await axios.get(`${apiService.defaults.baseURL}csrf-token/`, {
      withCredentials: true, // Send credentials (cookies)
    });
    const csrfToken = response.data.csrfToken; // Adjust this if your response has a different key
    console.log('Fetched CSRF Token:', csrfToken);
    apiService.defaults.headers.common['X-CSRFToken'] = csrfToken; // Set CSRF token for all subsequent requests
  } catch (error) {
    console.error('Failed to fetch CSRF token:', error);
  }
};

// Fetch CSRF token immediately when the service is initialized
fetchCsrfToken();

// Define API methods
const apiMethods = {
  secureAllauthLogin: async (loginData: { username: string; password: string }) => {
    try {
      const response = await apiService.post('/allauth-secure-login/', loginData);
      if (response.data.success) {
        // Fetch user info on successful login
        await apiMethods.getUserInfo();
      }
      return response;
    } catch (error) {
      console.error('Login Error:', error);
    }
  },

  checkAuth: async () => {
    try {
      const response = await apiService.get('/check-auth/');
      return response.data; // Should return { isAuthenticated: boolean, role: string }
    } catch (error) {
      console.error('Failed to check auth:', error);
      return { isAuthenticated: false, role: null };
    }
  },

  secureMicrosoftLogin: async () => {
    try {
      const response = await apiService.post('/microsoft-secure-login/');
      if (response.data.success) {
        // Fetch user info on successful login
        await apiMethods.getUserInfo();
      }
      return response;
    } catch (error) {
      console.error('Microsoft Login Error:', error);
    }
  },

  getUserInfo: async () => {
    try {
      const response = await apiService.get<{ isAuthenticated: boolean; user: UserInfo }>('/user-info/');
      if (response.data.user) {
        sessionStorage.setItem('username', response.data.user.username || '');
        sessionStorage.setItem('firstName', response.data.user.first_name || '');
        sessionStorage.setItem('lastName', response.data.user.last_name || '');
        console.log('User info fetched and stored:', response.data.user);
      }
      return response;
    } catch (error) {
      console.error('Failed to get user info:', error);
    }
  },

  logout: async () => {
    try {
      const response = await apiService.post<LogoutResponse>('/logout/');
      if (response.data.success) {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('firstName');
        sessionStorage.removeItem('lastName');
        console.log('User info cleared from session storage on logout');
      }
      return response;
    } catch (error) {
      console.error('Logout Error:', error);
    }
  },

  fetchManagerDashboard: () => apiService.get('/manager-dashboard/'), // Fetch the manager dashboard data
  checkManager: () => apiService.get<ManagerCheckResponse>('/is-manager/'), // Check if the user is a manager
  signupCourse: () => apiService.post<SignupResponse>('/signup-course/'),
  getCsrfToken: () => apiService.get('/csrf-token/').then(response => console.log('CSRF token:', response.data)),
};

export default apiMethods;
