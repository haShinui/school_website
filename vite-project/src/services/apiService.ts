import axios from 'axios';

// Set up the base Axios instance
const apiService = axios.create({
  baseURL: 'http://localhost:8000/api/', // Django backend URL
  withCredentials: true, // Allow sending cookies for authentication
});

// Fetch CSRF token and set it up in Axios interceptors
const fetchCsrfToken = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/csrf-token/', { withCredentials: true });
    const csrfToken = response.data.csrfToken; // Adjust according to the actual key in the response
    apiService.defaults.headers.common['X-CSRFToken'] = csrfToken; // Set default CSRF token for all future requests
    console.log('CSRF token fetched and set:', csrfToken);
  } catch (error) {
    console.error('Failed to fetch CSRF token:', error);
  }
};

// Immediately fetch CSRF token when the service is imported/used
fetchCsrfToken();

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
// Define API methods
const apiMethods = {
  secureAllauthLogin: (loginData: { username: string; password: string }) =>
    apiService.post('/allauth-secure-login/', loginData),

  secureMicrosoftLogin: () => apiService.post('/microsoft-secure-login/'),

  getUserInfo: () => apiService.get<{ isAuthenticated: boolean; user: UserInfo }>('/user-info/'),

  logout: () => apiService.post('/logout/'), // POST request to log out using dj-rest-auth
  signupCourse: () => apiService.post<SignupResponse>('/signup-course/'),
  getCsrfToken: () => apiService.get('/csrf-token/').then(response => console.log(response.data)),
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
