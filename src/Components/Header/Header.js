import React, { useEffect, useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import props from "prop-types";
import { FaBalanceScale } from "react-icons/fa";

function Header() {

  const path = window.location.pathname;
  const [currentPath, setCurrentPath] = useState();

  useEffect(() => {
    setCurrentPath(path);
  }, [path]);

  const navigate = useNavigate();

  const handleToServicesPage = () => {
    navigate("/services");
  };

  const handleToLoginPage = () => {
    navigate("/login");
  };

  const handleToHomepage = () => {
    navigate("/");
  };
  
  return (
    <div>
      
      <div className="homepage-header">
        <header className="header">
          <div className="header-logo">
            <FaBalanceScale onClick={handleToHomepage} />
          </div>
          <div className="header-items">
            <span
              style={{ color: currentPath === "/services" ? "blue" : "black" }}
              onClick={handleToServicesPage}
            >
              Services
            </span>
            <span>Events</span>
            <span>Contact Us</span>
            <span
              style={{ color: currentPath === "/login" ? "blue" : "black" }}
              onClick={handleToLoginPage}
            >
              Login
            </span>
          </div>
        </header>
      </div>
    </div>
  );
}

export default Header;
