import App from "./App.jsx";
import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { SocketProvider } from "./context/SocketIoContext.jsx";
import { MapContextProvider } from "./hooks/useHidden.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SocketProvider>
      <AuthProvider>
        <MapContextProvider>
          <HashRouter>
            <App />
          </HashRouter>
        </MapContextProvider>
      </AuthProvider>
    </SocketProvider>
  </StrictMode>
);
