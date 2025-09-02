// import { useRef } from "react";
// import LightGallery from "lightgallery/react";
// import lgZoom from "lightgallery/plugins/zoom";
// import lgThumbnail from "lightgallery/plugins/thumbnail";
// import "lightgallery/css/lightgallery.css";
// import "lightgallery/css/lg-thumbnail.css";
// import "lightgallery/css/lg-zoom.css";

// const ImageGallery = ({ images }) => {
//   const galleryRef = useRef(null);

//   console.log("Images in Gallery:", )

//   return (
//     <div>
//       <div className="gallery-wrapper">
//       <LightGallery
//         onInit={() => {}}
//         plugins={[lgZoom, lgThumbnail]}
//         elementClassNames="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
//       >
//         {images?.map((img, index) => (
//           <a
//             key={index}
//             href={img.src || img} // Lightbox opens from this link
//             data-sub-html={img.caption || ""}
//           >
//             {/* <img
//               src={img.thumb || img.src || img}
//               alt={img.caption || "gallery image"}
//               className="w-full h-48 object-cover rounded-lg shadow"
//             /> */}

//             click
//           </a>
//         ))}
//       </LightGallery>
//     </div>
//     </div>
//   );
// };

// export default ImageGallery;





import { useRef } from "react"
import LightGallery from "lightgallery/react"
import lgZoom from "lightgallery/plugins/zoom"
import lgThumbnail from "lightgallery/plugins/thumbnail"
import "lightgallery/css/lightgallery.css"
import "lightgallery/css/lg-thumbnail.css"
import "lightgallery/css/lg-zoom.css"

const ImageGallery = ({ images }) => {
  const galleryRef = useRef(null)

  const openGallery = () => {
    if (galleryRef.current) {
      galleryRef.current.openGallery(0) // Open gallery starting from first image
    }
  }

  if (!images || images.length === 0) {
    return null
  }

  return (
    <div>
      <div className="single-image-view">
        <img
          src={images[0].thumb || images[0].src || images[0]}
          alt={images[0].caption || "gallery image"}
          className="w-full h-64 md:h-1/2 md:w-2/3  object-cover rounded-lg shadow-md"
        />

        {images.length > 1 && (
          <div className="flex justify-center md:justify-start">
            <button
              onClick={openGallery}
              className="cursor-pointer mt-4 px-6 py-2 bg-[#468F9D] text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Click to view more photos
            </button>
          </div>
        )}
      </div>

      <div className="gallery-wrapper" style={{ display: "none" }}>
        <LightGallery
          onInit={(detail) => {
            galleryRef.current = detail.instance
          }}
          plugins={[lgZoom, lgThumbnail]}
          elementClassNames="hidden"
        >
          {images?.map((img, index) => (
            <a key={index} href={img.src || img} data-sub-html={img.caption || ""}>
              <img
                src={img.thumb || img.src || img}
                alt={img.caption || "gallery image"}
                className="w-full h-48 object-cover rounded-lg shadow"
              />
            </a>
          ))}
        </LightGallery>
      </div>
    </div>
  )
}

export default ImageGallery

