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

// Function to check if the auth_token is set in cookies
const checkTokenCookie = () => {
  return document.cookie.includes('auth_token');
};

// Add retry logic to wait for the token to appear
const waitForToken = (retries = 10) => {
  return new Promise<void>((resolve, reject) => {
    const interval = setInterval(() => {
      if (checkTokenCookie()) {
        clearInterval(interval);  // Stop checking if token is found
        resolve();
      } else if (retries <= 0) {
        clearInterval(interval);
        reject(new Error('Token not set in cookies.'));
      }
      retries--;
    }, 300);  // Check every 300 milliseconds
  });
};

// Define API methods
const apiMethods = {
  secureAllauthLogin: async (loginData: { username: string; password: string }) => {
    const response = await apiService.post('/allauth-secure-login/', loginData);
    if (response.data.success) {
      // Set the login flag after a successful login
      localStorage.setItem('isLoggedIn', '1');  // Use '1' to indicate logged in
      // Wait for the token to be set in cookies before checking authentication
      try {
        await waitForToken();
        console.log('Token is now set in cookies.');
        // After the token is set, fetch user info
        await apiMethods.getUserInfo();
      } catch (error) {
        console.error('Failed to set auth token in time:', error);
      }
    }
    return response;
  },

  checkAuth: async () => {
    // Check if the user has logged in by looking at the flag in localStorage
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === '1') {  // Only call checkAuth if the user is logged in
      try {
        const response = await apiService.get('/check-auth/');
        return response.data; // should return { isAuthenticated: boolean, role: string }
      } catch (error) {
        console.error('Failed to check auth:', error);
        return { isAuthenticated: false, role: null };
      }
    } else {
      console.warn('checkAuth called before user logged in');
      return { isAuthenticated: false, role: null };  // Return a default response
    }
  },

  secureMicrosoftLogin: async () => {
    const response = await apiService.post('/microsoft-secure-login/');
    if (response.data.success) {
      // Set the login flag after a successful Microsoft login
      localStorage.setItem('isLoggedIn', '1');  // Use '1' to indicate logged in
      // Wait for the token to be set in cookies before checking authentication
      try {
        await waitForToken();
        console.log('Token is now set in cookies.');
        // After the token is set, fetch user info
        await apiMethods.getUserInfo();
      } catch (error) {
        console.error('Failed to set auth token in time:', error);
      }
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
    try {
      // Ensure CSRF token is refreshed before logout
      await fetchCsrfToken();
      const response = await apiService.post<LogoutResponse>('/logout/');
      if (response.data.success) {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('firstName');
        sessionStorage.removeItem('lastName');
        localStorage.removeItem('isLoggedIn');  // Remove login flag on logout
        console.log('User info cleared from session storage on logout');
      }
      return response;
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;  // Re-throw the error for handling in the UI
    }
  },

  fetchManagerDashboard: () => apiService.get('/manager-dashboard/'), // Fetch the manager dashboard data
  checkManager: () => apiService.get<ManagerCheckResponse>('/is-manager/'), // Check if the user is a manager
  signupCourse: () => apiService.post<SignupResponse>('/signup-course/'),
  getCsrfToken: () => apiService.get('/csrf-token/').then(response => console.log('CSRF token:', response.data)),
};

export default apiMethods;
