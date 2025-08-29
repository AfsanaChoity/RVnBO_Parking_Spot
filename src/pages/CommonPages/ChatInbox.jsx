import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectSocket, disconnectSocket } from "../../socket/socketService"; 
import { setMessages, addMessage } from "../../redux/slices/messageSlice"; 
import { useGetMessagesQuery, useSendMessageMutation } from "../../redux/api/privateApi"; 
import { Search, MoreHorizontal, Paperclip, Send, ArrowLeft } from "lucide-react";

const ChatInbox = () => {
  const dispatch = useDispatch();
  const [newMessage, setNewMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [showChatList, setShowChatList] = useState(true);

  const { conversations, messages } = useSelector((state) => state.messages);

  const user = useSelector((state) => state.auth.user);

  const [sendMessage] = useSendMessageMutation();

  
  const { data: fetchedMessages } = useGetMessagesQuery(selectedChat, {
    skip: !selectedChat,
  });

  useEffect(() => {
    if (fetchedMessages?.data) {
      dispatch(setMessages(fetchedMessages.data));
    }
  }, [fetchedMessages, dispatch]);

  // Connect socket when logged in
  useEffect(() => {
    if (user?._id) {
      const socket = connectSocket(user._id);

      // listen for new messages only once
      socket.on("newMessage", (message) => {
        // Add only if the message belongs to the current chat
        if (
          message.senderId === selectedChat ||
          message.receiverId === selectedChat
        ) {
          dispatch(addMessage(message));
        }
      });

      return () => {
        disconnectSocket();
      };
    }
  }, [user, selectedChat, dispatch]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const messageData = {
        text: newMessage,
        receiverId: selectedChat,
      };

      // Call API to persist + backend will emit via socket
      await sendMessage(messageData);

      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSelectChat = (chatId) => {
    setSelectedChat(chatId);
    setShowChatList(false);
  };

  const handleBackToList = () => {
    setShowChatList(true);
    setSelectedChat(null);
  };

  return (
    <div className="container mx-auto md:my-20 md:px-10">
      <div className="flex md:border border-gray-200 rounded-2xl">
        {/* Left Sidebar */}
        <div className={`${showChatList ? "flex" : "hidden"} md:flex w-full md:w-80 lg:w-96 border-r border-gray-200 flex-col`}>
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-900 mb-4">Messages</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <div
                key={conversation._id}
                onClick={() => handleSelectChat(conversation._id)}
                className={`flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                  selectedChat === conversation._id ? "bg-blue-50 border-r-2 border-blue-500" : ""
                }`}
              >
                <img
                  src={conversation.avatar || "/placeholder.svg"}
                  alt={conversation.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">{conversation.name}</h3>
                  <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Chat Area */}
        <div className={`${!showChatList ? "flex" : "hidden"} md:flex flex-1 flex-col`}>
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button onClick={handleBackToList} className="md:hidden p-1 hover:bg-gray-100 rounded-lg">
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <h2 className="font-semibold text-gray-900">Chat</h2>
                </div>
                <MoreHorizontal className="w-5 h-5 text-gray-500" />
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message._id}
                    className={`flex ${message.senderId === user._id ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`px-4 py-2 rounded-2xl ${
                        message.senderId === user._id
                          ? "bg-blue-600 text-white rounded-br-md"
                          : "bg-gray-100 text-gray-900 rounded-bl-md"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200 flex items-center gap-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message"
                  className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button onClick={handleSendMessage} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a conversation to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatInbox;
