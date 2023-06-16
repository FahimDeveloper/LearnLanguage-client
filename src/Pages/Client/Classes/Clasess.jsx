import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import useCart from '../../../Hooks/useCart';
import Swal from 'sweetalert2';
import Card from '../../../Components/Shared/Card/Card';
import { useQuery } from 'react-query';
import axios from 'axios';
import Loader from '../../../Components/Shared/Loader/Loader';
import useTheme from '../../../Hooks/useTheme';

const Clasess = () => {
    const { isDarkMode } = useTheme();
    const { data: courses = [], isLoading } = useQuery({
        queryKey: ['instructorData'],
        queryFn: async () => {
            const res = await axios('https://assignment-12-server-chi-wheat.vercel.app/courses');
            return res.data
        }
    })
    const navigate = useNavigate();
    const [, refetch] = useCart();
    const { user, showError } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const handleAddToCart = ({ _id, courseName, courseBanner, instructorName }) => {
        if (user) {
            const cartCourse = { courseId: _id, courseName: courseName, instructorName: instructorName, userEmail: user.email, courseBanner: courseBanner }
            axiosSecure.post(`/addToCart/${user.email}`, cartCourse)
                .then(data => {
                    if (data.data.insertedId) {
                        refetch();
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Course Add In Cart',
                            showConfirmButton: false,
                            timer: 1000
                        })
                    } else if (data.data.enrolled) {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Enrolled',
                            text: 'You have already enrolled this course',
                        })
                    }
                }).catch(error => {
                    showError(error.message)
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
    if (isLoading) {
        return <Loader />
    }
    return (
        <div className={`${isDarkMode ? 'bg-stone-950 text-base-100' : 'bg-base-100'}`}>
            <div className='container mx-auto py-10 space-y-16'>
                <h2 className='titleStyle'>All Courses</h2>
                <div className='grid grid-cols-4 gap-5'>
                    {
                        courses.map(course => <Card key={course._id} course={course} handleAddToCart={handleAddToCart} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default Clasess;