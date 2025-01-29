import React from "react";
import {
  gallery_1_jpg,
  gallery_2_jpg,
  gallery_3_jpg,
  gallery_4_jpg,
} from "../../imagepath";
import { Link } from "react-router-dom";

import { SlideshowLightbox } from "lightbox.js-react";
import "lightbox.js-react/dist/index.css";

const Rooms = () => {
  const galleryItems = [
    { original: gallery_1_jpg },
    { original: gallery_2_jpg },
    { original: gallery_3_jpg },
    { original: gallery_4_jpg },
  ];

  return (
    <div className="bannergallery-section">
      <div className="gallery-slider d-flex">
        {galleryItems.map((item, index) => (
          <div className="gallery-widget" key={index}>
            <Link to="#" data-fancybox="gallery1">
              <SlideshowLightbox>
                <img className="img-fluid" alt="Image" src={item.original} />
              </SlideshowLightbox>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Rooms;
