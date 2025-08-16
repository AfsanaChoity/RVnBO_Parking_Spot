import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '', // To store email
  isResetting: false, // To track if reset is in progress
  error: null, // Store error message if any
};

const passwordResetSlice = createSlice({
  name: 'passwordReset',
  initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload; // Store the email in state
    },
    resetPasswordRequest(state) {
      state.isResetting = true; // Set loading to true when password reset is in progress
      state.error = null; // Clear any existing error message
    },
    resetPasswordSuccess(state) {
      state.isResetting = false; // Set loading to false when password reset is successful
      state.error = null; // Clear any existing error message
    },
    resetPasswordFailure(state, action) {
      state.isResetting = false; // Set loading to false on failure
      state.error = action.payload; // Store the error message
    },
  },
});

export const {
  setEmail,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailure,
} = passwordResetSlice.actions;

export default passwordResetSlice.reducer;
