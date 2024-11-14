import React from "react";
import Slider from "react-slick";
import { RiSearchLine, RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Placesdata } from "../../Data/LandingPageData";

const Slick = () => {
  const NextArrow = ({ onClick }) => {
    return (
      <div
        onClick={onClick}
        className="text-xl hover:cursor-pointer hover:scale-105 bg-gray-800 text-gray-200 p-2 inline-block rounded-full shadow-md absolute top-1/2 -right-2 z-10 hover:bg-gray-700"
      >
        <RiArrowRightSLine />
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div
        onClick={onClick}
        className="text-xl bg-gray-800 text-gray-200 hover:cursor-pointer hover:scale-105 p-2 inline-block rounded-full shadow-md absolute top-1/2 -left-2 z-10 hover:bg-gray-700"
      >
        <RiArrowLeftSLine />
      </div>
    );
  };

  const settings = {
    accessibility: true,
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    autoplay: true,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-screen-lg mx-auto bg-gray-900 text-gray-200 py-6">
      <div className="m-auto w-[90%]">
        <Slider {...settings}>
          {Placesdata.map((item) => (
            <div key={item.type} className="px-1 py-4">
              <div className="overflow-hidden border border-gray-700 rounded-lg">
                <div className="relative group">
                  <img
                    src={item.pic}
                    className="h-[250px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    alt={item.type}
                  />
                  <Link
                    to={`/search?searchTerm=${item.type}`}
                    className="absolute top-1/2 left-1/2 h-10 w-10 flex justify-center items-center scale-0 bg-gray-800 text-gray-200 -translate-x-1/2 -translate-y-1/2 rounded-full group-hover:scale-100 transition-transform duration-300"
                  >
                    <RiSearchLine />
                  </Link>
                </div>

                <div className="p-4 bg-gray-800">
                  <div className="capitalize text-lg font-semibold text-gray-200">{item.type}</div>
                  <div className="text-gray-400 text-sm">{item.description}</div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Slick;
