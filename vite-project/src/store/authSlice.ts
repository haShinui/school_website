import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserInfo {
  username?: string;
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
});

export const { setAuthUser, resetAuthState } = authSlice.actions;
export default authSlice.reducer;
