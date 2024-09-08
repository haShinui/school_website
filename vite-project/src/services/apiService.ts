import axios from 'axios';

// Set up the base Axios instance
const apiService = axios.create({
  baseURL: 'http://localhost:8000/api/', // Django backend URL
  withCredentials: true, // Allow sending cookies for authentication
});

// Function to get the CSRF token from cookies
function getCsrfToken(): string | null {
  const name = 'csrftoken';
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

// Add a request interceptor to attach the CSRF token to every request
apiService.interceptors.request.use((config) => {
  const csrfToken = getCsrfToken();
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken; // Set the CSRF token in the headers
  }
  return config;
});

// Define API methods
const apiMethods = {
  secureAllauthLogin: (loginData: { username: string; password: string }) =>
    apiService.post('/allauth-secure-login/', loginData),

  secureMicrosoftLogin: () => apiService.post('/microsoft-secure-login/'),

  getUserInfo: () => apiService.get<{ isAuthenticated: boolean; user: UserInfo }>('/user-info/'),

  logout: () => apiService.post<LogoutResponse>('/logout/'), // POST request to log out

  signupCourse: () => apiService.post<SignupResponse>('/signup-course/'),

  checkAuth: () => apiService.get<AuthResponse>('/check-auth/'), // Check authentication status
};

// Define the expected response types
export interface UserInfo {
  username?: string;
  first_name?: string;
  last_name?: string;
  role?: string;
}

export interface SignupResponse {
  success: boolean;
  message?: string;
}

export interface LogoutResponse {
  success: boolean;
  message?: string; // Define the message field as optional
}

export interface AuthResponse {
  isAuthenticated: boolean;
  user: UserInfo | null; // Allow user to be null when not authenticated
}

export default apiMethods;
