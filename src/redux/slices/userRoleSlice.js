import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  role: null, // 'traveler' or 'landowner'
};

const userRoleSlice = createSlice({
  name: 'userRole',
  initialState,
  reducers: {
    setRole(state, action) {
      state.role = action.payload;
    },
    resetRole(state) {
      state.role = null;
    },
  },
});

export const { setRole, resetRole } = userRoleSlice.actions;
export default userRoleSlice.reducer;
