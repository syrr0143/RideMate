import React, { createContext, useEffect } from "react";
import { io } from "socket.io-client";
import { socketUrl } from "../config/Api.js";
const socketContext = createContext();

const socket = io(`${socketUrl}`);
const SocketProvider = ({ children }) => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected to server sockcet");
    });
    socket.on("disconnect", () => {
      console.log("disconnected to server");
    });
    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  const sendMessage = (eventName, message) => {
    socket.emit(eventName, message);
  };

  const receiveMessage = (eventName, callback) => {
    socket.on(eventName, callback);
  };
  return (
    <socketContext.Provider value={{ socket }}>
      {children}
    </socketContext.Provider>
  );
};

export { socketContext, SocketProvider };
