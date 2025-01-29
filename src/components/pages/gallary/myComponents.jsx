import React from "react";
import {
  GalleryImg1,
  GalleryImg2,
  GalleryImg3,
  GalleryImg9,
  gallery_1_jpg,
  gallery_2_jpg,
  gallery_3_jpg,
  gallery_4_jpg,
  gallery_5_jpg,
  galleryimage_1,
  galleryimage_10,
  galleryimage_12,
  galleryimage_2,
  galleryimage_3,
  galleryimage_4,
  galleryimage_5,
  galleryimage_6,
  galleryimage_7,
  galleryimage_8,
  galleryimage_9,
} from "../../imagepath";
import { Link } from "react-router-dom";

import { SlideshowLightbox } from "lightbox.js-react";
import "lightbox.js-react/dist/index.css";

const Apps = () => {
  const galleryItems = [
    { original: galleryimage_1 },
    { original: galleryimage_2 },
    { original: galleryimage_3 },
    { original: galleryimage_4 },
    { original: galleryimage_5 },
    { original: galleryimage_6 },
    { original: galleryimage_7 },
    { original: galleryimage_8 },
    { original: galleryimage_9 },
    { original: galleryimage_10 },
    { original: galleryimage_12 },
    { original: galleryimage_3 },
  ];

  return (
    <div className="row">
      {galleryItems.map((item, index) => (
        <div className="col-lg-3 col-md-3 col-sm-3">
          <div className="galleryimg">
            <Link to="#" data-fancybox="gallery1">
              <SlideshowLightbox>
                <img className="img-fluid" alt="Image" src={item.original} />
              </SlideshowLightbox>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Apps;
