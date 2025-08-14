import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userRoleReducer from './slices/userRoleSlice';
import { authApi } from './api/authApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userRole: userRoleReducer,
    [authApi.reducerPath]: authApi.reducer, // RTK Query reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
