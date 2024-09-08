import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Import the authSlice

const store = configureStore({
  reducer: {
    auth: authReducer, // Add the auth slice to the store
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
