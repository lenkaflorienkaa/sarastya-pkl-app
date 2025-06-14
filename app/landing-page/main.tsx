import React from "react";
import ReactDOM from "react-dom/client";
import App from "./page";
import { ThemeProvider } from "@/components/theme-provider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
