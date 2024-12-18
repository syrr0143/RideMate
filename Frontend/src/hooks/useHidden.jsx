// hooks/useHidden.jsx
import React, { createContext, useContext, useState } from "react";

const HiddenContext = createContext();

export const MapContextProvider = ({ children }) => {
  const [hidden, setHidden] = useState(false);
  return (
    <HiddenContext.Provider value={{ hidden, setHidden }}>
      {children}
    </HiddenContext.Provider>
  );
};

export const useHidden = () => {
  const context = useContext(HiddenContext);
  if (!context) {
    throw new Error("useHidden must be used within a MapContextProvider");
  }
  return context;
};
