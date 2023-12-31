import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//INTERNAL IMPORT
import "./Sliders.css";
import Images from "./Images";

const Slick = () => {
  const settings = {
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,

    cssEase: "linear",
  };

  return (
    <>
      <div className="slider-content">
        <h1 className="slider-header">Gallery</h1>
        <div className="slider-container">
          <Slider {...settings}>
            {Images.map((item) => (
              <div key={item.id}>
                <img src={item.src} alt={item.alt} className="slider-img"/>
                <h2 className="slider-title">{item.title}</h2>
                <p className="slider-description">{item.description}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default Slick;
