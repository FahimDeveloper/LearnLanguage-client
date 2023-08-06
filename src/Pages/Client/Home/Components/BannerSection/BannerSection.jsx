/* eslint-disable react/no-unescaped-entities */
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper";
import useTheme from "../../../../../Hooks/useTheme";
import Lottie from "lottie-react";
import animation1 from "../../../../../assets/HomeSliderJsons/animation1.json"
import animation2 from "../../../../../assets/HomeSliderJsons/animation2.json"
import animation3 from "../../../../../assets/HomeSliderJsons/animation3.json"

const BannerSection = () => {
    const { isDarkMode } = useTheme();
    return (
        <div className={`${isDarkMode ? 'bg-stone-950' : 'bg-base-100'} md:pb-5`}>
            <div className="lg:container lg:px-0 px-5 mx-auto">
                <Swiper
                    centeredSlides={true}
                    autoplay={{
                        delay: 1500,
                        pauseOnMouseEnter: true,
                    }}
                    pagination={{
                        clickable: true
                    }} modules={[Autoplay, Pagination]}
                    className="mySwiper">
                    <SwiperSlide>
                        <div className="grid xl:grid-cols-7 lg:grid-cols-2 items-center lg:min-h-[800px] min-h-screen">
                            <div className="md:space-y-5 space-y-2 xl:col-span-3 lg:order-1 order-2">
                                <h3 className="font-semibold lg:text-3xl md:text-2xl text-xl">Explore, Connect, and Thrive with Languages!</h3>
                                <p className="md:tracking-wider tracking-wide text-sm md:text-base">
                                    Embark on a language learning journey and open doors to new cultures, exciting careers, and meaningful connections. Start today!
                                </p>
                                <button className="btn btn-warning">Explore our courses</button>
                            </div>
                            <div className="xl:col-span-4 lg:order-2 order-1">
                                <Lottie animationData={animation1} loop={true} className="w-full" />
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="grid xl:grid-cols-7 lg:grid-cols-2 items-center lg:min-h-[800px] min-h-screen">
                            <div className="md:space-y-5 space-y-2 xl:col-span-3 lg:order-1 order-2">
                                <h3 className="font-semibold lg:text-3xl md:text-2xl text-xl">Master Communication in Any Language</h3>
                                <p className="md:tracking-wider tracking-wide text-sm md:text-base">
                                    Gain fluency and confidence in expressing yourself across borders. Our interactive courses empower you to become a global communicator.
                                </p>
                                <button className="btn btn-warning">more about us</button>
                            </div>
                            <div className="xl:col-span-4 lg:order-2 order-1">
                                <Lottie animationData={animation2} loop={true} className="lg:w-3/4 w-full mx-auto" />
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="grid xl:grid-cols-7 lg:grid-cols-2 items-center lg:min-h-[800px] min-h-screen">
                            <div className="md:space-y-5 space-y-2 xl:col-span-3 lg:order-1 order-2">
                                <h3 className="font-semibold lg:text-3xl md:text-2xl text-xl">Discover the Beauty of Multilingualism</h3>
                                <p className="md:tracking-wider tracking-wide text-sm md:text-base">
                                    Dive into the richness of languages and experience the joy of speaking multiple tongues. Explore our courses and embrace diversity.
                                </p>
                                <button className="btn btn-warning">Let's start Learning</button>
                            </div>
                            <div className="xl:col-span-4 lg:order-2 order-1">
                                <Lottie animationData={animation3} loop={true} className="lg:w-4/6 w-full mx-auto" />
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div >
    );
};

export default BannerSection;