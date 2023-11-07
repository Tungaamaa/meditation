import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//INTERNAL IMPORT
import Homepage from "./Pages/Home-page/Home-page";
import ServicesPage from "./Pages/Services-page/Services-page";
import LoginPage from "./Pages/Login-page/Login-page";
import SignupForm from "./Pages/Signup-page/Signup-page";
import { auth } from "./firebase/firebase";
import PostPage from "./Pages/Post-page/Post-page";
import EventsPage from "./Pages/Events-page/Events-page";
import ContactUsPage from "./Pages/Contact-us-page/Contact-us-page";
import AdminPage from "./Pages/Admin-page/Admin-page";

function App() {
  const [user, setUser] = useState();
  const [isUserLoggedIn, setisUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = auth.onAuthStateChanged((user) => {
      if (user) {
        setisUserLoggedIn(true);
        setUser(user);
      } else {
        setisUserLoggedIn(false);
      }
      setLoading(false);
    });
    return () => getUser();
  }, []);

  return (
    <div>
      {loading && <div>loading . . . </div>}
      <BrowserRouter>
        {!loading && isUserLoggedIn && (
          <Routes>
            <Route path="/" element={<Homepage user={user} />} />
            <Route path="/services/:id" element={<PostPage user={user} />} />
            <Route path="/services" element={<ServicesPage user={user} />} />
            <Route path="/contact-us" element={<ContactUsPage user={user} />} />
            <Route path="/events" element={<EventsPage user={user} />} />
            <Route path="/admin" element={<AdminPage user={user} />} />
          </Routes>
        )}
        {!loading && !isUserLoggedIn && (
          <Routes>
            <Route path="/" Component={Homepage} />
            <Route path="/login" Component={LoginPage} />
            <Route path="/sign-up" Component={SignupForm} />
            <Route path="/contact-us" Component={ContactUsPage} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
