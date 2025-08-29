// socketService.js
import { io } from "socket.io-client";
import { addMessage } from "../redux/slices/messageSlice";
import { store } from "../redux/store";

let socket;

export const connectSocket = (userId) => {
  if (!socket) {
    socket = io("http://10.10.20.73:5000", {
      transports: ["websocket"],
      query: { userId },  // Pass actual logged-in user ID
    });

    // Listen for new messages once socket is initialized
    socket.on("newMessage", (newMessage) => {
      store.dispatch(addMessage(newMessage));
    });

    // Listen for online users if you want presence
    socket.on("getOnlineUsers", (users) => {
      console.log("Online users:", users);
      // Here you can dispatch an action to store online users in Redux
    });
  }
  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
