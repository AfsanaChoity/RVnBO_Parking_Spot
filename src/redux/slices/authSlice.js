import { createSlice } from '@reduxjs/toolkit';

const loadInitialState = () => {
  const token = localStorage.getItem('user-token');
  
  return {
    user: null,
    token,
    isAuthenticated: !!token,
  };
};

const initialState = loadInitialState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action) {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      
      // Only persist token to localStorage
      localStorage.setItem('user-token', token);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      
      // Clear token from localStorage
      localStorage.removeItem('user-token');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;