import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { TimerProvider } from "./context/TimerContext.jsx";
import { BreakProvider } from "./context/BreakContext.jsx";
import { ControllerProvider } from "./context/ControllerContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ControllerProvider>
      <TimerProvider>
        <BreakProvider>
          <App />
        </BreakProvider>
      </TimerProvider>
    </ControllerProvider>
  </React.StrictMode>
);
