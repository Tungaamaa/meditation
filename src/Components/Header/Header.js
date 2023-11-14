import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBalanceScale } from "react-icons/fa";
import { signOut } from "firebase/auth";

//INTERNAL IMPORT
import { auth } from "../../firebase/firebase";
import "./Header.css";

function Header() {
  const [user, setUser] = useState(null);
  const [isUserLoggedIn, setisUserLoggedIn] = useState(false);
  const path = window.location.pathname;
  const [currentPath, setCurrentPath] = useState();


  const isAdmin = user && user.email === "admin123@gmail.com";

  useEffect(() => {
    setCurrentPath(path);
  }, [path]);

  useEffect(() => {
    const getUser = auth.onAuthStateChanged((user) => {
      if (user) {
        setisUserLoggedIn(true);
        setUser(user);
      } else {
        setisUserLoggedIn(false);
      }
    });
    return () => getUser();
  }, []);

  const navigate = useNavigate();

  const handleToServicesPage = () => {
    navigate("/services");
  };
  const handleToEventsPage = () => {
    navigate("/events");
  };

  const handleToContactUsPage = () => {
    navigate("/contact-us");
  }

  const handleToLoginPage = () => {
    navigate("/login");
  };

  const handleToHomepage = () => {
    navigate("/");
  };

  const handleAdminPage = () => {
    navigate("/admin");
  }

  const handleSignOut = async () => {
    await signOut(auth)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
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
            <span
              style={{ color: currentPath === "/events" ? "blue" : "black" }}
              onClick={handleToEventsPage}
            >
              Events
            </span>
            <span
              style={{
                color: currentPath === "/contact-us" ? "blue" : "black",
              }}
              onClick={handleToContactUsPage}
            >
              Contact Us
            </span>
            {isUserLoggedIn && (
              <span onClick={handleSignOut}>
              Logout
              </span>
            )}

            {!isUserLoggedIn && (
              <span
              onClick={handleToLoginPage}>
              Login
            </span>
              )}

              {isAdmin && (
                <span onClick={handleAdminPage}>Admin</span>
              )}
          </div>
        </header>
      </div>
    </div>
  );
}

export default Header;
