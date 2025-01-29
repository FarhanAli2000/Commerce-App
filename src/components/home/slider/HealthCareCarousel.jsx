import React, { useRef, useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { db } from "./../../Firebase/FirebaseConfig.jsx";
import { getDocs, collection } from "firebase/firestore";

// Function to format the time ago in human-readable form
const timeAgo = (timestamp) => {
  const date = new Date(timestamp); // Convert ISO string to Date object
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Get difference in days

  if (diffDays === 0) {
    return "Today"; // If posted today
  }
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`; // Return difference in days
};

export default function AutomativeCarousel() {
  const [slidesToShow, setSlidesToShow] = useState(5);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const adsCollection = collection(db, "HealthCare"); // Get reference to the 'HealthCare' collection
        const adsSnapshot = await getDocs(adsCollection); // Fetch the data
        const adsList = adsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), // Spread the document data
        }));
        console.log(adsList, "mydata");
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

  const slider = useRef();

  return (
    <section className="featured-section-color electronic_card_section">
      <div className="container">
        <div className="row align-items-center">
          <div className="featuresection_infodev">
            <h4 className="featuresection_header">Healthcare</h4>
            <button className="featuresection_btn">View All</button>
          </div>

          <div className="feature-section-info">
            <ul className="info-list">
              <li>Sugar Apparatus</li>
              <li>BP Apparatus</li>
              <li>Medicines</li>
            </ul>
          </div>

          <div className="featureline">
            <div className="highlighter"></div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div>
              <Slider
                ref={slider}
                {...settings}
                className="featured-slider grid-view"
              >
                {ads.map((ad) => (
                  <Link
                    // to={`/car-details/${ad.id}`}
                    to={`/car-details?id=${ad.id}&callingFrom=HealthCare`}
                  >
                    <div key={ad.id} className="card aos" data-aos="fade-up">
                      <div className="blog-widget">
                        <div className="blog-img">
                          <img
                            src={ad.img}
                            className="img-fluid"
                            alt={ad.name}
                            style={{ height: "200px", objectFit: "cover" }}
                          />
                        </div>
                        <div className="bloglist-content">
                          <div className="card-body">
                            <h6>
                              <Link to={`/car-details/${ad.id}`}>
                                {ad.title}
                              </Link>
                            </h6>
                            <div className="location-info">
                              <p style={{ fontSize: "0.7rem" }}>{ad.details}</p>
                            </div>
                            <div className="blog-location-details">
                              <div
                                className="location-info"
                                style={{ marginTop: "1rem" }}
                              >
                                {ad.location}
                              </div>
                            </div>
                            <div className="amount-details">
                              <div className="amount">
                                <span
                                  className="validrate"
                                  style={{ fontFamily: "Inter" }}
                                >
                                  ${ad.price}
                                </span>
                              </div>
                              <div
                                className="ratings"
                                style={{ fontFamily: "Inter" }}
                              >
                                {timeAgo(ad.postedAgo)}{" "}
                                {/* Call timeAgo function here */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
