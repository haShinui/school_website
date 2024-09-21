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

// Set the base URLs for local and production environments
const isProduction = window.location.hostname !== 'localhost'; // Assuming localhost for local dev
const baseURL = isProduction
  ? 'https://school-website-1-a2f6.onrender.com/api/' // Production backend URL
  : 'http://localhost:8000/api/'; // Local backend URL

// Set up the base Axios instance
const apiService = axios.create({
  baseURL, // Switch between local and production
  withCredentials: true, // Allow sending cookies for authentication
});

// Utility function to log Axios requests and responses for debugging
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

// Utility function to get CSRF token from cookies
const getCsrfTokenFromCookies = () => {
  const name = 'csrftoken=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookiesArray = decodedCookie.split(';');
  for (let i = 0; i < cookiesArray.length; i++) {
    let cookie = cookiesArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
};

// Fetch CSRF token from cookies and set it up in Axios interceptors
const setCsrfTokenInHeaders = () => {
  const csrfToken = getCsrfTokenFromCookies();
  if (csrfToken) {
    apiService.defaults.headers.common['X-CSRFToken'] = csrfToken;  // Attach CSRF token to future requests
    console.log('CSRF Token set:', csrfToken);
  } else {
    console.warn('CSRF token not found in cookies.');
  }
};

// Set CSRF token when the service is imported/used
setCsrfTokenInHeaders();

// Interceptor to ensure CSRF token is included in every request
apiService.interceptors.request.use(config => {
  const csrfToken = getCsrfTokenFromCookies();
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;
    console.log('CSRF Token added to request:', csrfToken);
  }
  return config;
}, error => Promise.reject(error));

// Define API methods
const apiMethods = {
  
  secureAllauthLogin: async (loginData: { username: string; password: string }) => {
    const csrfToken = getCsrfTokenFromCookies();
    const headers = {
      'X-CSRFToken': csrfToken, // Add CSRF token to headers if present
    };
    console.log('Headers to be sent:', headers); // Log the headers
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
    const csrfToken = getCsrfTokenFromCookies();
    const headers = {
      'X-CSRFToken': csrfToken, // Add CSRF token to headers if present
    };
    console.log('Headers to be sent:', headers); // Log the headers
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
