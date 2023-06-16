import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import banner1 from '../../../../../assets/images/banner1.jpeg'
import banner2 from "../../../../../assets/images/banner2.jpeg"
import banner3 from "../../../../../assets/images/banner3.jpg"
import banner4 from "../../../../../assets/images/banner4.jpg"
import useTheme from "../../../../../Hooks/useTheme";

const BannerSection = () => {
    const { isDarkMode } = useTheme();
    return (
        <div className={`${isDarkMode ? 'bg-stone-950' : 'bg-base-100'} md:py-5`}>
            <div className="container mx-auto">
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                    <SwiperSlide><img className="w-full lg:h-[700px] object-cover" src={banner4} alt="banner image" /></SwiperSlide>
                    <SwiperSlide><img className="w-full lg:h-[700px] object-cover" src={banner3} alt="banner image" /></SwiperSlide>
                    <SwiperSlide><img className="w-full lg:h-[700px] object-cover" src={banner2} alt="banner image" /></SwiperSlide>
                    <SwiperSlide><img className="w-full lg:h-[700px] object-cover" src={banner1} alt="banner image" /></SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default BannerSection;