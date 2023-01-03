import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false, username: "" },
  reducers: {
    setloggedin(state, action) {
      state.isLoggedIn = action.payload;
    },
    setUsername(state, action) {
      state.username = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
