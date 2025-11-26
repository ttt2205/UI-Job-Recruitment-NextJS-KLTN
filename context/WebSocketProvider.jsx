"use client";
import { createContext, useContext } from "react";
import { useWebSocket } from "@/hooks/useSocket";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const ws = useWebSocket(); // chỉ tạo 1 lần cho toàn app
  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
};

export const useWebSocketContext = () => useContext(WebSocketContext);
