import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import UpperHeader from "../upperHeader/Upper_Header";
import HeaderLower from "../HeaderlowerNav/HeaderLower";
import { LogoSvg } from "../../imagepath";
import { useNavigate } from "react-router-dom";

const Header = ({ parms }) => {
  const [menu, setMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const onHandleMobileMenu = (e) => {
    // Prevent click event from propagating when clicking the button itself
    e.stopPropagation();
    var root = document.getElementsByTagName("html")[0];
    root.classList.add("menu-opened");
    setMenu(true); // Open the menu when the button is clicked
  };

  const onhandleCloseMenu = (e) => {
    // Prevent click event from propagating when clicking the close button itself
    e.stopPropagation();
    var root = document.getElementsByTagName("html")[0];
    root.classList.remove("menu-opened");
    setMenu(false); // Close the menu when the close button is clicked
  };

  const toggleMobileMenu = (e) => {
    // Prevent click event from propagating when clicking inside the menu
    e.stopPropagation();
    setMenu(!menu); // Toggle menu visibility
  };

  // Close the menu when clicking outside of it
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenu(false);
    }
  };

  // Add event listener for click outside on component mount, and clean up on unmount
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <UpperHeader />

      <div className="containerWrapper">
        <div className="container">
          <nav className="navbar navbar-expand-lg header-nav">
            <div className="navbar-header">
              <Link
                id="mobile_btn"
                to="#"
                onClick={onHandleMobileMenu} // Open menu on button click
              >
                <span className="bar-icon">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </Link>
              <Link to="/" className="navbar-brand logo">
                <img src={LogoSvg} className="img-fluid" alt="Logo" />
              </Link>
            </div>
            <div
              className={`main-menu-wrapper ${menu ? "opened" : ""}`}
              ref={menuRef} // Attach the reference here
            >
              <div className="menu-header">
                <Link to="/" className="menu-logo">
                  <img src={LogoSvg} className="img-fluid" alt="Logo" />
                </Link>
                <Link
                  id="menu_close"
                  className="menu-close"
                  to="#"
                  onClick={onhandleCloseMenu} // Close menu on button click
                >
                  <i className="fas fa-times"></i>
                </Link>
              </div>
              <ul className="main-nav">
                <li>
                  <div className="search_container">
                    <input
                      type="text"
                      placeholder="What are you looking for"
                      className="search_nav"
                    />
                    <div className="searchlogo_container">
                      <FaSearch className="searchlogo_nav" />
                    </div>
                  </div>
                </li>
                <li className="login-link">
                  <Link to="/signup">Sign Up</Link>
                </li>
                <li className="login-link">
                  <Link to="/login">Sign In</Link>
                </li>

                {/* side bar  */}
                <li>
                  <Link to={"/AutomotiveComp"}>Automative</Link>
                </li>
                <li>
                  <Link to="/ElectronicComp">Electronic</Link>
                </li>
                <li>
                  <Link to={"/FashionStyle"}>Fashion Style</Link>
                </li>
                <li>
                  <Link to="/HealthCareComp">Health Care</Link>
                </li>
                <li>
                  <Link to="/JobBoard">Job Board</Link>
                </li>
                <li>
                  <Link to="/RealEstateComp">Real Esate</Link>
                </li>
                <li>
                  <Link to="/TravelComp">Travel</Link>
                </li>
                <li>
                  <Link to="/SportGamesComp">Sport & Games</Link>
                </li>
                <li>
                  <Link to="/PetAnimalsComp">Pet & AnimalsComp</Link>
                </li>
              </ul>
            </div>
            <ul className="nav header-navbar-rht">
              <li className="nav-item">
                <Link className="nav-link header-reg" to="/signup">
                  Sign Up
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link header-login" to="/login">
                  Sign In
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link header-login add-listing"
                  to="/add-listing"
                >
                  <i className="fa-solid fa-plus"></i> Add Listing
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <HeaderLower />
    </header>
  );
};

export default Header;
