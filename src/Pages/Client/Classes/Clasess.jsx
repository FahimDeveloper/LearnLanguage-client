import { useLoaderData, useNavigate } from 'react-router-dom';
import { FaUsers } from "react-icons/fa";
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import useCart from '../../../Hooks/useCart';
import Swal from 'sweetalert2';

const Clasess = () => {
    const courses = useLoaderData();
    const navigate = useNavigate();
    const [, refetch] = useCart();
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const handleAddToCart = ({ _id, courseName, courseBanner, instructorName }) => {
        if (user) {
            const cartCourse = { courseId: _id, courseName: courseName, instructorName: instructorName, userEmail: user.email, courseBanner: courseBanner }
            axiosSecure.post(`http://localhost:5000/addToCart`, cartCourse)
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
        <div className='container mx-auto py-10 space-y-16'>
            <h2 className='titleStyle'>All Courses</h2>
            <div className='grid grid-cols-4 gap-5'>
                {
                    courses.map(course => {
                        return (
                            <div key={course._id} className="card bg-base-100 shadow-xl">
                                <figure><img src={course.courseBanner} className='w-full' alt="Shoes" /></figure>
                                <div className="card-body space-y-1">
                                    <h2 className="card-title text-2xl">{course.courseName}</h2>
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

export default Clasess;