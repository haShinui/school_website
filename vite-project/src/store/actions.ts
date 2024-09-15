import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the interface for the auth state (if not defined elsewhere)
interface AuthState {
  isAuthenticated: boolean;
  role: string | null;
}

// Async thunks
export const checkAuthentication = createAsyncThunk<AuthState>(
  'auth/checkAuthentication',
  async () => {
    const response = await axios.get('/api/check-auth');
    return response.data; // Assumes response structure { isAuthenticated: boolean, role: string | null }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    await axios.post('/api/logout');
    return;
  }
);
