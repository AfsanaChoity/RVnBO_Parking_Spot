
import { useSocket } from "../../socket/Hooks/useSocket";
import { useEffect, useState } from "react";
import  ChatSidebar  from "../../components/Chat/ChatSidebar";
import  ChatWindow  from "../../components/Chat/ChatWindow";
import { useGetAllChatUsersQuery } from "../../redux/api/privateApi";
// import { api } from "./utils/api";

export const ChatLayout = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const token = localStorage.getItem("user-token");
  const socket = useSocket(token);

  const {data: chatUsers, error, isLoading} = useGetAllChatUsersQuery();

  console.log(chatUsers)

  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("connection", () => {
      // console.log("Socket connected!");
    });

    // find all users list
    socket.emit("find_users");

    socket.on("users_list", (usersList) => {
      setUsers(usersList);
    });

    // find online users list
    socket.on("online_users", (onlineUsers) => {
      // console.log("online_users: ", onlineUsers);
      setOnlineUsers(onlineUsers);
    });

    // Will call disconnect when exiting the browser tab or closing the browser
    socket.on("disconnect", () => {
      // console.log("Socket disconnected!");
    });

    return () => {
      socket.off("online_users");
      socket.off("connection");
      socket.off("disconnect");
    };
  }, [socket]);

  // const fetchUsers = async () => {
  //   try {
  //     const response = await api.get("/users");
  //     setUsers(response.data.data.users || []);

  //     // Auto-select first user if none selected
  //     if (response.data.length > 0 && !selectedUser) {
  //       setSelectedUser(response.data[0]);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //   }
  // };

  const handleUserSelect = (userId) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setSelectedUser(user);
    }
  };

  // console.log("Selected User:", selectedUser);

  // users list update when online Users change
  useEffect(() => {
    setUsers((prevUser) =>
      prevUser.map((user) => ({
        ...user,
        isOnline: onlineUsers.includes(user.id),
      }))
    );
  }, [onlineUsers]);

  // console.log("Users with online status: ", users);

  return (
    <div className="h-screen flex bg-gray-950">
      <ChatSidebar
        selectedUserId={selectedUser?.id}
        onUserSelect={handleUserSelect}
        users={users}
      />

      {selectedUser ? (
        <ChatWindow selectedUser={selectedUser} socket={socket} />
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-950">
          <div className="text-center text-gray-400">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              💬
            </div>
            <h2 className="text-xl font-semibold mb-2">
              Welcome to Chat
            </h2>
            <p>Select a conversation to start messaging</p>
          </div>
        </div>
      )}
    </div>
  );
};
