import { MoreVertical, Phone, Video } from "lucide-react";
import { useEffect, useState } from "react";
import { Avatar as MuiAvatar } from "@mui/material"; // Import Material UI Avatar
import { MessageInput } from "./MessageInput";
import { MessageList } from "./MessageList";
import { useGetUserQuery } from "../../redux/api/authApi";
import { useGetChatMessagesByUserIdQuery } from "../../redux/api/privateApi"; // RTK Query Hook
import LoadingComponent from "../common/LoadingComponent";

export const ChatWindow = ({ selectedUser, socket }) => {
  const [isTyping, setIsTyping] = useState(false);

  
  // Fetch current user data
  const { data: userData, error: userError, isLoading: userIsLoading } = useGetUserQuery();

  // console.log(userData)
  // Fetch messages using RTK Query
  const { data: messagesData, error: messagesError, isLoading: messagesIsLoading } = useGetChatMessagesByUserIdQuery(selectedUser._id, {
    skip: !selectedUser._id, // Avoid fetching messages if no selected user
  });

  // console.log(messagesData?.data)

  const [messages, setMessages] = useState([]);

  // Update messages when new data is fetched
  useEffect(() => {
    if (messagesData) {
      setMessages(messagesData?.data || []);
    }
  }, [messagesData]);

  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      console.log("Socket connected!");
    });

    // Listen for new messages
    socket.on("receive_message", (message) => {
      if (message.senderId === selectedUser.id) {
        setMessages((prev) => [...prev, message]);
      }
    });

    // Listen for message confirmation
    socket.on("message_sent", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Listen for typing indicators
    socket.on("user_typing", (userId) => {
      if (userId === selectedUser.id) {
        setIsTyping(true);
      }
    });

    socket.on("user_stopped_typing", (userId) => {
      if (userId === selectedUser.id) {
        setIsTyping(false);
      }
    });

    return () => {
      socket.off("receive_message");
      socket.off("message_sent");
      socket.off("user_typing");
      socket.off("user_stopped_typing");
    };
  }, [socket, selectedUser.id]);

  const formatLastSeen = (lastSeen) => {
    const now = new Date();
    const diff = now.getTime() - new Date(lastSeen).getTime();
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return "Active now";
    if (minutes < 60) return `Active ${minutes}m ago`;
    return `Last seen ${new Date(lastSeen).toLocaleString()}`;
  };

  return (
    <div className="flex-1 flex flex-col h-full ">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-400 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Material UI Avatar */}
            <MuiAvatar
              src={selectedUser.image}
              alt={selectedUser.name}
              sx={{
                width: 40,
                height: 40,
                border: "2px solid #fff", // Optional: border for the avatar
              }}
            />
            <div>
              <h2 className="font-semibold">{selectedUser.name}</h2>
              <p className="text-sm text-gray-400">
                {selectedUser.isOnline
                  ? "Online"
                  : selectedUser.lastSeen
                  ? formatLastSeen(selectedUser.lastSeen)
                  : "Offline"}
                {isTyping && selectedUser.isOnline && (
                  <span className="text-purple-400"> • typing...</span>
                )}
              </p>
            </div>
          </div>

          
        </div>
      </div>

      {/* Messages */}
      {messagesIsLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <LoadingComponent />
        </div>
      ) : (
         <MessageList messages={messagesData?.data} selectedUser ={selectedUser}/>
        
      )}

      {/* Message Input */}
      <MessageInput onSendMessage={(content) => socket.emit("send_message", { receiverId: selectedUser._id, content })} />
    </div>
  );
};
