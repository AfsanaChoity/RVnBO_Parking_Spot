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


// import { useState, useRef } from "react";
// import { Send, Image } from "lucide-react";
// import { Button as MuiButton } from "@mui/material";

// export const MessageInput = ({ onSendMessage, disabled = false }) => {
//   const [message, setMessage] = useState("");
//   const [selectedImage, setSelectedImage] = useState(null);
//   const fileInputRef = useRef(null);

//   const handleImageChange = (e) => {
//   const file = e.target.files[0];
//   if (file) {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setSelectedImage(reader.result); // this will be a Base64 string
//     };
//     reader.readAsDataURL(file);
//   }

//   console.log("Image file : ",file)
//   console.log("selected Image : ",selectedImage)
// };


//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if ((message.trim() || selectedImage) && !disabled) {
//       onSendMessage({
//         text: message.trim() || "",
//         image: selectedImage,
        
//       });
//       // console.log("Sending message:", message);
//       // console.log("Sending image:", selectedImage);

//       setMessage("");
//       setSelectedImage(null);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit(e);
//     }
//   };

//   const handleImageClick = () => {
//     fileInputRef.current?.click();
//   };

  

//   return (
//     <div className="p-4 border-t border-gray-400">
//       <form onSubmit={handleSubmit} className="flex items-center gap-3">
//         {/* Media buttons */}
//         <div className="flex gap-2">
//           <button
//             type="button"
//             className="p-2 text-gray-500 hover:text-black transition-colors cursor-pointer"
//             title="Send image"
//             onClick={handleImageClick}
//           >
//             <Image size={28} />
//           </button>
//           {/* Hidden file input */}
//           <input
//             type="file"
//             accept="image/*"
//             ref={fileInputRef}
//             style={{ display: "none" }}
//             onChange={handleImageChange}
//           />
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

//         {/* Image preview (if any) */}
//         {selectedImage && (
//           <div className="relative">
//             <img
//               src={selectedImage}
//               alt="preview"
//               className="w-12 h-12 object-cover rounded-md border border-gray-400"
//             />
//             <button
//               type="button"
//               className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-1 text-xs"
//               onClick={() => setSelectedImage(null)}
//             >
//               ✕
//             </button>
//           </div>
//         )}

//         {/* Send button */}
//         <div>
//           <MuiButton
//             type="submit"
//             disabled={(!message.trim() && !selectedImage) || disabled}
//             variant="contained"
//             color="primary"
//             sx={{
//               padding: "10px 12px",
//               backgroundColor: "#008080",
//               "&:hover": {
//                 backgroundColor: "#004f4f",
//               },
//             }}
//           >
//             <Send size={24} />
//           </MuiButton>
//         </div>
//       </form>
//     </div>
//   );
// };


import { useState, useRef } from "react";
import { Send, Image } from "lucide-react";
import { Button as MuiButton } from "@mui/material";
import toast from "react-hot-toast";

// Utility to convert images to Base64
const getBase64 = (file) => {
  console.log("Converting file to Base64:", file);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const MessageInput = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const fileInputRef = useRef(null);

  // Handle image selection and convert to Base64
  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    console.log("Selected files:", files);

    try {
      // const base64Images = await Promise.all(files.map(f => getBase64(f)));
      setSelectedImages(prev => [...prev, ...files]);
    } catch (error) {
      toast.error("Error converting images.");
    }
  };

  const handleRemoveImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    // Validation
    if ((!message.trim() && selectedImages.length === 0) || disabled) {
      toast.error("Please add a message or an image before submitting.");
      return;
    }

    // Send images and message to parent handler
    const image = selectedImages.length > 0 ? selectedImages : null;
    const senderData = {
      text: message.trim() || "",
      image, // Send Base64 images
    }
    console.log("senderData ", senderData)
    onSendMessage(senderData);

    setMessage("");
    setSelectedImages([]); // Clear images after sending
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
            multiple
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileUpload}
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
        {selectedImages.length > 0 && (
          <div className="relative flex gap-2">
            {selectedImages.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="w-12 h-12 object-cover rounded-md border border-gray-400"
                />
                <button
                  type="button"
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-1 text-xs"
                  onClick={() => handleRemoveImage(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Send button */}
        <div>
          <MuiButton
            type="submit"
            disabled={(!message.trim() && selectedImages.length === 0) || disabled}
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
