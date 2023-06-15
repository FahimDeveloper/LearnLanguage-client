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

const PopulerCourse = ({ courses }) => {
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
        <div className='container mx-auto py-10 space-y-10'>
            <h2 className='titleStyle'>Populer Courses</h2>
            <Swiper
                slidesPerView={4}
                spaceBetween={10}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper h-[610px]"
            >
                {
                    courses.slice(0, 6).map(course => <SwiperSlide key={course._id}><Card course={course} handleAddToCart={handleAddToCart} status={'populer'} /></SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default PopulerCourse;