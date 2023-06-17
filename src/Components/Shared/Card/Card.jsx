import { FaUsers } from "react-icons/fa";
import useCart from "../../../Hooks/useCart";
import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useUser from "../../../Hooks/useUser";
import { MdOutlineWatchLater } from "react-icons/md";
import useTheme from "../../../Hooks/useTheme";
import { Fade } from "react-awesome-reveal";


const Card = ({ course, handleAddToCart, status }) => {
    const { isDarkMode } = useTheme();
    const [selectedClass, setSelectedClass] = useState(false)
    const [unUsed, setUnUsed] = useState(false)
    const [cartData] = useCart();
    const { user } = useAuth();
    const [isUser, isLoading] = useUser();
    useEffect(() => {
        const matchClass = cartData.find(cart => cart.courseId === course._id)
        if (matchClass) {
            if (user?.email === matchClass.userEmail) {
                setSelectedClass(true)
            }
        }
        if (!isLoading) {
            if (isUser === "admin" || isUser === "instructor") {
                setUnUsed(true);
            }
        }
    }, [cartData, course, user, isLoading, isUser])
    return (
        <div className={`card card-compact shadow-xl relative ${course.availableSeat < 1 ? 'bg-error' : isDarkMode ? 'bg-stone-800 text-base-100' : 'bg-base-100'}`} title={`${selectedClass ? "You can't seletect because you have already added" : unUsed ? `You can't seletect because you are ${isUser}` : ''}`}>
            {
                status ? <div className="badge badge-warning absolute top-3 left-3">{status}</div> : ''
            }
            <figure><img src={course.courseBanner} className='w-full md:h-80 h-72 p-2 rounded-xl' alt="class image" /></figure>
            <div className="card-body lg:space-y-1">
                <Fade>
                    <h2 className="text-xl font-medium lg:text-2xl truncate">{course.courseName}</h2>
                </Fade>
                <p>{course.description?.slice(0, 80)}...</p>
                <div className="flex items-center justify-between lg:text-base">
                    <div className="flex items-center gap-2">
                        <FaUsers className="text-2xl" />
                        {course.students}
                    </div>
                    <div className="font-medium">
                        <p>Available Seats :  {course.availableSeat}</p>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 lg:text-base">
                        <MdOutlineWatchLater className="text-2xl" />
                        {course.courseDuration} h
                    </div>
                    <div className="lg:text-lg text-base font-medium">
                        <p>Price : ${course.price}</p>
                    </div>
                </div>
                <div className="card-actions justify-end">
                    <button onClick={() => handleAddToCart(course)} disabled={selectedClass || unUsed} className={`btn ${selectedClass || unUsed ? `disabled ${isDarkMode ? 'disabled:bg-stone-700 disabled:text-base-100' : 'disabled:bg-stone-200 disabled:text-stone-900'}` : 'btn-primary'}`}>{selectedClass ? 'Already Added' : isUser === "admin" || isUser === "instructor" || course.availableSeat < 1 ? "not available" : "add to cart"}</button>
                </div>
            </div>
        </div>
    );
};

export default Card;
