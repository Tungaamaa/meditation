import React from "react";

//INTERNAL IMPORT
import "./Home-page.css";
import Header from "../../Components/Header/Header";
import homepageMainPicture from "../../images/meditation.avif";
import Footer from "../../Components/Footer/Footer";
import aboutUsPicture from "../../images/balance.jpeg";
import Slick from "../../Components/Sliders/Sliders";

function Homepage(props) {
  

  return (
    <div>
      <section className="homepage">
        <Header />
        <div className="homepage-main">
          <img
            className="homepage-main-picture"
            src={homepageMainPicture}
            alt="homePageMainPicture"
          />
        </div>
        <h1 className="homepage-main-text">START YOUR INNER HEALING</h1>
      </section>

      <section>
        <div className="about-us">
          <div>
            <h1 className="about-us-title">About Us</h1>
            <div className="about-us-main">
              <p className="about-us-text">
                Welcome to our website, a sanctuary for the soul seekers, a
                haven for those on a journey of self-discovery and inner
                healing. Our mission is to guide you towards a state of
                tranquility, balance, and self-awareness through the practices
                of meditation, yoga, and inner healing. With a team of
                experienced and dedicated instructors, we offer a space where
                you can cultivate mindfulness, find solace in stillness, and
                embark on a transformative voyage within. Our approach is rooted
                in ancient wisdom yet tailored to the demands of modern life,
                providing you with practical tools to navigate the complexities
                of today's world. We believe that true well-being encompasses
                not only the physical, but also the spiritual and emotional
                realms, and our offerings are designed to nourish every aspect
                of your being. Join us in this sacred journey towards a more
                centered, harmonious, and empowered you. Together, let's unlock
                the boundless potential that resides within.
              </p>

              <img
                src={aboutUsPicture}
                className="about-us-picture"
                alt="aboutUsPicture"
              />
            </div>
          </div>

          <section className="homepage-sliders">
            <Slick />
          </section>
          <Footer />
        </div>
      </section>
    </div>
  );
}

export default Homepage;
