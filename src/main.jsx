import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/App";
import { useThemeStore } from './store/themeStore';

const theme = localStorage.getItem('theme') || 'light';
document.documentElement.classList.add(theme);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
