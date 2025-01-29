import React, { useRef, useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { db } from "./../../Firebase/FirebaseConfig.jsx";
import { getDocs, collection } from "firebase/firestore";

// Function to calculate the difference in days
const timeAgo = (timestamp) => {
  if (!timestamp) return "Date not available"; // Handle missing timestamp

  const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp); // Handle Firestore Timestamp
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Convert time difference to days

  return diffDays === 0
    ? "Today"
    : `${diffDays} day${diffDays > 1 ? "s" : ""} ago`; // Return formatted string
};

export default function Carousel() {
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const slider = useRef();

  // Fetch ads from Firestore
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const adsCollection = collection(db, "books"); // Get reference to the 'ads' collection
        const adsSnapshot = await getDocs(adsCollection); // Fetch the data
        const adsList = adsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), // Spread the document data
        }));
        console.log(adsList, "adsList_____________");
        setAds(adsList); // Set the state with the ads data
        setLoading(false); // Stop loading when data is fetched
      } catch (error) {
        console.error("Error fetching ads:", error);
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width <= 767) {
        setSlidesToShow(1);
      } else if (width >= 768 && width <= 1024) {
        setSlidesToShow(5);
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
    arrows: true,
    infinite: true,
    lazyLoad: true,
    speed: 1000,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
  };

  return (
    <section className="featured-section">
      <div className="container">
        <div className="row align-items-center">
          <div
            className="col-md-10 aos aos-init aos-animate"
            data-aos="fade-up"
          >
            <div className="section-heading">
              <h3>Feature Ads</h3>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div>
              {loading ? (
                <div className="loading">Loading...</div> // Display loading text or spinner
              ) : (
                <Slider
                  ref={slider}
                  {...settings}
                  className="featured-slider grid-view"
                >
                  {ads.map((item) => (
                    <div key={item.id} className="card aos" data-aos="fade-up" style={{ height: "400px", display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "hidden" }}>
                      <div className="blog-widget">
                        <div className="blog-img" style={{ height: "200px", width: "100%", overflow: "hidden" }}>
                          <Link to={`/routes/${item.id}`}>
                            <img
                              src={item.img}
                              className="img-fluid"
                              alt="blog-img"
                              style={{ objectFit: "cover", width: "100%", height: "100%" }}
                            />
                          </Link>
                          {item.isFeatured && (
                            <div className="fav-item">
                              <span className="Featured-text">Featured</span>
                            </div>
                          )}
                        </div>
                        <div className="bloglist-content" style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                          <div className="card-body">
                            <h6>
                              <Link to="/index">{item.title}</Link>
                            </h6>
                            <p
                              style={{ fontSize: "0.7rem", lineHeight: "none" }}
                            >
                              Education | Education | Education
                            </p>
                            <div className="blog-location-details">
                              <div className="location-info mt-2" style={{ fontFamily: "Inter" }}>
                                {item.location}
                              </div>
                            </div>
                            <div className="amount-details">
                              <div className="amount">
                                <span className="validrate" style={{ fontFamily: "Inter" }}>
                                  ${item.price}
                                </span>
                              </div>
                              <div className="ratings">
                                {timeAgo(item.timeAgo)} {/* Use timeAgo function */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
