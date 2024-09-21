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

const fetchCsrfToken = async () => {
  try {
    const response = await apiService.get('/csrf-token/'); // Fetch CSRF token from the server
    const csrfToken = response.data.csrfToken || response.data; // Adjust this if the key is different in your response
    if (csrfToken) {
      // Store the token in cookies and set in default headers
      document.cookie = `csrftoken=${csrfToken}; path=/`;
      apiService.defaults.headers.common['X-CSRFToken'] = csrfToken;
      console.log('CSRF token fetched and set in cookies:', csrfToken);
    } else {
      console.warn('No CSRF token received from backend.');
    }
  } catch (error) {
    console.error('Failed to fetch CSRF token:', error);
  }
};
// Immediately fetch the CSRF token when the service is initialized
fetchCsrfToken(); 
// Utility function to get CSRF token from cookies
function getCsrfTokenFromCookies() {
  const name = 'csrftoken';
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) {
    console.log('CSRF Token from cookie:', match[2]); // Log the token for debugging
    return match[2];
  }
  return null;
}

// Interceptor to include the CSRF token in the Axios headers for all requests
apiService.interceptors.request.use(config => {
  const csrfToken = getCsrfTokenFromCookies();  // Get CSRF token from the cookie
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;  // Set the CSRF token in the header
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