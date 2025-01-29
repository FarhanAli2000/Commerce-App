import React, { useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Feature2,
  Feature3,
  Feature4,
  Feature5,
  Feature9,
  ProfileAvatar02,
  ProfileAvatar04,
  ProfileAvatar05,
  ProfileAvatar06,
} from "../../imagepath";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import img from "./automotive.png";

export default function AutomativeCarousel() {
  const [slidesToShow, setSlidesToShow] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width <= 767) {
        setSlidesToShow(1);
      } else if (width >= 768 && width <= 1024) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(5);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    lazyLoad: true,
    speed: 1000,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
  };

  const slider = useRef();

  // Inline styles for the card and image
  const cardStyle = {
    height: "400px", // Fixed height for the card
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    overflow: "hidden", // Prevent content overflow
  };

  const imageStyle = {
    objectFit: "cover", // Ensure the image fits the space
    width: "100%",
    height: "200px", // Adjust the image height to fit within the card
  };

  const contentStyle = {
    flexGrow: 1, // Allow content to grow and take available space
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between", // Ensures content is spaced out
    padding: "1rem",
    overflow: "hidden", // Prevent overflow if content is too long
  };

  return (
    <section className="featured-section-color automotive_card_section">
      <div className="container">
        <div className="row align-items-center">
          <div className="featuresection_infodev">
            <h4 className="featuresection_header">Automative</h4>
            <button className="featuresection_btn">View All</button>
          </div>

          <div className="feature-section-info">
            <ul className="info-list">
              <li>Car For Sales</li>
              <li>Car For Sales</li>
              <li>Car For Sales</li>
              <li>Car For Sales</li>
              <li>Car For Sales</li>
            </ul>
          </div>

          <div className="featureline">
            <div className="highlighter"></div>
          </div>

          <button
            type="button"
            role="presentation"
            className="owl-prev owl-button"
            onClick={() => slider?.current?.slickPrev()}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>

          <button
            type="button"
            role="presentation"
            className="owl-next owl-button"
            onClick={() => slider?.current?.slickNext()}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div>
              <Slider
                ref={slider}
                {...settings}
                className="featured-slider grid-view"
              >
                {[...Array(6)].map((_, index) => (
                  <div className="card aos" data-aos="fade-up" key={index} style={cardStyle}>
                    <div className="blog-widget">
                      <div className="blog-img">
                        <Link to="/automative">
                          <img src={img} className="img-fluid" alt="blog-img" style={imageStyle} />
                        </Link>
                      </div>
                      <div className="bloglist-content" style={contentStyle}>
                        <div className="card-body">
                          <h6>
                            <Link to="/automative">Mercedez Benz</Link>
                          </h6>
                          <div className="location-info">
                            <p style={{ fontSize: "0.7rem" }}>
                              Education | Education | Education
                            </p>
                          </div>
                          <div className="blog-location-details">
                            <div className="location-info" style={{ marginTop: "1rem" }}>
                              Los Angeles
                            </div>
                          </div>
                          <div className="amount-details">
                            <div className="amount">
                              <span className="validrate" style={{ fontFamily: "Inter" }}>
                                $350
                              </span>
                            </div>
                            <div className="ratings" style={{ fontFamily: "Inter" }}>
                              1 DAY AGO
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
