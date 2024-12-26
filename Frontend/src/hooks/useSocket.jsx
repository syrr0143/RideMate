import { useContext } from "react";
import {socketContext  } from "../context/SocketIoContext";

const useSocket = () => {
  return useContext(socketContext);
};

export default useSocket;
