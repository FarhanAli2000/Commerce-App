import React, { useRef, useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { db } from "./../../Firebase/FirebaseConfig.jsx";
import { getDocs, collection } from "firebase/firestore";

// Function to calculate the difference in days
const timeAgo = (timestamp) => {
  // Convert Firestore Timestamp to JavaScript Date object
  const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp); // Handle Firestore Timestamp
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Convert time difference to days
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`; // Return formatted string
};

export default function AutomativeCarousel() {
  const [slidesToShow, setSlidesToShow] = useState(5);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const adsCollection = collection(db, "RealEstate"); // Get reference to the 'ads' collection
        const adsSnapshot = await getDocs(adsCollection); // Fetch the data
        const adsList = adsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), // Spread the document data
        }));
        console.log("Ads data fetched from backend:", adsList);
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
            <h4 className="featuresection_header">Real Estate</h4>
            <button className="featuresection_btn">View All</button>
          </div>

          <div className="feature-section-info">
            <ul className="info-list">
              <li>Sale Property</li>
              <li>Rent Property </li>
              <li>Buy Property</li>
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
                    to={`/car-details?id=${ad.id}&callingFrom=RealEstate`}
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
                              <p style={{ fontSize: "0.7rem" }}>
                                {ad.description}
                              </p>
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
                                {timeAgo(ad.timeAgo)}{" "}
                                {/* Format the time field */}
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
