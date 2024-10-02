import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SS from "./slider.module.css"
import "./customSlider.css"
import { useSelector, useDispatch } from 'react-redux';
import {nextPage} from "../../redux/slices/pageSlice";

const searchImage = process.env.PUBLIC_URL + '/images/search.jpg';
const personalizeImage = process.env.PUBLIC_URL + '/images/personalize.jpg';
const applyImage = process.env.PUBLIC_URL + '/images/apply.jpg';


const NextArrow = (props) => {
    let { className, onClick } = props;
    className += (' ' + SS.arrowStyle);
    className += (' ' + SS.right);
    return (
      <div
        className={className}
        onClick={onClick}
      />
    );
  };
  
  const PrevArrow = (props) => {
    let { className, onClick } = props;
    className += (' ' + SS.arrowStyle);
    className += (' ' + SS.left);
    return (
      <div
        className={className}
        onClick={onClick}
      />
    );
  };

const CustomSlider = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.user.email);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow/>,
    prevArrow: <PrevArrow/>,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const slides = [
    {
      image: searchImage,
      title: "Post Jobs Easily",
      description: "Easily post job listings and reach a wide audience.",
      buttonText: "Learn More",
    },
    {
      image: applyImage,
      title: "Apply for Jobs",
      description: "Quickly match with qualified candidates.",
      buttonText: "Explore Now",
    },
    {
      image: personalizeImage,
      title: "Personalized Dashboard",
      description: "Track and manage all your applications in one place.",
      buttonText: "Get Started",
    },
  ];

  const handleButtonClick = (title) => {
    if (title.includes("Apply")) {
      dispatch(nextPage("/job-listings"));
    } else {
      dispatch(nextPage("/personal-page"));
    }
  }

  return (
    <section className={SS.main}>
        <div className={SS.content}>
        <Slider {...settings}>
        {slides.map((slide, index) => (
          <div className = {SS.slider_child} key={index}>
            <div className={SS.imgContainer} style={{ flex: 1 }}>
                <img
                    src={slide.image}
                    alt={slide.title}
                    style={{
                    width: "80%",
                    height: "auto",
                    borderRadius: "10px",
                    }}
                />
            </div>
            <div className={SS.contentInfo} style={{ flex: 1, padding: "0 50px", textAlign: "left" }}>
                <h2>{slide.title}</h2>
                <p>{slide.description}</p>
                <button
                    onClick={() => handleButtonClick(slide.title)}
                    style={{
                    padding: "10px 20px",
                    backgroundColor: "#4a56e2",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    }}
                >
                    {slide.buttonText}
                </button>
            </div>
          </div>
        ))}
      </Slider>
        </div>
    </section>
  );
};

export default CustomSlider;
