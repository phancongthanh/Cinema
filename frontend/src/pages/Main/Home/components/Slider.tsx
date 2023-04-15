import './slider.css';
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import FilmDetail from '../../../../types/FilmDetail';

function Slider({films}: {films: FilmDetail[]}) {
  return (
    <div className="slider">
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {films.map((f, index) => (
          <SwiperSlide key={index}>
            <img src={f.poster||""} alt={f.title} title={f.title}/>
          </SwiperSlide>))}
      </Swiper>
    </div>
  );
}

export default Slider;