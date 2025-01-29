import React from "react";
import { NavLink } from "react-router-dom";

const HeaderLower = () => {
  // Directly check window width on initial render
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 767;

  if (isMobile) {
    return null; // Don't render the component on mobile
  }

  const categories = [
    { name: "Automotive", path: "/" },
    { name: "Electronics", path: "/" },
    { name: "Fashion Style", path: "/" },
    { name: "Health Care", path: "/" },
    { name: "Job Board", path: "/JobBoard" },
    { name: "Education", path: "/" },
    { name: "Real Estate", path: "/" },
    { name: "Travel", path: "/" },
    { name: "Sport & Games", path: "/" },
    { name: "Pet & Animals", path: "/" },
  ];

  return (
    <div className="header-lower container">
      <nav className="nav-links" style={{ fontFamily: "VIP Rawy Regular" }}>
        {categories.map((category, index) => (
          <NavLink
            key={index}
            to={category.path}
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
            {category.name}
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
