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
apiService.interceptors.request.use(config => {
  if (apiService.defaults.headers.common['X-CSRFToken']) {
    config.headers['X-CSRFToken'] = apiService.defaults.headers.common['X-CSRFToken'];  // Ensure the CSRF token is set in the request headers
  }
  console.log('Request Headers:', config.headers);  // Log headers for debugging
  return config;
}, error => Promise.reject(error));

// Define API methods
const apiMethods = {
  secureAllauthLogin: async (loginData: { username: string; password: string }) => {
    const response = await apiService.post('/allauth-secure-login/', loginData);
    if (response.data.success) {
      // Fetch user info on successful login
      await apiMethods.getUserInfo();
    }
    return response;
  },

  checkAuth: async () => {
    try {
      const response = await apiService.get('/check-auth/');
      return response.data; // should return { isAuthenticated: boolean, role: string }
    } catch (error) {
      console.error('Failed to check auth:', error);
      return { isAuthenticated: false, role: null };
    }
  },

  secureMicrosoftLogin: async () => {
    const response = await apiService.post('/microsoft-secure-login/');
    if (response.data.success) {
      // Fetch user info on successful login
      await apiMethods.getUserInfo();
    }
    return response;
  },

  getUserInfo: async () => {
    const response = await apiService.get<{ isAuthenticated: boolean; user: UserInfo }>('/user-info/');
    if (response.data.user) {
      sessionStorage.setItem('username', response.data.user.username || '');
      sessionStorage.setItem('firstName', response.data.user.first_name || '');
      sessionStorage.setItem('lastName', response.data.user.last_name || '');
      console.log('User info fetched and stored:', response.data.user);
    }
    return response;
  },

  logout: async () => {
    const response = await apiService.post<LogoutResponse>('/logout/');
    if (response.data.success) {
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('firstName');
      sessionStorage.removeItem('lastName');
      console.log('User info cleared from session storage on logout');
    }
    return response;
  },
  fetchManagerDashboard: () => apiService.get('/manager-dashboard/'), // Fetch the manager dashboard data
  checkManager: () => apiService.get<ManagerCheckResponse>('/is-manager/'), // Check if the user is a manager
  signupCourse: () => apiService.post<SignupResponse>('/signup-course/'),
  getCsrfToken: () => apiService.get('/csrf-token/').then(response => console.log('CSRF token:', response.data)),
  
};

export default apiMethods;