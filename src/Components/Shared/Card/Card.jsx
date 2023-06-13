import { FaUsers } from "react-icons/fa";
import useCart from "../../../Hooks/useCart";
import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
const Card = ({ course, handleAddToCart }) => {
    const [selectedClass, setSelectedClass] = useState(false)
    const [cartData] = useCart();
    const { user } = useAuth();
    useEffect(() => {
        const matchClass = cartData.find(cart => cart.courseId === course._id)
        if (matchClass) {
            if (user?.email === matchClass.userEmail) {
                setSelectedClass(true)
            }
        }
    }, [cartData, course, user])
    return (
        <div className="card bg-base-100 shadow-xl" title={`${selectedClass ? "You can't seletect because you have already added" : ''}`}>
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
                    <button onClick={() => handleAddToCart(course)} disabled={selectedClass} className={`btn ${selectedClass ? 'disabled:cursor-not-allowed' : 'btn-primary'}`}>{selectedClass ? 'Already Added' : 'add to cart'}</button>
                </div>
            </div>
        </div>
    );
};

export default Card;
