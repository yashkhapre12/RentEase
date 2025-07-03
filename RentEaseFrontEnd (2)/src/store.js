import { configureStore } from "@reduxjs/toolkit";
import loggedReducer from "./slice"; // Import your slice correctly

const store = configureStore({
  reducer: {
    logged: loggedReducer,
  },
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in dev mode
});

export default store;
