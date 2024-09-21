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

interface CheckAuthResponse {
  isAuthenticated: boolean;
  role?: string | null;  // Allow role to be string or null
  message?: string;
}

// Set up the base Axios instance
const apiService = axios.create({
  baseURL: 'https://api.fgz-fablab.ch/api/', // Updated backend domain
  withCredentials: true, // Allow sending cookies for authentication
});

// Function to fetch CSRF token from the backend
const fetchCsrfToken = async (): Promise<void> => {
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

// Interceptor to ensure the CSRF token is included in the Axios headers for all requests
apiService.interceptors.request.use(async config => {
  if (config.method !== 'get') {
    await fetchCsrfToken();
  }
  console.log('Request Headers:', config.headers);
  return config;
}, error => Promise.reject(error));

// Define API methods
const apiMethods = {
  secureAllauthLogin: async (loginData: { username: string; password: string }): Promise<any> => {
    try {
      const response = await apiService.post('/allauth-secure-login/', loginData);
      if (response.data.success) {
        console.log('Login successful.');
      } else {
        console.error('Login failed:', response.data.message);
      }
      return response.data; // Ensure data is returned
    } catch (error) {
      console.error('Error during login:', error);
      return null; // Return null in case of an error
    }
  },

  checkAuth: async (): Promise<CheckAuthResponse> => {
    try {
      const response = await apiService.get('/check-auth/');
      return {
        ...response.data,
        role: response.data.role ?? null,  // Convert undefined to null
      }; // Return data directly
    } catch (error) {
      console.error('Failed to check auth:', error);
      return { isAuthenticated: false, role: null, message: 'User is not authenticated or logged in.' }; // Default response
    }
  },

  secureMicrosoftLogin: async (): Promise<any> => {
    try {
      const response = await apiService.post('/microsoft-secure-login/');
      if (response.data.success) {
        console.log('Microsoft login successful.');
      } else {
        console.error('Microsoft login failed:', response.data.message);
      }
      return response.data; // Ensure data is returned
    } catch (error) {
      console.error('Error during Microsoft login:', error);
      return null; // Return null in case of an error
    }
  },

  getUserInfo: async (): Promise<UserInfo | null> => {
    try {
      const response = await apiService.get<{ user: UserInfo }>('/user-info/');
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

  logout: async (): Promise<any> => {
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
      return response.data; // Ensure data is returned
    } catch (error) {
      console.error('Error during logout:', error);
      return null; // Return null in case of an error
    }
  },

  fetchManagerDashboard: async (): Promise<any> => apiService.get('/manager-dashboard/'), // Fetch the manager dashboard data
  checkManager: async (): Promise<ManagerCheckResponse> => {
    try {
      const response = await apiService.get('/is-manager/');
      return response.data; // Ensure the manager status is returned
    } catch (error) {
      console.error('Failed to check manager status:', error);
      return { isManager: false }; // Default response
    }
  },
  signupCourse: async (): Promise<any> => apiService.post<SignupResponse>('/signup-course/'),
  getCsrfToken: async (): Promise<any> => apiService.get('/csrf-token/').then(response => console.log('CSRF token:', response.data)),
};

export default apiMethods;
