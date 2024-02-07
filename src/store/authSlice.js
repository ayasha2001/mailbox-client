import { createSlice } from "@reduxjs/toolkit";

const authInitialState = { isAuthenticated: false };

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      console.log("state.isAuthenticated", state.isAuthenticated);
    },
    login(state) {
      state.isAuthenticated = true;
      console.log("state.isAuthenticated", state.isAuthenticated);
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
