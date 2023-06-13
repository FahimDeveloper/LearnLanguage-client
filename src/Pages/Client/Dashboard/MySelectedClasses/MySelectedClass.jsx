import Swal from "sweetalert2";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useCart from "../../../../Hooks/useCart";
import { useNavigate } from "react-router-dom";
import Loader from "../../../../Components/Shared/Loader/Loader";


const MySelectedClass = () => {
    const [cartData, refetch, isLoading] = useCart();
    const navigate = useNavigate()
    const { user, showError } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/deleteToCart?email=${user?.email}&id=${id}`)
                    .then(data => {
                        console.log(data.data)
                        if (data.data.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    }).catch(error => {
                        showError(error.message)
                    })
            }
        })
    }
    const handlePaymentPrice = (price, courseId, cartId, courseName) => {
        navigate('/dashboard/payment', { state: { price: price, courseId: courseId, cartId: cartId, courseName: courseName } })
    }
    if (isLoading) {
        return <Loader />
    }
    return (
        <>
            {
                cartData.length > 0 ?
                    <div className="overflow-x-auto">
                        <table className="table text-lg">
                            <thead className="bg-primary text-base-100">
                                <tr className="text-base">
                                    <th>#</th>
                                    <th>Course</th>
                                    <th>Course Name</th>
                                    <th>Instructor Name</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                    <th>pay</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cartData.map((course, index) => {
                                        return (
                                            <tr key={course._id}>
                                                <th>{index + 1}</th>
                                                <td>
                                                    <div className="avatar">
                                                        <div className="mask rounded-xl w-16 h-16">
                                                            <img src={course.courseBanner} alt="course banner image" />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{course.courseName}</td>
                                                <td>{course.instructorName}</td>
                                                <td>$45</td>
                                                <td><button onClick={() => handleDelete(course._id)} className="btn btn-error">delete</button></td>
                                                <td><button onClick={() => handlePaymentPrice(45, course.courseId, course._id, course.courseName)} className="btn btn-info">pay</button></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    : <p className="h-screen flex items-center text-3xl font-bold">You have no selected course</p>
            }
        </>
    );
};

export default MySelectedClass;