import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserInfo {
  username: string;
  first_name?: string;
  last_name?: string;
  role?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: UserInfo | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

// Async thunks for authentication actions
export const checkAuthentication = createAsyncThunk(
  'auth/checkAuthentication',
  async () => {
    const response = await axios.get('/api/check-auth');
    return response.data; // Assumes response structure { isAuthenticated: boolean, user: UserInfo }
  }
);

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
    setAuthUser(state, action: PayloadAction<{ isAuthenticated: boolean; user: UserInfo | null }>) {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    },
    resetAuthState(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthentication.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload.isAuthenticated;
        state.user = action.payload.user;
      })
      .addCase(checkAuthentication.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { setAuthUser, resetAuthState } = authSlice.actions;
export default authSlice.reducer;
