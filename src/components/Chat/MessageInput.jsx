import { useState } from "react";
import { Send, Image, Paperclip } from "lucide-react";
import { Button as MuiButton } from "@mui/material"; 

export const MessageInput = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      // onSendMessage(message.trim());
      onSendMessage({ text: message.trim(), image: null });
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="p-4 border-t border-gray-400">
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        {/* Media buttons */}
        <div className="flex gap-2  ">
          <button
            type="button"
            className="p-2 text-gray-400 hover:text-white transition-colors"
            title="Send image"
          >
            <Image size={28} />
          </button>
          
        </div>

        {/* Message input */}
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Send a message"
            disabled={disabled}
            className="w-full px-4 py-3 border border-gray-700 rounded-lg placeholder-gray-400 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 resize-none max-h-32"
            rows={1}
            style={{
              height: "auto",
              minHeight: "48px",
            }}
            onInput={(e) => {
              const target = e.target;
              target.style.height = "auto";
              target.style.height = target.scrollHeight + "px";
            }}
          />
        </div>

        {/* Send button */}
        <div>
          <MuiButton
          type="submit"
          disabled={!message.trim() || disabled}
          variant="contained"
          color="primary"
          sx={{
            padding: "10px 12px",
            backgroundColor: "#008080",
            '&:hover': {
              backgroundColor: "#004f4f",
            },
          }}
        >
          <Send size={24} />
        </MuiButton>
        </div>
      </form>
    </div>
  );
};
