import React from "react";
import { NavLink } from "react-router-dom";

const HeaderLower = () => {
  // Directly check window width on initial render
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 767;

  if (isMobile) {
    return null; // Don't render the component on mobile
  }

  return (
    <div className="header-lower container">
      <nav className="nav-links" style={{ fontFamily: "VIP Rawy Regular" }}>
        {[
          "Automotive",
          "Electronics",
          "Fashion Style",
          "Health Care",
          "Job Board",
          "Education",
          "Real Estate",
          "Travel",
          "Sport & Games",
          "Pet & Animals",
        ].map((category, index) => (
          <NavLink
            key={index}
            to="/index"
            className="nav-link"
            style={{
              position: "relative",
              textDecoration: "none",
              color: "black",
              padding: "10px 15px",
              fontSize: "16px",
              display: "inline-block",
            }}
          >
            {category}
            <span
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                height: "2px",
                width: "0%",
                backgroundColor: "#007bff",
                transition: "width 0.3s ease",
              }}
              className="hover-underline"
            />
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default HeaderLower;
