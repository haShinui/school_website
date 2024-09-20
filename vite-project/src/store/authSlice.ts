import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface AuthState {
  isAuthenticated: boolean;
  role: string | null;
}

interface AuthResponse {
  isAuthenticated: boolean;
  role: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  role: null,
};

// Async thunk for authentication check
export const checkAuthentication = createAsyncThunk<AuthResponse>(
  'auth/checkAuthentication',
  async () => {
    const response = await axios.get('/api/check-auth');
    return response.data; // Assumes response structure { isAuthenticated: boolean, role: string }
  }
);

// Async thunk for logout
export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    await axios.post('/api/logout');
    return;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState(state) {
      state.isAuthenticated = false;
      state.role = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthentication.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload.isAuthenticated;
        state.role = action.payload.role;
      })
      .addCase(checkAuthentication.rejected, (state) => {
        state.isAuthenticated = false;
        state.role = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.role = null;
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
