
import { useEffect, useState } from "react";
import { Avatar as MuiAvatar } from "@mui/material";
import { MessageInput } from "./MessageInput";
import { MessageList } from "./MessageList";
import { useGetUserQuery } from "../../redux/api/authApi";
import { useGetChatMessagesByUserIdQuery } from "../../redux/api/privateApi";
import LoadingComponent from "../common/LoadingComponent";

export const ChatWindow = ({ selectedUser, socket }) => {
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);

  // Current authed user (sender)
  const { data: userData } = useGetUserQuery();



  // Initial history
  const { data: messagesData, isLoading: messagesIsLoading, refetch } = useGetChatMessagesByUserIdQuery(selectedUser._id);

  // Seed local state from server history
  useEffect(() => {
    if (messagesData?.data) {
      setMessages(messagesData.data);
    }
  }, [messagesData?.data]);

  useEffect(() => {
    if (selectedUser?._id) {
      refetch();
    }
  }, [selectedUser, refetch]);

  useEffect(() => {
    if (!socket || !selectedUser?._id) return;

    const onReceive = (message) => {



      setMessages((prev) => {

        if (prev.some(m => m._id === message._id)) return prev;
        return [...prev, message];
      });


    };



    const onSent = (message) => {
      setMessages((prev) => (prev.some(m => m._id === message._id) ? prev : [...prev, message]));
    };

    const onTyping = (userId) => {
      if (userId === selectedUser._id) setIsTyping(true);
    };

    const onStopTyping = (userId) => {
      if (userId === selectedUser._id) setIsTyping(false);
    };

    socket.on("connect", () => console.log("Socket connected!"));
    socket.on("receive_message", onReceive);
    socket.on("message_sent", onSent);
    socket.on("user_typing", onTyping);
    socket.on("user_stopped_typing", onStopTyping);

    return () => {
      socket.off("receive_message", onReceive);
      socket.off("message_sent", onSent);
      socket.off("user_typing", onTyping);
      socket.off("user_stopped_typing", onStopTyping);
    };
  }, [socket, selectedUser?._id, userData?.data?._id]);

  const formatLastSeen = (lastSeen) => {
    const now = new Date();
    const diff = now.getTime() - new Date(lastSeen).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return "Active now";
    if (minutes < 60) return `Active ${minutes}m ago`;
    return `Last seen ${new Date(lastSeen).toLocaleString()}`;
  };


  //showing error 
  useEffect(() => {
    if (!socket) return;
    const onErr = (e) => console.error("message_error:", e?.error);
    socket.on("message_error", onErr);
    return () => socket.off("message_error", onErr);
  }, [socket]);


  // Expect MessageInput to call onSendMessage({ text, image })
  const handleSendMessage = ({ text, image }) => {
    const payload = {
      receiverId: selectedUser._id,
      senderId: userData?.user?._id,
      text: text || "",
      image: image || null,
    };
    socket.emit("send_message", payload);
    console.log("Emitted send_message:", payload)
  };

  return (
    <div className="flex-1 flex flex-col h-full ">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-400 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MuiAvatar
              src={selectedUser.image}
              alt={selectedUser.name}
              sx={{ width: 40, height: 40, border: "2px solid #fff" }}
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
                  <span className="text-[#468F9D]"> • typing...</span>
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
        // Use local state that includes socket-appended messages
        <MessageList messages={messages} selectedUser={selectedUser} />
      )}

      {/* Message Input */}
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};
