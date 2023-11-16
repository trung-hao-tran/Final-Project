import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: { user: null, isAdmin: false },
  reducers: {
    setCurrentUser: (state, action) => {
      state.user = action.payload;
    },
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload === "admin" ? true : false;
    },
  },
});

export const { setCurrentUser, setIsAdmin } = usersSlice.actions;

export default usersSlice.reducer;

export const selectCurrentUserData = (state) => state.users.user;
