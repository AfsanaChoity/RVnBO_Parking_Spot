
import React, { useEffect, useRef, useMemo } from "react";
import { Avatar as MuiAvatar } from "@mui/material";
import { useGetUserQuery } from "../../redux/api/authApi";

export const MessageList = ({ messages = [], selectedUser }) => {
  const { data: userData } = useGetUserQuery();
  const messagesEndRef = useRef(null);

  const currentUserId = userData?.user?._id || userData?._id || "";
  const selectedId =
    selectedUser?._id ||
    selectedUser?.user?._id ||
    selectedUser?.id ||
    "";

  // console.log(messages)


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const formatDateHeader = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
    return date.toLocaleDateString([], {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // ✅ Only keep messages between current user and selected user
  const conversationMessages = useMemo(() => {
    const me = String(currentUserId || "");
    const other = String(selectedId || "");
    const filtered = messages.filter((m) => {
      const s = String(m.senderId || "");
      const r = String(m.receiverId || "");
      return (
        (s === me && r === other) ||
        (s === other && r === me)
      );
    });
    filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    return filtered;
  }, [messages, currentUserId, selectedId]);

  // ✅ Group by day
  const messageGroups = useMemo(() => {
    const map = new Map();
    for (const m of conversationMessages) {
      const key = new Date(m.createdAt).toDateString();
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(m);
    }
    return Array.from(map.entries());
  }, [conversationMessages]);

  if (!currentUserId || !selectedId) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            ⚠️
          </div>
          <p>Missing user info. Select a conversation to view messages.</p>
        </div>
      </div>
    );
  }

  if (conversationMessages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            💬
          </div>
          <p>No messages yet. Start a conversation!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {messageGroups.map(([date, dayMessages]) => (
        <div key={date}>
          {/* Date Header */}
          <div className="flex justify-center mb-4">
            <span className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">
              {formatDateHeader(date)}
            </span>
          </div>

          {/* Messages */}
          <div className="space-y-4">
            {dayMessages.map((message, index) => {
              const isOwn = String(message.senderId) === String(currentUserId);
              const next = dayMessages[index + 1];

              // show avatar only when the next message is from a different sender
              const showAvatar =
                !next || String(next.senderId) !== String(message.senderId);

              // const text = message.text ?? message.content ?? "";
              // text + images normalize
              const text = (message.text ?? message.content ?? "").trim();

              const images = Array.isArray(message.image)
                ? message.image.filter(Boolean)
                : message.image
                  ? [message.image]
                  : message.mediaUrl
                    ? [message.mediaUrl]
                    : [];

              const hasImages = images.length > 0;

              return (
                <div
                  key={message._id || `${message.senderId}-${message.createdAt}-${index}`}
                  className={`flex gap-3 ${isOwn ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div className="flex-shrink-0">
                    {showAvatar ? (
                      <MuiAvatar
                        src={
                          isOwn
                            ? userData?.user?.image || userData?.image // ✅ current user avatar
                            : selectedUser?.image || selectedUser?.avatar // ✅ other user avatar
                        }
                        alt={isOwn ? userData?.user?.name || "Me" : selectedUser?.name || "User"}
                        sx={{ width: 32, height: 32, border: "2px solid #fff" }}
                      />
                    ) : (
                      <div className="w-8 h-8" />
                    )}
                  </div>

                  <div className={`flex flex-col ${isOwn ? "items-end" : "items-start"}`}>
                    {/* <div
                      className={`chat-bubble ${isOwn ? "chat-bubble-sent" : "chat-bubble-received"
                        }`}
                    >
                      {message.type === "IMAGE" && message.mediaUrl ? (
                        <div className="space-y-2">
                          <img
                            src={message.mediaUrl}
                            alt="Shared"
                            className="max-w-xs rounded-lg"
                          />
                          {text && <p className="text-sm">{text}</p>}
                        </div>
                      ) : (
                        <p>{text}</p>
                      )}
                    </div> */}

                    <div className={`chat-bubble ${isOwn ? "chat-bubble-sent" : "chat-bubble-received"}`}>
                      {hasImages && (
                        <div className="flex flex-wrap gap-2">
                          {images.map((src, i) => (
                            <img
                              key={i}
                              src={src}
                              alt="Shared"
                              className="max-w-[220px] md:max-w-[260px] rounded-lg border border-gray-300"
                            />
                          ))}
                        </div>
                      )}
                      {text && <p className={`${hasImages ? "mt-2" : ""} text-sm break-words`}>{text}</p>}
                    </div>

                    <span
                      className={`text-xs text-gray-400 mt-1 ${isOwn ? "text-right" : "text-left"
                        }`}
                    >
                      {formatTime(message.createdAt)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

