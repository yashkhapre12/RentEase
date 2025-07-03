import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: localStorage.getItem("loggedIn") === "true", // Persist login state
  username: localStorage.getItem("username") || "", // Persist username
};

const loggedSlice = createSlice({
  name: "logged",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log("Login action");
      state.loggedIn = true;
      state.username = action.payload.username; // Store username in state
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("username", action.payload.username); // Save username
    },
    logout: (state) => {
      console.log("Logout action");
      state.loggedIn = false;
      state.username = ""; // Clear username
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("username"); // Remove username from storage
    },
  },
});

export const { login, logout } = loggedSlice.actions;
export default loggedSlice.reducer;
