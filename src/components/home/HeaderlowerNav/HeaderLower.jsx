import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const HeaderLower = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Function to update the `isMobile` state based on window width
  const updateIsMobile = () => {
    setIsMobile(window.innerWidth <= 767);
  };

  useEffect(() => {
    // Set the initial value
    updateIsMobile();

    // Add event listener for window resize
    window.addEventListener("resize", updateIsMobile);

    // Clean up the event listener
    return () => {
      window.removeEventListener("resize", updateIsMobile);
    };
  }, []);

  if (isMobile) {
    return null; // Don't render the component on mobile
  }

  return (
    <div className="header-lower container">
      <nav className="nav-links" style={{ fontFamily: "VIP Rawy Regular" }}>
        <NavLink
          to="/AutomotiveComp"
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
        >
          Automotive
        </NavLink>
        <NavLink
          to="/ElectronicComp"
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
        >
          Electronics
        </NavLink>
        <NavLink
          to="/FashionStyle"
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
        >
          Fashion Style
        </NavLink>
        <NavLink
          to="/HealthCareComp"
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
        >
          Health Care
        </NavLink>
        <NavLink
          to="/JobBoard"
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
        >
          Job Board
        </NavLink>
        <NavLink
          to="/Education"
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
        >
          Education
        </NavLink>
        <NavLink
          to="/RealEstateComp"
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
        >
          Real Estate
        </NavLink>
        <NavLink
          to="/TravelComp"
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
        >
          Travel
        </NavLink>
        <NavLink
          to="/SportGamesComp"
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
        >
          Sport & Games
        </NavLink>
        <NavLink
          to="/PetAnimalsComp"
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
        >
          Pet & Animals
        </NavLink>
      </nav>
    </div>
  );
};

export default HeaderLower;
