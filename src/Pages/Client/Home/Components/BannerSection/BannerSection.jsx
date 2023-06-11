import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import banner1 from "../../../../../assets/images/banner1.jpg"
import banner2 from "../../../../../assets/images/banner2.jpg"
import banner3 from "../../../../../assets/images/banner3.jpg"

const BannerSection = () => {
    return (
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
            <SwiperSlide><img className="w-full h-[800px] object-cover" src={banner1} alt="banner image" /></SwiperSlide>
            <SwiperSlide><img className="w-full h-[800px] object-cover" src={banner2} alt="banner image" /></SwiperSlide>
            <SwiperSlide><img className="w-full h-[800px] object-cover" src={banner3} alt="banner image" /></SwiperSlide>
        </Swiper>
    );
};

export default BannerSection;