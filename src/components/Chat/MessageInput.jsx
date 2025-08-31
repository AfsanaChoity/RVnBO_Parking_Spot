// import { useState } from "react";
// import { Send, Image, Paperclip } from "lucide-react";
// import { Button as MuiButton } from "@mui/material"; 

// export const MessageInput = ({ onSendMessage, disabled = false }) => {
//   const [message, setMessage] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (message.trim() && !disabled) {
//       // onSendMessage(message.trim());
//       onSendMessage({ text: message.trim(), image: null });
//       setMessage("");
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit(e);
//     }
//   };

//   return (
//     <div className="p-4 border-t border-gray-400">
//       <form onSubmit={handleSubmit} className="flex items-center gap-3">

//         {/* Sending image */}
//         <div className="flex gap-2  ">
//           <button
//             type="button"
//             className="p-2 text-gray-500 hover:text-black transition-colors cursor-pointer"
//             title="Send image"
//           >
//             <Image size={28} />
//           </button>
          
//         </div>

//         {/* Message input */}
//         <div className="flex-1 relative">
//           <textarea
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyPress={handleKeyPress}
//             placeholder="Send a message"
//             disabled={disabled}
//             className="w-full px-4 py-3 border border-gray-700 rounded-lg placeholder-gray-400 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 resize-none max-h-32"
//             rows={1}
//             style={{
//               height: "auto",
//               minHeight: "48px",
//             }}
//             onInput={(e) => {
//               const target = e.target;
//               target.style.height = "auto";
//               target.style.height = target.scrollHeight + "px";
//             }}
//           />
//         </div>

//         {/* Send button */}
//         <div>
//           <MuiButton
//           type="submit"
//           disabled={!message.trim() || disabled}
//           variant="contained"
//           color="primary"
//           sx={{
//             padding: "10px 12px",
//             backgroundColor: "#008080",
//             '&:hover': {
//               backgroundColor: "#004f4f",
//             },
//           }}
//         >
//           <Send size={24} />
//         </MuiButton>
//         </div>
//       </form>
//     </div>
//   );
// };


import { useState, useRef } from "react";
import { Send, Image } from "lucide-react";
import { Button as MuiButton } from "@mui/material";

export const MessageInput = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result); // this will be a Base64 string
    };
    reader.readAsDataURL(file);
  }
};


  const handleSubmit = (e) => {
    e.preventDefault();
    if ((message.trim() || selectedImage) && !disabled) {
      onSendMessage({
        text: message.trim() || "",
        image: selectedImage,
      });
      setMessage("");
      setSelectedImage(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  

  return (
    <div className="p-4 border-t border-gray-400">
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        {/* Media buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-black transition-colors cursor-pointer"
            title="Send image"
            onClick={handleImageClick}
          >
            <Image size={28} />
          </button>
          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
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

        {/* Image preview (if any) */}
        {selectedImage && (
          <div className="relative">
            <img
              src={selectedImage}
              alt="preview"
              className="w-12 h-12 object-cover rounded-md border border-gray-400"
            />
            <button
              type="button"
              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-1 text-xs"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
          </div>
        )}

        {/* Send button */}
        <div>
          <MuiButton
            type="submit"
            disabled={(!message.trim() && !selectedImage) || disabled}
            variant="contained"
            color="primary"
            sx={{
              padding: "10px 12px",
              backgroundColor: "#008080",
              "&:hover": {
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
