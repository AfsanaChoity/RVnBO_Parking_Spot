

import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export const useSocket = (token) => {
  // const backendUrl = "http://10.10.20.73:5000";
  const backendUrl = "https://garyh-backend.onrender.com";
  const socketRef = useRef(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!token) {
      console.warn("No token provided, socket will not be initialized.");
      return;
    }

    const skt = io(backendUrl, { auth: { token } });
    socketRef.current = skt;
    setSocket(skt); // 🔑 triggers re-render so consumers get a non-null socket

    const onConnect = () => console.log("Socket connected:", skt.id);
    const onDisconnect = () => console.log("Socket disconnected");

    skt.on("connect", onConnect);
    skt.on("disconnect", onDisconnect);

    return () => {
      skt.off("connect", onConnect);
      skt.off("disconnect", onDisconnect);
      skt.disconnect();
      socketRef.current = null;
      setSocket(null);
    };
  }, [token]);

  return socket;
};
