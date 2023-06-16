import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import useCart from "../../../../../Hooks/useCart";
import useAuth from "../../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import Card from '../../../../../Components/Shared/Card/Card';
import useTheme from '../../../../../Hooks/useTheme';
import { ImSpinner3 } from "react-icons/im";
const PopulerCourse = ({ courses, loading }) => {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();
    const [, refetch] = useCart();
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const handleAddToCart = ({ _id, courseName, courseBanner, instructorName }) => {
        if (user) {
            const cartCourse = { courseId: _id, courseName: courseName, instructorName: instructorName, userEmail: user?.email, courseBanner: courseBanner }
            axiosSecure.post('/addToCart', cartCourse)
                .then(data => {
                    if (data.data.insertedId) {
                        refetch();
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Item Add In Cart',
                            showConfirmButton: false,
                            timer: 1000
                        })
                    } else if (data.data.available) {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Oops...',
                            text: 'The course already added in you cart',
                        })
                    }
                })
        } else {
            Swal.fire({
                title: 'Have to login',
                text: "You won't be able to cart this item! Please login first",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Go for login'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/authentication')
                }
            })
        }
    }
    return (
        <div className={`${isDarkMode ? 'bg-stone-950 text-base-100' : 'bg-base-100'} py-10`}>
            <div className='container mx-auto space-y-10'>
                <h2 className='titleStyle'>Populer Courses</h2>
                {
                    loading ? <div className={`${isDarkMode ? 'bg-stone-950' : ''} h-96 flex justify-center items-center`}>
                        <ImSpinner3 className='animate-spin text-5xl text-primary' />
                    </div> :
                        <Swiper
                            slidesPerView={2}
                            spaceBetween={10}
                            pagination={{
                                clickable: true,
                            }}
                            breakpoints={{
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
                                courses.slice(0, 6).map(course => <SwiperSlide key={course._id}><Card course={course} handleAddToCart={handleAddToCart} status={'populer'} /></SwiperSlide>)
                            }
                        </Swiper>
                }
            </div>
        </div>
    );
};

export default PopulerCourse;