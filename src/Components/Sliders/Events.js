import React from "react";
import Slider from "react-slick";
import EventsData from "./EventsData";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//INTERNAL IMPORT
import "./Events.css";

const Events = () => {
  const settings = {
    dots: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,

    cssEase: "linear",
  };

  return (
    <>
      <div className="slider-content">
        <h1 className="slider-header">Upcoming Events</h1>
        <div className="events-slider-container">
          <Slider {...settings}>
            {EventsData.map((item) => (
              <div key={item.id}>
                <img src={item.src} alt={item.alt} className="events-sliders-img" />
                <h2 className="events-slider-title">{item.title}</h2>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default Events;
