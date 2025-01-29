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
  galleryimage_9,
} from "../../imagepath";
import { Link } from "react-router-dom";

import { SlideshowLightbox } from "lightbox.js-react";
import "lightbox.js-react/dist/index.css";

const Roomsprofile = () => {
  const galleryItems = [
    { original: GalleryImg1 },
    { original: GalleryImg2 },
    { original: GalleryImg3 },
    { original: GalleryImg9 },
  ];

  return (
    <div className="row">
      {galleryItems.map((item, index) => (
        <div className="col-lg-3  col-md-3 col-sm-3" key={index}>
          <div className="review-gallery">
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
export default Roomsprofile;
