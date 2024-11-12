import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter } from "react-router-dom";
import { ModeThemeProvider } from "@/components/theme-provider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <ModeThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <ThemeProvider>
      <App />
    </ThemeProvider>
    </ModeThemeProvider>
  </BrowserRouter>,
);
