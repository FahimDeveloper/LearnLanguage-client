// import moment from "moment";
import { useEffect, useState } from "react";
import { MdOutlineWatchLater } from "react-icons/md";
import useTheme from "../../../Hooks/useTheme";
const Card = ({ course, handleStatus, setSelectedId }) => {
    const { isDarkMode } = useTheme();
    const [status, setStatus] = useState(false);
    useEffect(() => {
        if (course.status === 'approved' || course.status === 'deny') {
            setStatus(true)
        }
    }, [course])
    return (
        <div className={`${isDarkMode ? 'bg-stone-800' : 'bg-base-100'} card card-side card-compact bg-base-100 shadow-xl relative`}>
            <figure><img className="w-56 h-56 object-cover" src={course.courseBanner} alt="course banner" /></figure>
            <div className="card-body">
                <div className={`badge badge-sm uppercase absolute left-1 top-1 ${course.status === "pending" ? 'badge-warning' : course.status === "approved" ? 'badge-success' : 'badge-error'}`}>{course.status}</div>
                <h2 className="card-title">{course.courseName}</h2>
                <p>Instructor Name : {course.instructorName}</p>
                <p>Instructor Email : {course.instructorEmail}</p>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-base">
                        <MdOutlineWatchLater className="text-2xl" />
                        {course.courseDuration} Hour
                    </div>
                    <div className="">
                        <p>Available Seats :  {course.availableSeat}</p>
                    </div>
                    <div className="">
                        <p>Price : ${course.price}</p>
                    </div>
                </div>
                <div className="card-actions justify-end">
                    <button onClick={() => handleStatus(course._id, 'deny')} disabled={status} className={`${status ? `disabled ${isDarkMode ? 'disabled:bg-stone-700 disabled:text-base-100' : 'disabled:bg-stone-200 disabled:text-stone-900'}` : ''} btn btn-xs btn-error`}>deny</button>
                    <button onClick={() => handleStatus(course._id, 'approved')} disabled={status} className={`${status ? `disabled ${isDarkMode ? 'disabled:bg-stone-700 disabled:text-base-100' : 'disabled:bg-stone-200 disabled:text-stone-900'}` : ''} btn btn-xs btn-success`}>approved</button>
                    <label htmlFor="my_modal_6" onClick={() => setSelectedId(course._id)} className="btn btn-xs btn-primary">send feedback</label>
                </div>
            </div>
        </div>
    );
};

export default Card;