import React, { useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { Feature9 } from "../../imagepath";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
// import { useMyContext } from "../../store/Contexxt.store";
// import { Product } from "../../Api/Api";
import image from "./image.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

export default function Carousel() {
  const [slidesToShow, setSlidesToShow] = useState(5);
  // const { cartApi, setCartApi } = useMyContext();

  // const fetchData = async () => {
  //   try {
  //     const response = await Product();
  //     setCartApi(response.data);
  //     // console.log("data", response.data);
  //   } catch (error) {
  //     console.log("error", error.message);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

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

  const data = {
    books: [
      {
        id: 1,
        book_title: " Gulfstream Ameri-lite",
        image_url: "https://via.placeholder.com/150?text=ML+Book",
        location: "New York, USA",
        price: "$39.99",
        time_ago: "1 DAY AGO",
      },
      {
        id: 2,
        book_title: " Gulfstream Ameri-lite",
        image_url: "https://via.placeholder.com/150?text=Physics+Book",
        location: "London, UK",
        price: "$49.99",
        time_ago: "1 DAY AGO",
      },
      {
        id: 3,
        book_title: " Gulfstream Ameri-lite",
        image_url: "https://via.placeholder.com/150?text=Maths+Book",
        location: "Berlin, Germany",
        price: "$59.99",
        time_ago: "1 DAY AGO",
      },
      {
        id: 4,
        book_title: " Gulfstream Ameri-lite",
        image_url: "https://via.placeholder.com/150?text=History+Book",
        location: "Tokyo, Japan",
        price: "$29.99",
        time_ago: "1 DAY AGO",
      },
      {
        id: 5,
        book_title: " Gulfstream Ameri-lite",
        image_url: "https://via.placeholder.com/150?text=Programming+Book",
        location: "Sydney, Australia",
        price: "$24.99",
        time_ago: "1 DAY AGO",
      },
    ],
  };

  console.log("data", data);

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
    <section className="featured-section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 aos aos-init aos-animate" data-aos="fade-up">
            <div className="section-heading">
              <h3>Feature Ads</h3>
            </div>
          </div>

          <button
            type="button"
            role="presentation"
            className="owl-button owl-prev   owl-prev1"
            onClick={() => {
              console.log(slider?.current);
              slider?.current?.slickPrev();
            }}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <button
            type="button"
            role="presentation"
            className="owl-button owl-next  owl-next-1 "
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
                {data.books.map((item) => (
                  <div key={item.id} className="card aos" data-aos="fade-up" style={{ height: "350px" }}>
                    <div className="blog-widget">
                      <div className="blog-img">
                        {/* <Link to="/service-details"> */}
                        <Link to={`/routes/${item.id}`}>
                          {/* Feature_Ads */}
                          <img
                            src={image}
                            className="img-fluid"
                            alt="blog-img"
                          />
                        </Link>
                        <div className="fav-item">
                          <span className="Featured-text">Featured</span>
                        </div>
                      </div>
                      <div className="bloglist-content">
                        <div className="card-body">
                          <div className="blogfeaturelink"></div>
                          <h6>
                            <Link to="/index">{item.book_title}</Link>
                          </h6>
                          <p style={{ fontSize: "0.7rem", lineHeight: "none" }}>
                            Education | Education | Education
                          </p>
                          <div className="blog-location-details ">
                            <div
                              className="location-info  mt-2"
                              style={{ fontFamily: "Inter" }}
                            >
                              {item.location}
                            </div>
                          </div>
                          <div className="amount-details">
                            <div className="amount">
                              <span
                                className="validrate"
                                style={{ fontFamily: "Inter" }}
                              >
                                {item.price}
                              </span>
                            </div>
                            <div className="ratings">{item.time_ago}</div>
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
