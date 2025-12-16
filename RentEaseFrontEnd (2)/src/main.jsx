import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css"; // Premium Design System

import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter } from "react-router";
import React from "react";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);
