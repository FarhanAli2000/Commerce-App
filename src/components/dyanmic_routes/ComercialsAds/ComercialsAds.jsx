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
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import img1 from "./img1.png";
import img2 from "./image 39 (2).png";
import img3 from "./img3.png";
import img4 from "./image 41 (1).png";

export default function Carousel() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const [slidesToShow, setSlidesToShow] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width <= 767) {
        setSlidesToShow(1);
      } else if (width >= 768 && width <= 1024) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(4);
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
  return (
    <section className="featured-section bg-white commercials_card_section ">
      <div className="container">
        <div className="row align-items-center">
          <div className=" featuresection_infodev1  featuresection_infodev mb-5 ">
            <h4 className="featuresection_header  ">Commercials Ads</h4>
            <button className="featuresection_btn   featuresection_btn1 ">
              View All Ads
            </button>
          </div>

          <button
            type="button owl-button"
            role="presentation"
            className="owl-prev   owl-prev2"
            onClick={() => {
              console.log(slider?.current);
              slider?.current?.slickPrev();
            }}
          >
            <FontAwesomeIcon icon={faAngleLeft} />{" "}
          </button>
          <button
            type="button owl-button"
            role="presentation"
            className="owl-next  owl-next-2 "
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
                className=" featured-slider grid-view"
              >
                <div className="card aos" data-aos="fade-up">
                  <div className="blog-widget">
                    <div className="blog-img">
                      <Link to="/service-details">
                        <img src={img1} className="img-fluid" alt="blog-img" />
                      </Link>
                      {/* <div className="fav-item">
                        <span className="Featured-text">Featured</span>
                      </div> */}
                    </div>
                    {/* <div className="bloglist-content">
                      <div className="card-body">
                        <div className="blogfeaturelink"></div>
                        <h6>
                          <Link to="/service-details">
                            2017 Gulfsteam Ameri-lite
                          </Link>
                        </h6>
                        <div className="blog-location-details">
                          <div className="location-info">Los Angeles</div>
                        </div>
                        <div className="amount-details">
                          <div className="amount">
                            <span className="validrate">$350</span>
                          </div>
                          <div className="ratings">1 DAY AGO</div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>

                <div className="card aos" data-aos="fade-up">
                  <div className="blog-widget">
                    <div className="blog-img">
                      <Link to="/index">
                        <img src={img2} className="img-fluid" alt="blog-img" />
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="card aos" data-aos="fade-up">
                  <div className="blog-widget">
                    <div className="blog-img">
                      <Link to="/service-details">
                        <img src={img1} className="img-fluid" alt="blog-img" />
                      </Link>
                      {/* <div className="fav-item">
                        <span className="Featured-text">Featured</span>
                      </div> */}
                    </div>
                    {/* <div className="bloglist-content">
                      <div className="card-body">
                        <div className="blogfeaturelink"></div>
                        <h6>
                          <Link to="/service-details">
                            2017 Gulfsteam Ameri-lite
                          </Link>
                        </h6>
                        <div className="blog-location-details">
                          <div className="location-info">Los Angeles</div>
                        </div>
                        <div className="amount-details">
                          <div className="amount">
                            <span className="validrate">$350</span>
                          </div>
                          <div className="ratings">1 DAY AGO</div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>

                <div className="card aos" data-aos="fade-up">
                  <div className="blog-widget">
                    <div className="blog-img">
                      <Link to="/service-details">
                        <img src={img2} className="img-fluid" alt="blog-img" />
                      </Link>
                      {/* <div className="fav-item">
                        <span className="Featured-text">Featured</span>
                      </div> */}
                    </div>
                    {/* <div className="bloglist-content">
                      <div className="card-body">
                        <div className="blogfeaturelink"></div>
                        <h6>
                          <Link to="/service-details">
                            2017 Gulfsteam Ameri-lite
                          </Link>
                        </h6>
                        <div className="blog-location-details">
                          <div className="location-info">Los Angeles</div>
                        </div>
                        <div className="amount-details">
                          <div className="amount">
                            <span className="validrate">$350</span>
                          </div>
                          <div className="ratings">1 DAY AGO</div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>

                <div className="card aos" data-aos="fade-up">
                  <div className="blog-widget">
                    <div className="blog-img">
                      <Link to="/service-details">
                        <img src={img2} className="img-fluid" alt="blog-img" />
                      </Link>
                      {/* <div className="fav-item">
                        <span className="Featured-text">Featured</span>
                      </div> */}
                    </div>
                    {/* <div className="bloglist-content">
                      <div className="card-body">
                        <div className="blogfeaturelink"></div>
                        <h6>
                          <Link to="/service-details">
                            2017 Gulfsteam Ameri-lite
                          </Link>
                        </h6>
                        <div className="blog-location-details">
                          <div className="location-info">Los Angeles</div>
                        </div>
                        <div className="amount-details">
                          <div className="amount">
                            <span className="validrate">$350</span>
                          </div>
                          <div className="ratings">1 DAY AGO</div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
