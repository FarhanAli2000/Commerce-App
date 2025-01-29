// import React, { useState } from "react";
// import Flag from "react-world-flags";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

// const UpperHeader = () => {
//   const [selectedLanguage, setSelectedLanguage] = useState("en");
//   const [isDropdownVisible, setIsDropdownVisible] = useState(false);

//   const handleLanguageChange = (lang) => {
//     setSelectedLanguage(lang);
//     setIsDropdownVisible(false);
//   };

//   const toggleDropdown = () => {
//     setIsDropdownVisible((prev) => !prev);
//   };

//   return (
//     <div className="upperHeaderWrapper">
//       <div className="upperHeaderContainer">
//         <div className="appInfo">
//           <span className="appInfoText">Download App Via SMS</span>
//         </div>

//         {/* Contact and Language Section */}
//         <div className="contactAndLanguage">
//           <div className="phoneInfo">
//             <span className="phoneText">+956 123099994</span>
//           </div>

//           {/* Language Selection */}
//           <div className="languageDropdown">
//             <button
//               className="languageButton"
//               onClick={toggleDropdown} // Toggle dropdown visibility
//             >
//               <Flag
//                 code={selectedLanguage === "en" ? "GB" : "SA"}
//                 className="flagIcon"
//               />
//               {selectedLanguage === "en" ? "Eng" : "Arb"}
//             </button>

//             {isDropdownVisible && ( // Show dropdown only if visible
//               <div className="dropdownContent">
//                 <div
//                   className="dropdownItem"
//                   onClick={() => handleLanguageChange("en")}
//                 >
//                   <Flag code="GB" className="flagIcon" />
//                   English
//                 </div>
//                 <div
//                   className="dropdownItem"
//                   onClick={() => handleLanguageChange("ar")}
//                 >
//                   <Flag code="SA" className="flagIcon" />
//                   Arabic
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpperHeader;

import React, { useState } from "react";
import Flag from "react-world-flags";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faMobileAlt } from "@fortawesome/free-solid-svg-icons";
import phone from "./fa-solid_mobile.svg";

const UpperHeader = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    setIsDropdownVisible(false);
  };

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  return (
    <div style={{ backgroundColor: "#E9EEFF" }}>
      {" "}
      {/* Full width background */}
      <div className="container py-2">
        {" "}
        {/* Inner container with the same background */}
        <div className="d-flex justify-content-between align-items-center">
          {/* Download App Section with Mobile Icon */}
          <div className="text-muted d-flex align-items-center">
            <img src={phone} alt="phone" />
            <p className="app-download-button  ">Download App Via SMS</p>
          </div>

          {/* Contact Info Section with Phone Icon */}
          <div className="d-flex align-items-center" style={{ gap: "67.8px" }}>
            <div className="phone-info text-muted">
              <FontAwesomeIcon
                icon={faPhone}
                style={{ color: "#36A680" }}
                className="me-2"
              />
              <span
                className="para-text "
                style={{ fontFamily: "Inter", color: "#353535" }}
              >
                +956 123099994
              </span>
            </div>

            {/* Language Dropdown Section */}
            <div
              className="lang_dropdown"
              style={{
                display: "flex",
              }}
            >
              <button
                className="btn dropdown-toggle"
                onClick={toggleDropdown}
                aria-expanded={isDropdownVisible ? "true" : "false"}
              >
                <Flag
                  code={selectedLanguage === "en" ? "GB" : "SA"}
                  className="flag-icon"
                  style={{
                    width: "27px",
                    marginRight: "5px",
                    fontFamily: "Inter",
                  }}
                />
                {selectedLanguage === "en" ? "EN" : "AR"}
              </button>

              {/* Dropdown Menu */}
              {isDropdownVisible && (
                <ul className="dropdown-menu show">
                  <li>
                    <button
                      className="dropdown-item"
                      style={{ fontFamily: "Inter" }}
                      onClick={() => handleLanguageChange("en")}
                    >
                      <Flag
                        code="GB"
                        className="flag-icon"
                        style={{ width: "27px", marginRight: "5px" }}
                      />
                      English
                    </button>
                  </li>
                  <li>
                    <button
                      style={{ fontFamily: "VIP Rawy" }}
                      className="dropdown-item"
                      onClick={() => handleLanguageChange("ar")}
                    >
                      <Flag
                        code="SA"
                        className="flag-icon"
                        style={{ width: "27px", marginRight: "5px" }}
                      />
                      Arabic
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpperHeader;
