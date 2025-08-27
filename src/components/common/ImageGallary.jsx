import { useRef } from "react";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";

const ImageGallery = ({ images }) => {
  const galleryRef = useRef(null);

  return (
    <div className="gallery-wrapper">
      <LightGallery
        onInit={() => {}}
        plugins={[lgZoom, lgThumbnail]}
        elementClassNames="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {images?.map((img, index) => (
          <a
            key={index}
            href={img.src || img} // Lightbox opens from this link
            data-sub-html={img.caption || ""}
          >
            <img
              src={img.thumb || img.src || img}
              alt={img.caption || "gallery image"}
              className="w-full h-48 object-cover rounded-lg shadow"
            />
          </a>
        ))}
      </LightGallery>
    </div>
  );
};

export default ImageGallery;
