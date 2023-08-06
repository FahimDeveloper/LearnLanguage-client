import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import Card from '../../../../../Components/Shared/Card/Card';
import useTheme from '../../../../../Hooks/useTheme';
import { ImSpinner3 } from "react-icons/im";
import { Bounce } from "react-awesome-reveal";

const PopulerCourse = ({ courses, loading }) => {
    const { isDarkMode } = useTheme();
    return (
        <div className={`${isDarkMode ? 'bg-stone-950 text-base-100' : 'bg-base-100'} sm:py-10 py-5`}>
            <div className='container mx-auto sm:space-y-10 space-y-6'>
                <Bounce>
                    <h2 className='titleStyle'>Populer Courses</h2>
                </Bounce>
                {
                    loading ? <div className={`${isDarkMode ? 'bg-stone-950' : ''} h-96 flex justify-center items-center`}>
                        <ImSpinner3 className='animate-spin text-5xl text-primary' />
                    </div> :
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={10}
                            pagination={{
                                clickable: true,
                            }}
                            breakpoints={{
                                520: {
                                    slidesPerView: 2,
                                    spaceBetween: 10,
                                },
                                768: {
                                    slidesPerView: 3,
                                    spaceBetween: 10,
                                },
                                1280: {
                                    slidesPerView: 4,
                                    spaceBetween: 10,
                                },
                            }}
                            modules={[Pagination]}
                            className="mySwiper lg:h-[610px] h-[550px]"
                        >
                            {
                                courses.slice(0, 6).map(course => <SwiperSlide key={course._id}><Card course={course} status={'populer'} /></SwiperSlide>)
                            }
                        </Swiper>
                }
            </div>
        </div>
    );
};

export default PopulerCourse;