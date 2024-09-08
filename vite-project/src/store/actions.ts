import { setAuthUser, resetAuthState } from './authSlice'; // Import from authSlice
import apiService from '../services/apiService';
import { AppDispatch } from './index';

export const fetchAuthUser = () => async (dispatch: AppDispatch) => {
  try {
    const response = await apiService.checkAuth();
    const userData = response.data; // Typed as { isAuthenticated: boolean; user: UserInfo | null }

    if (userData.isAuthenticated && userData.user) {
      // Check if userData.user exists before accessing username and role
      dispatch(setAuthUser({
        isAuthenticated: userData.isAuthenticated,
        user: {
          username: userData.user.username || '',  // Handle undefined username
          role: userData.user.role || '',          // Handle undefined role
        },
      }));
    } else {
      dispatch(resetAuthState());
    }
  } catch (error) {
    console.error("Authentication check failed", error);
    dispatch(resetAuthState());
  }
};
