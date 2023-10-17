import "./App.css";
import Homepage from "./Pages/Home-page/Home-page";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ServicesPage from "./Pages/Services-page/Services-page";
import LoginPage from "./Pages/Login-page/Login-page";
import SignupForm from "./Pages/Signup-page";
import { useEffect, useState } from "react";
import { auth } from "./firebase/firebase";



function App() {
  const [isUserLoggedIn, setisUserLoggedIn] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setisUserLoggedIn(true);
      } else {
        setisUserLoggedIn(false);
      }
    });
  }, [auth]);

  return (
    <div>
      <BrowserRouter>
        {isUserLoggedIn && (
          <Routes>
            <Route path="/services" Component={ServicesPage} />
          </Routes>
        )}

        {!isUserLoggedIn && (
          <Routes>
            <Route path="/" Component={Homepage} />
            <Route path="/login" Component={LoginPage} />
            <Route path="/sign-up" Component={SignupForm} />
           
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;

