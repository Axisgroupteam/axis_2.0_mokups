import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ErrorBoundary from "./pages/Error";
import { store } from "@/redux/store/index";
import { Provider } from "react-redux";
import { ThemeProvider } from "@/providers/ThemeProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <App />
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  </StrictMode>
);
