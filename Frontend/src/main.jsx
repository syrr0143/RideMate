import App from "./App.jsx";
import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import {MapContextProvider} from './hooks/useHidden.jsx'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <MapContextProvider>
      <BrowserRouter>
        <App />
        </BrowserRouter>
      </MapContextProvider>
        
    </AuthProvider>
  </StrictMode>
);
