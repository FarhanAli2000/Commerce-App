import React, { useState, useEffect } from "react";
import Footer from "./footer/Footer";
import Header from "./header";
import img from "./home-07.jpg";
import tick from "./tick.png";
import bullet from "./bullet.png";
import profile from "./profileimage.png";
import { FaWhatsapp } from "react-icons/fa";
import { FaMobile } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { useParams, useLocation } from "react-router";
import { useMyContext } from "../../store/Contexxt.store";
import arrow from "./Vector.png";
import left from "./left.png";
import right from "./right.png";
import share from "./sahere.png";
import report from "./report.png";
import carimg from "./carimg.png";
import image1 from "../../../assets/img/banner/bannerimage1.png";
import image2 from "../../../assets/img/banner/bannerimage2.png";
import image3 from "../../../assets/img/banner/bannerimage3.png";
import image4 from "../../../assets/img/banner/bannerimage4.png";
import ads from "./adsimg.png";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../Firebase/FirebaseConfig";
import { formatDistanceToNow } from "date-fns";
import Spinner from "react-bootstrap/Spinner";

const Dynamic_Route = () => {
  const { id } = useParams();
  const location = useLocation(); // Access the full location object

  const getQueryParam = (param) => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get(param);
  };
  const [_Id, setId] = useState(null); // State to store ads data
  const [callingFrom, setCallingFrom] = useState(null); // State to store ads data

  useEffect(() => {
    const callingFrom = getQueryParam("callingFrom");
    const ids = getQueryParam("id");

    console.log("callingFrom______ID:ids", ids);
    console.log("callingFrom______Calling From:", callingFrom);
    setCallingFrom(callingFrom);
    setId(ids);
  }, [id, location]);

  const [itemData, setItemData] = useState(null); // State to store ads data
  const [loading, setLoading] = useState(false); // Loading state

  console.log(itemData, "item Data__________-itemData");
  // const NewId = callingFrom === "automotive" || "RealEstate" ? _Id : id;
  const NewId =
    callingFrom === "AutomotiveComp"
      ? _Id
      : callingFrom === "ElectronicComp"
      ? _Id
      : callingFrom === "FashionStyle"
      ? _Id
      : callingFrom === "HealthCareComp"
      ? _Id
      : callingFrom === "JobBoard"
      ? _Id
      : callingFrom === "EducationCmp"
      ? _Id
      : callingFrom === "RealEstateComp"
      ? _Id
      : callingFrom === "TravelComp"
      ? _Id
      : callingFrom === "SportGamesComp"
      ? _Id
      : callingFrom === "PetAnimalsComp"
      ? _Id
      : id;

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true); // Start loading
      try {
        const collectionName =
          callingFrom === "AutomotiveComp"
            ? "Cars"
            : callingFrom === "ElectronicComp"
            ? "ELECTRONICS"
            : callingFrom === "FashionStyle"
            ? "FASHION"
            : callingFrom === "HealthCareComp"
            ? "HEALTHCARE"
            : callingFrom === "JobBoard"
            ? "JOBBOARD"
            : callingFrom === "EducationCmp"
            ? "Education"
            : callingFrom === "RealEstateComp"
            ? "REALESTATECOMP"
            : callingFrom === "TravelComp"
            ? "TRAVEL"
            : callingFrom === "SportGamesComp"
            ? "SPORTSGAMESComp"
            : callingFrom === "PetAnimalsComp"
            ? "PETANIMALCOMP"
            : "books";
        // Determine collection based on `callingFrom`
        // const collectionName = callingFrom === "automotive" ? "carData" : "books";
        const adsCollection = collection(db, collectionName); // Reference to dynamic collection
        const adsSnapshot = await getDocs(adsCollection); // Fetch all documents
        const adsList = adsSnapshot.docs.map((doc) => ({
          id: doc.id, // Include document ID
          ...doc.data(), // Spread document data
        }));

        console.log(adsList, "Fetched Ads");

        // Find the ad that matches the `id` from the URL
        const selectedAd = adsList.find((ad) => ad.id === NewId);
        if (selectedAd) {
          setItemData({
            ...selectedAd,
            timeAgo: selectedAd.createdAt
              ? formatDistanceToNow(selectedAd.createdAt.toDate(), {
                  addSuffix: true,
                })
              : "Unknown time",
          });
        } else {
          setItemData(null);
        }

        setLoading(false); // Stop loading
      } catch (error) {
        console.error("Error fetching item:", error);
        setError("Failed to fetch data");
        setLoading(false); // Stop loading on error
      }
    };

    fetchItem(); // Call the fetch function
  }, [id, callingFrom, db]); // Re-run if `id` changes

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional: Add a light overlay
        }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    ); // Display loading state
  }

  if (!itemData) {
    return <p>No item found for the given ID.</p>; // Handle case where no item matches the `id`
  }

  const postedTime = itemData.createdAt?.toDate
    ? itemData.createdAt.toDate()
    : null;
  const timeAgo = postedTime
    ? formatDistanceToNow(postedTime, { addSuffix: true })
    : "Unknown time";

  const images = [
    itemData.img,
    itemData.img2,
    itemData.img3,
    itemData.img4,
    itemData.img5,
    itemData.img6,
  ].filter(
    (img) => img // Only include valid image URLs
  );
  const featuresData = [
    ["Ads", "Normal Condition", "Immobilizer Key", "Power Mirrors"],
    ["Ads", "Normal Condition", "Immobilizer Key", "Power Mirrors"],
    ["Ads", "Normal Condition", "Immobilizer Key", "Power Mirrors"],
  ];

  return (
    <>
      <div className="main-wrapper">
        <Header />

        {/* Banner Section */}
        <section className="banner-section">
          <div className="container">
            <div className="home-banner">
              <div className="home-banner-about">
                <div className="section-search aos r" data-aos="fade-up">
                  <p className="explore-text banner-text">
                    <span>Explore top-rated attractions</span>
                  </p>
                  <h1>
                    Let us help you <br />
                    <span>Find, Buy</span> & Own Dreams
                  </h1>
                  <p className="banner-para">
                    Countrys most loved and trusted classified ad listing
                    website classified ad.randomised words which don't look even
                    slightly Browse thousand of items near you.
                  </p>
                </div>

                <div className="bannerimages_wrapper">
                  <div className="wrapper_container">
                    <img src={image1} alt="" />
                    <img src={image2} alt="" />
                  </div>
                  <div className="wrapper_container">
                    <img src={image3} alt="" />
                    <img src={image4} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div
          className="container border border-primary h-auto containerWrapper"
          style={{ marginTop: "60px" }}
        >
          <div className="d-flex flex-wrap justify-content-between align-items-center">
            {/* Breadcrumb buttons */}
            <div className="adsCategory_head">
              <button
                className="btn border me-2 mb-2 mb-sm-0"
                style={{ background: "#E9EEFF", fontWeight: "500" }}
              >
                Home
              </button>
              <span>
                <img src={arrow} alt="" />
              </span>
              <button
                className="btn border me-2 mb-2 mb-sm-0"
                style={{ background: "#E9EEFF", fontWeight: "500" }}
              >
                Automotive
              </button>
              <span>
                <img src={arrow} alt="" />
              </span>
              <button
                className="btn border me-2 mb-2 mb-sm-0"
                style={{ background: "#E9EEFF", fontWeight: "500" }}
              >
                All Cities
              </button>{" "}
              <span>
                <img src={arrow} alt="" />
              </span>
              <button
                className="btn border mb-sm-0"
                style={{ background: "#E9EEFF", fontWeight: "500" }}
              >
                Used Car for Sale
              </button>
              <span>
                <img src={arrow} alt="" />
              </span>
              <button
                className="btn border mb-2 mb-sm-0"
                style={{ background: "#E9EEFF", fontWeight: "500" }}
              >
                Mercedez Benz
              </button>
            </div>

            {/* Pagination buttons */}
            <div className="adsCategoryInfoheade2 ">
              <button
                className="btn me-2 mb-2 mb-sm-0"
                style={{
                  color: "#2D4495",
                  background: "white",
                  border: "2px solid #2D4495",
                }}
              >
                <span>
                  <img src={left} alt="left" />
                </span>
                Previous
              </button>
              <button
                className="btn mb-2 mb-sm-0"
                style={{
                  color: "#2D4495",
                  background: "white",
                  border: "2px solid #2D4495",
                }}
              >
                <span>
                  <img src={right} alt="left" />
                </span>
                Next
              </button>
            </div>
          </div>
          <hr
            style={{
              color: "#000000",
              marginTop: "24.83px",
              marginBottom: "24.3px",
            }}
          />

          {/* More buttons */}
          <h1 className="fw-bold" style={{ marginBottom: "24px" }}>
            {itemData?.title || "Default Title"}{" "}
            {/* Dynamically display the title */}
          </h1>

          <div className="head2_wrapper">
            <div className="CategoryInfodiv_btn2container">
              <button className="head2btn">
                <span>
                  <img src={left} alt="leftarrow" />
                </span>{" "}
                Favourite
              </button>
              <button className="head2btn">
                <span>
                  <img src={share} alt="share" />
                </span>
                Share
              </button>
              <button className="head2btn">
                <span>
                  <img src={report} alt="promote" />
                </span>
                Promote
              </button>
              <button className="head2btn">
                <span>
                  <img src={report} alt="report" />
                </span>
                Report
              </button>
            </div>

            {/* Posted time */}
            <div className="d-flex flex-wrap justify-content-end">
              <p
                style={{
                  color: "black",
                  fontWeight: "400",
                  marginBottom: "24.5px",
                }}
              >
                Posted {itemData?.timeAgo || "Loading..."}
              </p>
            </div>
          </div>

          <div className="row border border-primary">
            {/*  */}
            {callingFrom === "AutomotiveComp" ? (
              <div className="col border border-primary container ">
                <div className="col border border-primary">
                  <div>
                    <img
                      src={itemData?.img || img || "default-image.jpg"} // Fallback for undefined values
                      className="w-md-24 h-auto"
                      alt={itemData?.title || "Default Item"} // Optional descriptive alt text
                      style={{
                        width: "100%",
                        height: "29rem",
                        marginTop: "1rem",
                        borderRadius: "0.3rem",
                      }}
                    />
                  </div>

                  <div className="multiplesimage-wrapper">
                    {images.map((img, index) => (
                      <div className="multiplesimage-wrapper-item" key={index}>
                        <img
                          src={img}
                          alt={`Car ${index + 1}`}
                          className="images"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="row border border-primary info_wrapper ">
                    <div className="col">
                      <div className="table-responsive info_table">
                        <table className="table table-borderless">
                          <tbody className="info_body">
                            <tr>
                              <th className="table_text">Seller Type:</th>
                              <td className="table_text">
                                {itemData?.sellerType || "Default Seller Type"}
                              </td>
                              <th className="table_text">Registered City:</th>
                              <td className="table_text">
                                {itemData?.registeredCity ||
                                  "Default Registered City"}
                              </td>
                            </tr>
                            <tr>
                              <th className="table_text">Assembly:</th>
                              <td className="table_text">
                                {itemData?.assembly || "Default Assembly"}
                              </td>
                              <th className="table_text">Engine Capacity:</th>
                              <td className="table_text">
                                {itemData?.engineCapacity ||
                                  "Default Engine Capacity"}
                              </td>
                            </tr>
                            <tr>
                              <th className="table_text">Body Type:</th>
                              <td className="table_text">
                                {itemData?.bodyType || "Default Body type"}
                              </td>
                              <th className="table_text">Last Updated:</th>
                              <td className="table_text">
                                {itemData?.lastUpdated ||
                                  "Default last updated"}
                              </td>
                            </tr>
                            <tr>
                              <th className="table_text">Condition:</th>
                              <td className="table_text">
                                {itemData?.condition || "Default Condition"}
                              </td>
                              <th className="table_text">Exterior Color:</th>
                              <td className="table_text">
                                {itemData?.exteriorColor ||
                                  "Default Exterior Color"}
                              </td>
                            </tr>
                            <tr>
                              <th className="table_text">Purpose:</th>
                              <td className="table_text">
                                {itemData?.purpose || "Default Purpose"}
                              </td>
                              <th className="table_text">Model:</th>
                              <td className="table_text">
                                {itemData?.model || "Default Model"}
                              </td>
                            </tr>
                            <tr>
                              <th className="table_text">Color:</th>
                              <td className="table_text">
                                {itemData?.color || "Default color"}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div>
                        <h1 className="mb-3" style={{ paddingLeft: "15px" }}>
                          Features
                        </h1>
                        <div className="row">
                          {featuresData.map((column, columnIndex) => (
                            <div className="col-md-4" key={columnIndex}>
                              {column.map((feature, index) => (
                                <p className="feature_para " key={index}>
                                  <span className="second_tableIcon">
                                    <img src={tick} alt="tick" />
                                  </span>
                                  {feature}
                                </p>
                              ))}
                            </div>
                          ))}
                        </div>

                        <div className="descriptions_wrapper">
                          <h1 className="fw-bold" style={{ padding: "20px" }}>
                            Description:
                          </h1>
                          <p className="descriptions_para">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Repellat nulla architecto molestias officiis,
                            quis incidunt fugiat fugit pariatur voluptatum
                            possimus modi repellendus dignissimos!
                          </p>
                          <p className="descriptions_para">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Tempora impedit ea deserunt, possimus totam
                            repellendus asperiores sequi? Debitis maxime optio
                            unde nemo explicabo?
                          </p>
                          <p className="descriptions_para">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Tempora impedit ea deserunt, possimus totam
                            repellendus asperiores sequi? Debitis maxime optio
                            unde nemo explicabo?
                          </p>
                          <p className="descriptions_para">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Tempora impedit ea deserunt, possimus totam
                            repellendus asperiores sequi? Debitis maxime optio
                            unde nemo explicabo?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : callingFrom === "ElectronicComp" ? (
              <div className="col border border-primary container ">
                <div className="col border border-primary">
                  <div>
                    <img
                      src={itemData?.img || img || "default-image.jpg"} // Fallback for undefined values
                      className="w-md-24 h-auto"
                      alt={itemData?.title || "Default Item"} // Optional descriptive alt text
                      style={{
                        width: "100%",
                        height: "29rem",
                        marginTop: "1rem",
                        borderRadius: "0.3rem",
                      }}
                    />
                  </div>

                  <div className="multiplesimage-wrapper">
                    {images.map((img, index) => (
                      <div className="multiplesimage-wrapper-item" key={index}>
                        <img
                          src={img}
                          alt={`Car ${index + 1}`}
                          className="images"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="row border border-primary info_wrapper ">
                    <div className="col">
                      <div className="table-responsive info_table">
                        <table className="table table-borderless">
                          <tbody className="info_body">
                            <tr>
                              <th className="table_text">Seller Type:</th>
                              <td className="table_text">
                                {itemData?.sellerType || "Default Seller Type"}
                              </td>
                              <th className="table_text">RAM:</th>
                              <td className="table_text">
                                {itemData?.RAM || "No RAM"}
                              </td>
                            </tr>
                            <tr>
                              <th className="table_text">Assembly:</th>
                              <td className="table_text">
                                {itemData?.Assembly || "Default Assembly"}
                              </td>
                              <th className="table_text">Graphics Card:</th>
                              <td className="table_text">
                                {itemData?.GraphicsCard || "No GraphicsCard"}
                              </td>
                            </tr>
                            <tr>
                              <th className="table_text">Body Type:</th>
                              <td className="table_text">
                                {itemData?.bodyType || "Default Body type"}
                              </td>
                              <th className="table_text">Last Updated:</th>
                              <td className="table_text">
                                {itemData?.lastUpdated ||
                                  "Default last updated"}
                              </td>
                            </tr>
                            <tr>
                              <th className="table_text">Brand:</th>
                              <td className="table_text">
                                {itemData?.Brand || "Default Condition"}
                              </td>
                              <th className="table_text">BatteryLife:</th>
                              <td className="table_text">
                                {itemData?.BatteryLife || "No BatteryLife"}
                              </td>
                            </tr>

                            <tr>
                              <th className="table_text">OperatingSystem:</th>
                              <td className="table_text">
                                {itemData?.OperatingSystem || "Default Purpose"}
                              </td>
                              <th className="table_text">Model:</th>
                              <td className="table_text">
                                {itemData?.model || "Default Model"}
                              </td>
                            </tr>
                            <tr>
                              <th className="table_text">Type:</th>
                              <td className="table_text">
                                {itemData?.type || "Default color"}
                              </td>
                            </tr>
                            <tr>
                              <th className="table_text">Screen Size:</th>
                              <td className="table_text">
                                {itemData?.ScreenSize || "No ScreenSize"}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div>
                        <h1 className="mb-3" style={{ paddingLeft: "15px" }}>
                          Features
                        </h1>
                        <div className="row">
                          {featuresData.map((column, columnIndex) => (
                            <div className="col-md-4" key={columnIndex}>
                              {column.map((feature, index) => (
                                <p className="feature_para " key={index}>
                                  <span className="second_tableIcon">
                                    <img src={tick} alt="tick" />
                                  </span>
                                  {feature}
                                </p>
                              ))}
                            </div>
                          ))}
                        </div>

                        <div className="descriptions_wrapper">
                          <h1 className="fw-bold" style={{ padding: "20px" }}>
                            Description:
                          </h1>
                          <p className="descriptions_para">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Repellat nulla architecto molestias officiis,
                            quis incidunt fugiat fugit pariatur voluptatum
                            possimus modi repellendus dignissimos!
                          </p>
                          <p className="descriptions_para">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Tempora impedit ea deserunt, possimus totam
                            repellendus asperiores sequi? Debitis maxime optio
                            unde nemo explicabo?
                          </p>
                          <p className="descriptions_para">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Tempora impedit ea deserunt, possimus totam
                            repellendus asperiores sequi? Debitis maxime optio
                            unde nemo explicabo?
                          </p>
                          <p className="descriptions_para">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Tempora impedit ea deserunt, possimus totam
                            repellendus asperiores sequi? Debitis maxime optio
                            unde nemo explicabo?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : callingFrom === "FashionStyle" ? (
              <div className="col border border-primary container ">
                <div className="col border border-primary">
                  <div>
                    <img
                      src={itemData?.img || img || "default-image.jpg"} // Fallback for undefined values
                      className="w-md-24 h-auto"
                      alt={itemData?.title || "Default Item"} // Optional descriptive alt text
                      style={{
                        width: "100%",
                        height: "29rem",
                        marginTop: "1rem",
                        borderRadius: "0.3rem",
                      }}
                    />
                  </div>

                  <div className="multiplesimage-wrapper">
                    {images.map((img, index) => (
                      <div className="multiplesimage-wrapper-item" key={index}>
                        <img
                          src={img}
                          alt={`Car ${index + 1}`}
                          className="images"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="row border border-primary info_wrapper ">
                    <div className="col">
                      <div className="table-responsive info_table">
                        <table className="table table-borderless">
                          <tbody className="info_body">
                            <tr>
                              <th className="table_text">Seller Type:</th>
                              <td className="table_text">
                                {itemData?.sellerType || "Default Seller Type"}
                              </td>
                              <th className="table_text">Gender:</th>
                              <td className="table_text">
                                {itemData?.Gender || "No Gender"}
                              </td>
                            </tr>
                            <tr>
                              <th className="table_text">Closure Type:</th>
                              <td className="table_text">
                                {itemData?.ClosureType || "No ClosureType"}
                              </td>
                              <th className="table_text">Material:</th>
                              <td className="table_text">
                                {itemData?.Material || "No Material"}
                              </td>
                            </tr>
                            <tr>
                              <th className="table_text">Collar Type:</th>
                              <td className="table_text">
                                {itemData?.CollarType || "Default CollarType "}
                              </td>
                              <th className="table_text">Last Updated:</th>
                              <td className="table_text">
                                {itemData?.lastUpdated ||
                                  "Default last updated"}
                              </td>
                            </tr>
                            <tr>
                              <th className="table_text">Brand:</th>
                              <td className="table_text">
                                {itemData?.Brand || "Default Condition"}
                              </td>
                              <th className="table_text">Season:</th>
                              <td className="table_text">
                                {itemData?.Season || "No Season"}
                              </td>
                            </tr>

                            <tr>
                              <th className="table_text">Color:</th>
                              <td className="table_text">
                                {itemData?.Color || "Default Color"}
                              </td>
                              <th className="table_text">WashType:</th>
                              <td className="table_text">
                                {itemData?.WashType || "Default WashType"}
                              </td>
                            </tr>
                            <tr>
                              <th className="table_text">Type:</th>
                              <td className="table_text">
                                {itemData?.type || "Default color"}
                              </td>
                              <th className="table_text">StyleDesign:</th>
                              <td className="table_text">
                                {itemData?.StyleDesign || "No StyleDesign"}
                              </td>
                            </tr>
                            <tr>
                              <th className="table_text">Fit:</th>
                              <td className="table_text">
                                {itemData?.Fit || "No Fit"}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div>
                        <h1 className="mb-3" style={{ paddingLeft: "15px" }}>
                          Features
                        </h1>
                        <div className="row">
                          {featuresData.map((column, columnIndex) => (
                            <div className="col-md-4" key={columnIndex}>
                              {column.map((feature, index) => (
                                <p className="feature_para " key={index}>
                                  <span className="second_tableIcon">
                                    <img src={tick} alt="tick" />
                                  </span>
                                  {feature}
                                </p>
                              ))}
                            </div>
                          ))}
                        </div>

                        <div className="descriptions_wrapper">
                          <h1 className="fw-bold" style={{ padding: "20px" }}>
                            Description:
                          </h1>
                          <p className="descriptions_para">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Repellat nulla architecto molestias officiis,
                            quis incidunt fugiat fugit pariatur voluptatum
                            possimus modi repellendus dignissimos!
                          </p>
                          <p className="descriptions_para">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Tempora impedit ea deserunt, possimus totam
                            repellendus asperiores sequi? Debitis maxime optio
                            unde nemo explicabo?
                          </p>
                          <p className="descriptions_para">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Tempora impedit ea deserunt, possimus totam
                            repellendus asperiores sequi? Debitis maxime optio
                            unde nemo explicabo?
                          </p>
                          <p className="descriptions_para">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Tempora impedit ea deserunt, possimus totam
                            repellendus asperiores sequi? Debitis maxime optio
                            unde nemo explicabo?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : callingFrom === "HealthCareComp" ? (
              <div className="col border border-primary container ">
                <div className="col border border-primary">
                  <div>
                    <img
                      src={itemData?.img || img || "default-image.jpg"} // Fallback for undefined values
                      className="w-md-24 h-auto"
                      alt={itemData?.title || "Default Item"} // Optional descriptive alt text
                      style={{
                        width: "100%",
                        height: "29rem",
                        marginTop: "1rem",
                        borderRadius: "0.3rem",
                      }}
                    />
                  </div>

                  <div className="multiplesimage-wrapper">
                    {images.map((img, index) => (
                      <div className="multiplesimage-wrapper-item" key={index}>
                        <img
                          src={img}
                          alt={`Car ${index + 1}`}
                          className="images"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="row border border-primary info_wrapper ">
                    <div className="col">
                      <div className="table-responsive info_table">
                        <table className="table table-borderless">
                          <tbody className="info_body">
                            <tr>
                              <th className="table_text">Accuracy:</th>
                              <td className="table_text">
                                {itemData?.Accuracy || "No Accuracy"}
                              </td>
                              <th className="table_text">Battery Type:</th>
                              <td className="table_text">
                                {itemData?.BatteryType || "No BatteryType"}
                              </td>
                            </tr>
                            <tr>
                              <th className="table_text">Compatibility :</th>

                              <td className="table_text">
                                {itemData?.Compatibility || "No Compatibility"}
                              </td>
                              <th className="table_text">CuffSize:</th>
                              <td className="table_text">
                                {itemData?.CuffSize || "No CuffSize"}
                              </td>
                            </tr>
                            <tr>
                              <th className="table_text">Display Type:</th>
                              <td className="table_text">
                                {itemData?.DisplayType ||
                                  "Default DisplayType "}
                              </td>
                              <th className="table_text">Last Updated:</th>
                              <td className="table_text">
                                {itemData?.lastUpdated ||
                                  "Default last updated"}
                              </td>
                            </tr>
                            <tr>
                              <th className="table_text">Features:</th>
                              <td className="table_text">
                                {itemData?.Features || "Default Features"}
                              </td>
                              <th className="table_text">Measurement Range:</th>
                              <td className="table_text">
                                {itemData?.MeasurementRange ||
                                  "No MeasurementRange"}
                              </td>
                            </tr>

                            <tr>
                              <th className="table_text">Measurement Units:</th>
                              <td className="table_text">
                                {itemData?.MeasurementUnits ||
                                  "Default MeasurementUnits"}
                              </td>
                              <th className="table_text">WashType:</th>
                              <td className="table_text">
                                {itemData?.WashType || "Default WashType"}
                              </td>
                            </tr>
                            <tr>
                              <th className="table_text">Type:</th>
                              <td className="table_text">
                                {itemData?.Type || "Default Type"}
                              </td>
                              <th className="table_text">Storage Capacity:</th>
                              <td className="table_text">
                                {itemData?.StorageCapacity ||
                                  "No StorageCapacity"}
                              </td>
                            </tr>
                            <tr>
                              <th className="table_text">Seller Type:</th>
                              <td className="table_text">
                                {itemData?.SellerType || "No SellerType"}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div>
                        <h1 className="mb-3" style={{ paddingLeft: "15px" }}>
                          Features
                        </h1>
                        <div className="row">
                          {featuresData.map((column, columnIndex) => (
                            <div className="col-md-4" key={columnIndex}>
                              {column.map((feature, index) => (
                                <p className="feature_para " key={index}>
                                  <span className="second_tableIcon">
                                    <img src={tick} alt="tick" />
                                  </span>
                                  {feature}
                                </p>
                              ))}
                            </div>
                          ))}
                        </div>

                        <div className="descriptions_wrapper">
                          <h1 className="fw-bold" style={{ padding: "20px" }}>
                            Description:
                          </h1>
                          <p className="descriptions_para">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Repellat nulla architecto molestias officiis,
                            quis incidunt fugiat fugit pariatur voluptatum
                            possimus modi repellendus dignissimos!
                          </p>
                          <p className="descriptions_para">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Tempora impedit ea deserunt, possimus totam
                            repellendus asperiores sequi? Debitis maxime optio
                            unde nemo explicabo?
                          </p>
                          <p className="descriptions_para">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Tempora impedit ea deserunt, possimus totam
                            repellendus asperiores sequi? Debitis maxime optio
                            unde nemo explicabo?
                          </p>
                          <p className="descriptions_para">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Tempora impedit ea deserunt, possimus totam
                            repellendus asperiores sequi? Debitis maxime optio
                            unde nemo explicabo?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : callingFrom === "JobBoard" ? (
              <div className="col border border-primary container ">
                <div className="col border border-primary">
                  <div>
                    <img
                      src={itemData?.img || img || "default-image.jpg"} // Fallback for undefined values
                      className="w-md-24 h-auto"
                      alt={itemData?.title || "Default Item"} // Optional descriptive alt text
                      style={{
                        width: "100%",
                        height: "29rem",
                        marginTop: "1rem",
                        borderRadius: "0.3rem",
                      }}
                    />
                  </div>

                  <div className="multiplesimage-wrapper">
                    {images.map((img, index) => (
                      <div className="multiplesimage-wrapper-item" key={index}>
                        <img
                          src={img}
                          alt={`Car ${index + 1}`}
                          className="images"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="row border border-primary info_wrapper ">
                    <div className="col">
                      <div className="table-responsive info_table">
                        <table className="table table-borderless">
                          <tbody className="info_body">
                            <tr>
                              <th className="table_text">City:</th>
                              <td className="table_text">
                                {itemData?.City || "Default Seller Type"}
                              </td>
                              <th className="table_text">Company:</th>
                              <td className="table_text">
                                {itemData?.Company || "No Company"}
                              </td>
                            </tr>
                            <tr>
                              <th className="table_text">Employment Type :</th>
                              <td className="table_text">
                                {itemData?.EmploymentType ||
                                  "No EmploymentType"}
                              </td>
                              <th className="table_text">Experience Level:</th>
                              <td className="table_text">
                                {itemData?.ExperienceLevel ||
                                  "No ExperienceLevel"}
                              </td>
                            </tr>
                            <tr>
                              <th className="table_text">Industry :</th>
                              <td className="table_text">
                                {itemData?.Industry || "Default Industry "}
                              </td>
                              <th className="table_text">Last Updated:</th>
                              <td className="table_text">
                                {itemData?.lastUpdated ||
                                  "Default last updated"}
                              </td>
                            </tr>
                            <tr>
                              <th className="table_text">Job Title:</th>
                              <td className="table_text">
                                {itemData?.JobTitle || "Default JobTitle"}
                              </td>
                              <th className="table_text">Salary Range :</th>
                              <td className="table_text">
                                {itemData?.SalaryRange || "No SalaryRange"}
                              </td>
                            </tr>

                            <tr>
                              <th className="table_text">Sallary From:</th>
                              <td className="table_text">
                                {itemData?.SallaryFromRange ||
                                  "Default SallaryFromRange"}
                              </td>
                              <th className="table_text">Sallary To:</th>
                              <td className="table_text">
                                {itemData?.SallaryToRange ||
                                  "Default SallaryToRange"}
                              </td>
                            </tr>
                            <tr>
                              <th className="table_text">Location:</th>
                              <td className="table_text">
                                {itemData?.location || "Default location"}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div>
                        <h1 className="mb-3" style={{ paddingLeft: "15px" }}>
                          Features
                        </h1>
                        <div className="row">
                          {featuresData.map((column, columnIndex) => (
                            <div className="col-md-4" key={columnIndex}>
                              {column.map((feature, index) => (
                                <p className="feature_para " key={index}>
                                  <span className="second_tableIcon">
                                    <img src={tick} alt="tick" />
                                  </span>
                                  {feature}
                                </p>
                              ))}
                            </div>
                          ))}
                        </div>

                        <div className="descriptions_wrapper">
                          <h1 className="fw-bold" style={{ padding: "20px" }}>
                            Description:
                          </h1>
                          <p className="descriptions_para">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Repellat nulla architecto molestias officiis,
                            quis incidunt fugiat fugit pariatur voluptatum
                            possimus modi repellendus dignissimos!
                          </p>
                          <p className="descriptions_para">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Tempora impedit ea deserunt, possimus totam
                            repellendus asperiores sequi? Debitis maxime optio
                            unde nemo explicabo?
                          </p>
                          <p className="descriptions_para">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Tempora impedit ea deserunt, possimus totam
                            repellendus asperiores sequi? Debitis maxime optio
                            unde nemo explicabo?
                          </p>
                          <p className="descriptions_para">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Tempora impedit ea deserunt, possimus totam
                            repellendus asperiores sequi? Debitis maxime optio
                            unde nemo explicabo?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : callingFrom === "EducationCmp" ? (
              <div className="col border border-primary container ">
                <div className="col border border-primary">
                  <div>
                    <img
                      src={itemData?.img || img || "default-image.jpg"} // Fallback for undefined values
                      className="w-md-24 h-auto"
                      alt={itemData?.title || "Default Item"} // Optional descriptive alt text
                      style={{
                        width: "100%",
                        height: "29rem",
                        marginTop: "1rem",
                        borderRadius: "0.3rem",
                      }}
                    />
                  </div>

                  <div className="multiplesimage-wrapper">
                    {images.map((img, index) => (
                      <div className="multiplesimage-wrapper-item" key={index}>
                        <img
                          src={img}
                          alt={`Car ${index + 1}`}
                          className="images"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="row border border-primary info_wrapper ">
                    <div className="col">
                      <div className="table-responsive info_table">
                        <table className="table table-borderless">
                          <tbody className="info_body">
                            <tr>
                              <th className="table_text">City:</th>
                              <td className="table_text">
                                {itemData?.City || "Default Seller Type"}
                              </td>
                              <th className="table_text">Content Type:</th>
                              <td className="table_text">
                                {itemData?.ContentType || "No ContentType"}
                              </td>
                            </tr>
                            <tr>
                              <th className="table_text">Duration :</th>
                              <td className="table_text">
                                {itemData?.Duration || "No Duration"}
                              </td>
                              <th className="table_text">Language :</th>
                              <td className="table_text">
                                {itemData?.Language || "No Language"}
                              </td>
                            </tr>
                            <tr>
                              <th className="table_text">Skill Level :</th>
                              <td className="table_text">
                                {itemData?.SkillLevel || "Default SkillLevel "}
                              </td>
                              <th className="table_text">Last Updated:</th>
                              <td className="table_text">
                                {itemData?.lastUpdated ||
                                  "Default last updated"}
                              </td>
                            </tr>
                            <tr>
                              <th className="table_text">States :</th>
                              <td className="table_text">
                                {itemData?.States || "Default States"}
                              </td>
                              <th className="table_text">
                                Subject Categories :
                              </th>
                              <td className="table_text">
                                {itemData?.SubjectCategories ||
                                  "No SubjectCategories"}
                              </td>
                            </tr>

                            <tr>
                              <th className="table_text">Assembly :</th>
                              <td className="table_text">
                                {itemData?.assembly || "Default assembly"}
                              </td>
                              <th className="table_text">Condition :</th>
                              <td className="table_text">
                                {itemData?.condition || "Default condition"}
                              </td>
                            </tr>
                            <tr>
                              <th className="table_text">Purpose:</th>
                              <td className="table_text">
                                {itemData?.purpose || "Default purpose"}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div>
                        <h1 className="mb-3" style={{ paddingLeft: "15px" }}>
                          Features
                        </h1>
                        <div className="row">
                          {featuresData.map((column, columnIndex) => (
                            <div className="col-md-4" key={columnIndex}>
                              {column.map((feature, index) => (
                                <p className="feature_para " key={index}>
                                  <span className="second_tableIcon">
                                    <img src={tick} alt="tick" />
                                  </span>
                                  {feature}
                                </p>
                              ))}
                            </div>
                          ))}
                        </div>

                        <div className="descriptions_wrapper">
                          <h1 className="fw-bold" style={{ padding: "20px" }}>
                            Description:
                          </h1>
                          <p className="descriptions_para">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Repellat nulla architecto molestias officiis,
                            quis incidunt fugiat fugit pariatur voluptatum
                            possimus modi repellendus dignissimos!
                          </p>
                          <p className="descriptions_para">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Tempora impedit ea deserunt, possimus totam
                            repellendus asperiores sequi? Debitis maxime optio
                            unde nemo explicabo?
                          </p>
                          <p className="descriptions_para">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Tempora impedit ea deserunt, possimus totam
                            repellendus asperiores sequi? Debitis maxime optio
                            unde nemo explicabo?
                          </p>
                          <p className="descriptions_para">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Tempora impedit ea deserunt, possimus totam
                            repellendus asperiores sequi? Debitis maxime optio
                            unde nemo explicabo?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : callingFrom === "RealEstateComp" ? (
              <div className="col border border-primary container ">
                <div className="col border border-primary">
                  <div>
                    <img
                      src={itemData?.img || img || "default-image.jpg"} // Fallback for undefined values
                      className="w-md-24 h-auto"
                      alt={itemData?.title || "Default Item"} // Optional descriptive alt text
                      style={{
                        width: "100%",
                        height: "29rem",
                        marginTop: "1rem",
                        borderRadius: "0.3rem",
                      }}
                    />
                  </div>

                  <div className="multiplesimage-wrapper">
                    {images.map((img, index) => (
                      <div className="multiplesimage-wrapper-item" key={index}>
                        <img
                          src={img}
                          alt={`Car ${index + 1}`}
                          className="images"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="row border border-primary info_wrapper ">
                    <div className="col">
                      <div className="table-responsive info_table">
                        <table className="table table-borderless">
                          <tbody className="info_body">
                            <tr>
                              <th className="table_text">Accessibility:</th>
                              <td className="table_text">
                                {itemData?.Accessibility ||
                                  "Default Accessibility "}
                              </td>
                              <th className="table_text">Amenities :</th>
                              <td className="table_text">
                                {itemData?.Amenities || "No Amenities"}
                              </td>
                            </tr>
                            <tr>
                              <th className="table_text">Building Type :</th>
                              <td className="table_text">
                                {itemData?.BuildingType || "No BuildingType"}
                              </td>
                              <th className="table_text">City :</th>
                              <td className="table_text">
                                {itemData?.City || "No City"}
                              </td>
                            </tr>
                            <tr>
                              <th className="table_text">
                                Property Features :
                              </th>
                              <td className="table_text">
                                {itemData?.PropertyFeatures ||
                                  "Default PropertyFeatures "}
                              </td>
                              <th className="table_text">Last Updated:</th>
                              <td className="table_text">
                                {itemData?.lastUpdated ||
                                  "Default last updated"}
                              </td>
                            </tr>
                            <tr>
                              <th className="table_text">Property Type :</th>
                              <td className="table_text">
                                {itemData?.PropertyType ||
                                  "Default PropertyType"}
                              </td>
                              <th className="table_text">Seller Type :</th>
                              <td className="table_text">
                                {itemData?.SellerType || "No SellerType"}
                              </td>
                            </tr>

                            <tr>
                              <th className="table_text">Size :</th>
                              <td className="table_text">
                                {itemData?.Size || "Default Size"}
                              </td>
                              <th className="table_text">States :</th>
                              <td className="table_text">
                                {itemData?.States || "Default States"}
                              </td>
                            </tr>
                            <tr>
                              <th className="table_text">Location:</th>
                              <td className="table_text">
                                {itemData?.location || "Default location"}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div>
                        <h1 className="mb-3" style={{ paddingLeft: "15px" }}>
                          Features
                        </h1>
                        <div className="row">
                          {featuresData.map((column, columnIndex) => (
                            <div className="col-md-4" key={columnIndex}>
                              {column.map((feature, index) => (
                                <p className="feature_para " key={index}>
                                  <span className="second_tableIcon">
                                    <img src={tick} alt="tick" />
                                  </span>
                                  {feature}
                                </p>
                              ))}
                            </div>
                          ))}
                        </div>

                        <div className="descriptions_wrapper">
                          <h1 className="fw-bold" style={{ padding: "20px" }}>
                            Description:
                          </h1>
                          <p className="descriptions_para">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Repellat nulla architecto molestias officiis,
                            quis incidunt fugiat fugit pariatur voluptatum
                            possimus modi repellendus dignissimos!
                          </p>
                          <p className="descriptions_para">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Tempora impedit ea deserunt, possimus totam
                            repellendus asperiores sequi? Debitis maxime optio
                            unde nemo explicabo?
                          </p>
                          <p className="descriptions_para">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Tempora impedit ea deserunt, possimus totam
                            repellendus asperiores sequi? Debitis maxime optio
                            unde nemo explicabo?
                          </p>
                          <p className="descriptions_para">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Tempora impedit ea deserunt, possimus totam
                            repellendus asperiores sequi? Debitis maxime optio
                            unde nemo explicabo?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : callingFrom === "TravelComp" ? (
              <div className="col border border-primary container ">
                <div className="col border border-primary">
                  <div>
                    <img
                      src={itemData?.img || img || "default-image.jpg"} // Fallback for undefined values
                      className="w-md-24 h-auto"
                      alt={itemData?.title || "Default Item"} // Optional descriptive alt text
                      style={{
                        width: "100%",
                        height: "29rem",
                        marginTop: "1rem",
                        borderRadius: "0.3rem",
                      }}
                    />
                  </div>

                  <div className="multiplesimage-wrapper">
                    {images.map((img, index) => (
                      <div className="multiplesimage-wrapper-item" key={index}>
                        <img
                          src={img}
                          alt={`Car ${index + 1}`}
                          className="images"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="row border border-primary info_wrapper ">
                    <div className="col">
                      <div className="table-responsive info_table">
                        <table className="table table-borderless">
                          <tbody className="info_body">
                            <tr>
                              <th className="table_text">Amenities:</th>
                              <td className="table_text">
                                {itemData?.Amenities || "Default Amenities "}
                              </td>
                              <th className="table_text">Checkin :</th>
                              <td className="table_text">
                                {itemData?.Checkin || "No Checkin"}
                              </td>
                            </tr>
                            <tr>
                              <th className="table_text">City :</th>
                              <td className="table_text">
                                {itemData?.City || "No City"}
                              </td>
                              <th className="table_text">PropertyType :</th>
                              <td className="table_text">
                                {itemData?.PropertyType || "No PropertyType"}
                              </td>
                            </tr>
                            <tr>
                              <th className="table_text">Room Type :</th>
                              <td className="table_text">
                                {itemData?.RoomType || "Default RoomType "}
                              </td>
                              <th className="table_text">Last Updated:</th>
                              <td className="table_text">
                                {itemData?.lastUpdated ||
                                  "Default last updated"}
                              </td>
                            </tr>
                            {/* <tr>
                              <th className="table_text">Property Type :</th>
                              <td className="table_text">
                                {itemData?.PropertyType ||
                                  "Default PropertyType"}
                              </td>
                              <th className="table_text">Seller Type :</th>
                              <td className="table_text">
                                {itemData?.SellerType || "No SellerType"}
                              </td>
                            </tr>

                            <tr>
                              <th className="table_text">Size :</th>
                              <td className="table_text">
                                {itemData?.Size || "Default Size"}
                              </td>
                              <th className="table_text">States :</th>
                              <td className="table_text">
                                {itemData?.States || "Default States"}
                              </td>
                            </tr>
                            <tr>
                              <th className="table_text">Location:</th>
                              <td className="table_text">
                                {itemData?.location || "Default location"}
                              </td>
                            </tr> */}
                          </tbody>
                        </table>
                      </div>

                      <div>
                        <h1 className="mb-3" style={{ paddingLeft: "15px" }}>
                          Features
                        </h1>
                        <div className="row">
                          {featuresData.map((column, columnIndex) => (
                            <div className="col-md-4" key={columnIndex}>
                              {column.map((feature, index) => (
                                <p className="feature_para " key={index}>
                                  <span className="second_tableIcon">
                                    <img src={tick} alt="tick" />
                                  </span>
                                  {feature}
                                </p>
                              ))}
                            </div>
                          ))}
                        </div>

                        <div className="descriptions_wrapper">
                          <h1 className="fw-bold" style={{ padding: "20px" }}>
                            Description:
                          </h1>
                          <p className="descriptions_para">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Repellat nulla architecto molestias officiis,
                            quis incidunt fugiat fugit pariatur voluptatum
                            possimus modi repellendus dignissimos!
                          </p>
                          <p className="descriptions_para">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Tempora impedit ea deserunt, possimus totam
                            repellendus asperiores sequi? Debitis maxime optio
                            unde nemo explicabo?
                          </p>
                          <p className="descriptions_para">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Tempora impedit ea deserunt, possimus totam
                            repellendus asperiores sequi? Debitis maxime optio
                            unde nemo explicabo?
                          </p>
                          <p className="descriptions_para">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Tempora impedit ea deserunt, possimus totam
                            repellendus asperiores sequi? Debitis maxime optio
                            unde nemo explicabo?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : callingFrom === "SportGamesComp" ? (
              <div className="col border border-primary container ">
                <div className="col border border-primary">
                  <div>
                    <img
                      src={itemData?.img || img || "default-image.jpg"} // Fallback for undefined values
                      className="w-md-24 h-auto"
                      alt={itemData?.title || "Default Item"} // Optional descriptive alt text
                      style={{
                        width: "100%",
                        height: "29rem",
                        marginTop: "1rem",
                        borderRadius: "0.3rem",
                      }}
                    />
                  </div>

                  <div className="multiplesimage-wrapper">
                    {images.map((img, index) => (
                      <div className="multiplesimage-wrapper-item" key={index}>
                        <img
                          src={img}
                          alt={`Car ${index + 1}`}
                          className="images"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="row border border-primary info_wrapper ">
                    <div className="col">
                      <div className="table-responsive info_table">
                        <table className="table table-borderless">
                          <tbody className="info_body">
                            <tr>
                              <th className="table_text">Availability:</th>
                              <td className="table_text">
                                {itemData?.Availability ||
                                  "Default Availability "}
                              </td>
                              <th className="table_text">Brand :</th>
                              <td className="table_text">
                                {itemData?.Brand || "No Brand"}
                              </td>
                            </tr>
                            <tr>
                              <th className="table_text">Category :</th>
                              <td className="table_text">
                                {itemData?.Category || "No Category"}
                              </td>
                              <th className="table_text">City :</th>
                              <td className="table_text">
                                {itemData?.City || "No City"}
                              </td>
                            </tr>
                            <tr>
                              <th className="table_text">Color Options :</th>
                              <td className="table_text">
                                {itemData?.ColorOptions ||
                                  "Default ColorOptions "}
                              </td>
                              <th className="table_text">Last Updated:</th>
                              <td className="table_text">
                                {itemData?.lastUpdated ||
                                  "Default last updated"}
                              </td>
                            </tr>
                            <tr>
                              <th className="table_text">Features :</th>
                              <td className="table_text">
                                {itemData?.Features || "Default Features"}
                              </td>
                              <th className="table_text">Gender :</th>
                              <td className="table_text">
                                {itemData?.Gender || "No Gender"}
                              </td>
                            </tr>

                            <tr>
                              <th className="table_text">Material :</th>
                              <td className="table_text">
                                {itemData?.Material || "Default Material"}
                              </td>
                              <th className="table_text">Seller Type :</th>
                              <td className="table_text">
                                {itemData?.SellerType || "Default SellerType"}
                              </td>
                            </tr>
                            <tr>
                              <th className="table_text">Size:</th>
                              <td className="table_text">
                                {itemData?.Size || "Default Size"}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div>
                        <h1 className="mb-3" style={{ paddingLeft: "15px" }}>
                          Features
                        </h1>
                        <div className="row">
                          {featuresData.map((column, columnIndex) => (
                            <div className="col-md-4" key={columnIndex}>
                              {column.map((feature, index) => (
                                <p className="feature_para " key={index}>
                                  <span className="second_tableIcon">
                                    <img src={tick} alt="tick" />
                                  </span>
                                  {feature}
                                </p>
                              ))}
                            </div>
                          ))}
                        </div>

                        <div className="descriptions_wrapper">
                          <h1 className="fw-bold" style={{ padding: "20px" }}>
                            Description:
                          </h1>
                          <p className="descriptions_para">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Repellat nulla architecto molestias officiis,
                            quis incidunt fugiat fugit pariatur voluptatum
                            possimus modi repellendus dignissimos!
                          </p>
                          <p className="descriptions_para">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Tempora impedit ea deserunt, possimus totam
                            repellendus asperiores sequi? Debitis maxime optio
                            unde nemo explicabo?
                          </p>
                          <p className="descriptions_para">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Tempora impedit ea deserunt, possimus totam
                            repellendus asperiores sequi? Debitis maxime optio
                            unde nemo explicabo?
                          </p>
                          <p className="descriptions_para">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Tempora impedit ea deserunt, possimus totam
                            repellendus asperiores sequi? Debitis maxime optio
                            unde nemo explicabo?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : callingFrom === "PetAnimalsComp" ? (
              <div className="col border border-primary container ">
                <div className="col border border-primary">
                  <div>
                    <img
                      src={itemData?.img || img || "default-image.jpg"} // Fallback for undefined values
                      className="w-md-24 h-auto"
                      alt={itemData?.title || "Default Item"} // Optional descriptive alt text
                      style={{
                        width: "100%",
                        height: "29rem",
                        marginTop: "1rem",
                        borderRadius: "0.3rem",
                      }}
                    />
                  </div>

                  <div className="multiplesimage-wrapper">
                    {images.map((img, index) => (
                      <div className="multiplesimage-wrapper-item" key={index}>
                        <img
                          src={img}
                          alt={`Car ${index + 1}`}
                          className="images"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="row border border-primary info_wrapper ">
                    <div className="col">
                      <div className="table-responsive info_table">
                        <table className="table table-borderless">
                          <tbody className="info_body">
                            <tr>
                              <th className="table_text">Age:</th>
                              <td className="table_text">
                                {itemData?.Age || "Default Age "}
                              </td>
                              <th className="table_text">Breed :</th>
                              <td className="table_text">
                                {itemData?.Breed || "No Breed"}
                              </td>
                            </tr>
                            <tr>
                              <th className="table_text">City :</th>
                              <td className="table_text">
                                {itemData?.City || "No City"}
                              </td>
                              <th className="table_text">Color :</th>
                              <td className="table_text">
                                {itemData?.Color || "No Color"}
                              </td>
                            </tr>
                            <tr>
                              <th className="table_text">
                                Dietary Preferences :
                              </th>
                              <td className="table_text">
                                {itemData?.DietaryPreferences ||
                                  "Default DietaryPreferences "}
                              </td>
                              <th className="table_text">Last Updated:</th>
                              <td className="table_text">
                                {itemData?.lastUpdated ||
                                  "Default last updated"}
                              </td>
                            </tr>
                            <tr>
                              <th className="table_text">Gender :</th>
                              <td className="table_text">
                                {itemData?.Gender || "Default Gender"}
                              </td>
                              <th className="table_text">Health Status :</th>
                              <td className="table_text">
                                {itemData?.HealthStatus || "No HealthStatus"}
                              </td>
                            </tr>

                            <tr>
                              <th className="table_text">Seller Type :</th>
                              <td className="table_text">
                                {itemData?.SellerType || "Default SellerType"}
                              </td>
                              <th className="table_text">Size :</th>
                              <td className="table_text">
                                {itemData?.Size || "Default Size"}
                              </td>
                            </tr>
                            <tr>
                              <th className="table_text">Temperament:</th>
                              <td className="table_text">
                                {itemData?.Temperament || "Default Temperament"}
                              </td>
                              <th className="table_text">Training Level:</th>
                              <td className="table_text">
                                {itemData?.TrainingLevel ||
                                  "Default TrainingLevel"}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div>
                        <h1 className="mb-3" style={{ paddingLeft: "15px" }}>
                          Features
                        </h1>
                        <div className="row">
                          {featuresData.map((column, columnIndex) => (
                            <div className="col-md-4" key={columnIndex}>
                              {column.map((feature, index) => (
                                <p className="feature_para " key={index}>
                                  <span className="second_tableIcon">
                                    <img src={tick} alt="tick" />
                                  </span>
                                  {feature}
                                </p>
                              ))}
                            </div>
                          ))}
                        </div>

                        <div className="descriptions_wrapper">
                          <h1 className="fw-bold" style={{ padding: "20px" }}>
                            Description:
                          </h1>
                          <p className="descriptions_para">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Repellat nulla architecto molestias officiis,
                            quis incidunt fugiat fugit pariatur voluptatum
                            possimus modi repellendus dignissimos!
                          </p>
                          <p className="descriptions_para">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Tempora impedit ea deserunt, possimus totam
                            repellendus asperiores sequi? Debitis maxime optio
                            unde nemo explicabo?
                          </p>
                          <p className="descriptions_para">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Tempora impedit ea deserunt, possimus totam
                            repellendus asperiores sequi? Debitis maxime optio
                            unde nemo explicabo?
                          </p>
                          <p className="descriptions_para">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Tempora impedit ea deserunt, possimus totam
                            repellendus asperiores sequi? Debitis maxime optio
                            unde nemo explicabo?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            <div className="col-md-2 border border-primary leftCard responsive_card">
              <div className="profileInfo_div">
                <h1 className="infodev_price">
                  {itemData?.price
                    ? `$${itemData.price}`
                    : "Price not available"}
                </h1>

                <div className="profile_div1">
                  <h5>Safety Tips</h5>
                  <ul
                    style={{
                      listStyleImage: `url(${bullet})`,
                      marginLeft: "1.3rem",
                    }}
                  >
                    <li className="safteytip_para">
                      Meet seller at a safe place.
                    </li>
                    <li className="safteytip_para">
                      Check item before you buy
                    </li>
                    <li className="safteytip_para">
                      Pay only after collecting item.
                    </li>
                  </ul>
                </div>
                <hr className="fw-bold" />
                <div className="col-md profile_div2">
                  <h1 className="sallerinfo_para">Seller Information</h1>
                  <div className="row profileinner_container ">
                    <div className="col-5 profileimg ">
                      <img
                        src={profile}
                        alt="Profile"
                        className="img-fluid rounded-circle"
                      />
                    </div>
                    <div className="col-5 profile_rightbarTags">
                      <p className="sallerInfo_para">Philp Martin</p>
                      <p className="sallerInfo_para">Member Since</p>
                      <p className="s allerInfo_para">View all Ads</p>
                    </div>

                    <div className="col mt-3 innerContainer2">
                      <button
                        className="hovering"
                        style={{
                          color: "rgb(45, 68, 149)",
                          border: "2px solid rgb(45, 68, 149)",
                          background: "white",
                          borderRadius: "12px",
                          width: "135px",
                          height: "45px",
                          marginRight: "22px",
                        }}
                      >
                        <span>
                          <FaMobile />
                        </span>{" "}
                        phone
                      </button>

                      <button
                        className="hovering"
                        style={{
                          color: "rgb(45, 68, 149)",
                          border: "2px solid rgb(45, 68, 149)",
                          background: "white",
                          borderRadius: "12px",
                          width: "135px",
                          height: "45px",
                        }}
                      >
                        <span>
                          <FontAwesomeIcon icon={faPhone} />
                        </span>
                        Call
                      </button>

                      <div style={{ cursor: "pointer" }}>
                        <a
                          href={`https://wa.me/${itemData.whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <button className="whatsapp-button">
                            <span>
                              <FaWhatsapp />
                            </span>
                            WhatsApp
                          </button>
                        </a>
                      </div>

                      <h5 className="mt-4 mb-4">Location </h5>

                      <button className="location_btn ">
                        {itemData.location}{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-1 border border-primary w-100 ads_features_wrapper ">
              <div className="col border border-primary ">
                <img
                  className="img-fluid_ads mt-3 "
                  style={{ borderRadius: "0.3rem" }}
                  src={ads}
                  alt=""
                />
                <img
                  className="img-fluid_ads mt-3"
                  style={{ borderRadius: "0.3rem" }}
                  src={ads}
                  alt=""
                />
              </div>
              <div>
                <h5 className="morefeatures_para">More Features</h5>
                <p className="morefeatures_para">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Itaque ipsam aperiam vero officia praesentium facilis.
                </p>

                <div className="row">
                  <button
                    className="hovering"
                    style={{
                      color: "white",
                      border: "2px solid rgb(45, 68, 149)",
                      background: "#2D4495",
                      borderRadius: "0.7rem",
                      width: "7rem",
                      height: "2rem",
                      margin: "1.3rem",
                    }}
                  >
                    Loresm
                  </button>

                  <button
                    className="hovering"
                    style={{
                      color: "white",
                      border: "2px solid rgb(45, 68, 149)",
                      background: "#2D4495",
                      borderRadius: "0.7rem",
                      width: "7rem",
                      height: "2rem",
                      margin: "1.3rem",
                    }}
                  >
                    Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Dynamic_Route;
