import {Swiper,SwiperSlide} from "swiper/react";
import {EffectCoverflow,Navigation,Pagination} from "swiper/modules"
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

function Carousel({slides}) {
    return (
      <Swiper
        modules={[EffectCoverflow, Navigation, Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={10}
        slidesPerView={"auto"}
        centeredSlides
        speed={600}
        effect={"coverflow"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        navigation={true}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="slide-inner">
            <img className="slide" src={slide.image_url} />
          </SwiperSlide>
        ))}
      </Swiper>
    );
}
export default Carousel