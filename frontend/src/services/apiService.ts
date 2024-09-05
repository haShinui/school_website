import axios, { AxiosInstance } from 'axios';
import store from '@/store';  // Import Vuex store

// Define interfaces for your API responses (replace with real data structure)
interface HomePageData {
  title: string;
  content: string;
}

interface UserInfo {
  id: number;
  username: string;
  email: string;
}

interface SignupResponse {
  success: boolean;
  message?: string;
}

// Define the structure of your custom Axios instance
interface CustomAxiosInstance extends AxiosInstance {
  getHomePageData?: () => Promise<HomePageData>;
  getUserInfo?: () => Promise<UserInfo>;
  logout?: () => Promise<void>;
  secureAllauthLogin?: (loginData: any) => Promise<any>;
  secureMicrosoftLogin?: () => Promise<void>;
  signupCourse?: () => Promise<SignupResponse>;
}

// Create the Axios instance
const apiService: CustomAxiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/',  // Replace with your Django backend URL
  withCredentials: true,  // Include credentials if needed (for authentication)
});

// Function to get CSRF token from cookies
function getCsrfToken(): string | null {
  const name = 'csrftoken';
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

// Set the CSRF token in the Axios headers for all requests
apiService.interceptors.request.use(config => {
  const csrfToken = getCsrfToken();
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;
  }
  return config;
});

// Add a response interceptor for 401 errors
apiService.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response && error.response.status === 401) {
    store.commit('resetAuthState');  // Reset authentication state in Vuex
  }
  return Promise.reject(error);
});

// Define your methods using this `apiService` instance
apiService.getHomePageData = function(): Promise<HomePageData> {
  return this.get('home/');
};

apiService.getUserInfo = function(): Promise<UserInfo> {
  return this.get('user-info/');
};

apiService.logout = function(): Promise<void> {
  return this.post('logout/');
};

apiService.secureAllauthLogin = function(loginData): Promise<any> {
  return this.post('allauth-secure-login/', loginData);
};

apiService.secureMicrosoftLogin = function(): Promise<void> {
  return this.post('microsoft-secure-login/');
};

apiService.signupCourse = function(): Promise<SignupResponse> {
  return this.post('signup-course/');
};

export default apiService;
