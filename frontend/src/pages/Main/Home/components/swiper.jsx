import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./slider.css";

// import required modules
import { Navigation } from "swiper";

function slider() {
  return (
    <div className="slider">
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide>
          <img src={process.env.PUBLIC_URL + 'black-panther-2.jpg'} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={process.env.PUBLIC_URL + 'endgame.jpg'} alt="" />
        </SwiperSlide>
        <SwiperSlide>
        <img src={process.env.PUBLIC_URL + 'The-matrix.jpg'} alt="" />
        </SwiperSlide>
        <SwiperSlide>
        <img src={process.env.PUBLIC_URL + 'the-social-network.jpg'} alt="" />
        </SwiperSlide>
        <SwiperSlide><img src={process.env.PUBLIC_URL + 'titanic.jpg'} alt="" /></SwiperSlide>
      </Swiper>
    </div>
  );
}
export default slider;
