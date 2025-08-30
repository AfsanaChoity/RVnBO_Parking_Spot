import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

export const useSocket = (token) => {
  const socketRef = useRef(null);
  const backendUrl = "http://10.10.20.73:5000";
  // console.log("Backend URL:", backendUrl);

  useEffect(() => {
    if (!token) {
      console.warn("No token provided, socket will not be initialized.");
      return;
    }

    // create and store socket instance
    const skt = io(backendUrl, { auth: { token } });
    socketRef.current = skt;

    const onConnect = () => console.log("Socket connected:", skt.id);
    const onDisconnect = () => console.log("Socket disconnected");

    skt.on("connect", onConnect);
    skt.on("disconnect", onDisconnect);

    return () => {
      // clean up listeners and close connection
      skt.off("connect", onConnect);
      skt.off("disconnect", onDisconnect);
      skt.disconnect();
      socketRef.current = null;
    };
  }, [token]);

  // return the socket instance (null until connected)
  return socketRef.current;
};
