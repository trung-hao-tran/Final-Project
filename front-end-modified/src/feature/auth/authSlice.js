import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, isAuthenticated: false, userId: null },
  reducers: {
    setCredentials: (state, action) => {
      const { token } = action.payload;
      state.token = token;
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    logOut: (state, action) => {
      state.token = null;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { setCredentials, setAuthenticated, logOut, setUserId } =
  authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
