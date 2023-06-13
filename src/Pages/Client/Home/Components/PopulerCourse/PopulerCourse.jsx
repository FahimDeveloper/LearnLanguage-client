import { FaUsers } from "react-icons/fa";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import useCart from "../../../../../Hooks/useCart";
import useAuth from "../../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";

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
        <div className='container mx-auto py-16 space-y-10'>
            <h2 className='titleStyle'>Populer Courses</h2>
            <div className='grid grid-cols-3 gap-5'>
                {
                    courses.slice(0, 6).map(course => {
                        return (
                            <div key={course._id} className="card bg-base-100 shadow-xl relative">
                                <figure><img src={course.courseBanner} className='h-96 w-full' alt="Shoes" /></figure>
                                <div className="card-body space-y-2">
                                    <h2 className="card-title text-2xl">{course.courseName}</h2>
                                    <div className="badge badge-warning absolute top-4 right-4">Populer</div>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit minus excepturi ut quod, sit magni.</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-lg">
                                            <FaUsers className="text-3xl" />
                                            {course.students}
                                        </div>
                                        <div className="text-lg font-medium">
                                            <p>Available Seats :  {course.availableSeat}</p>
                                        </div>
                                    </div>
                                    <div className="card-actions justify-end">
                                        <button onClick={() => handleAddToCart(course)} className="btn btn-primary">add to cart</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default PopulerCourse;