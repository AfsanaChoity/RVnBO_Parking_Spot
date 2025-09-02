import React, { useState } from "react";
import { LogOut, Search, Settings } from "lucide-react";
import { UserList } from "./UserList";
import { useAuth } from "../../redux/hooks";
import { useGetUserQuery, useLogoutUserMutation } from "../../redux/api/authApi";
import LoadingComponent from "../common/LoadingComponent";
import { Avatar as MuiAvatar } from "@mui/material"; // Import Material UI Avatar
import { Link } from "react-router-dom";

export const ChatSidebar = ({ selectedUserId, onUserSelect, users }) => {

  const [searchTerm, setSearchTerm] = useState("");

  const { token, logout: logoutAction } = useAuth();
  const [logoutUser] = useLogoutUserMutation();
  const { data: userData, error, isLoading } = useGetUserQuery(undefined, { skip: !token });

  const role = userData?.user?.role;

  // console.log(users)


  let path = "";
  if (role === 'traveler') {
    path = "/traveler/profile";
  }
  else if (role === 'landowner') {
    path = "/host/profile";
  }

  const filteredUsers =
    users.length &&
    users.filter((u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const logout = () => {
    logoutUser()
      .unwrap()
      .then(() => {
        logoutAction();
        localStorage.removeItem('user-token');
        window.location.href = '/auth/login';
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
  };

  // Conditional rendering for error and loading states
  if (error) {
    return (
      <div className="text-red-500 text-2xl text-center"> Something went wrong</div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <LoadingComponent />
      </div>
    );
  }

  return (
    <>
      <div className="w-80  border-r border-gray-300 flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-gray-300">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">Messages</h1>
            <button
              onClick={logout}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <LogOut size={18} />
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search User..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2  border border-gray-700 rounded-lg placeholder-gray-400 focus:outline-none focus:border-teal-500"
            />
          </div>
        </div>

        {/* User List */}
        <div className="flex-1 overflow-y-auto p-4">
          {users.length && (
            <UserList
              users={filteredUsers || []}
              selectedUserId={selectedUserId}
              onUserSelect={onUserSelect}
              currentUserId={userData?.user?._id || ""}
            />
          )}
        </div>

        {/* Current User Profile */}
        <div className="hidden md:block p-4 border-t border-gray-300">
          <Link  to={path}>
            <div
              className="flex items-center gap-3 p-3 rounded-x cursor-pointer transition-colors"
            >
              <MuiAvatar src={userData?.user?.image} alt={userData?.user?.name} size="md" />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">{userData?.user?.name}</h3>
                <p className="text-sm text-gray-400 truncate">Hi, I am using RVnBO</p>
              </div>

              <Settings size={26} className="text-gray-400" />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};
