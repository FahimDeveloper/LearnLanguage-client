// import moment from "moment";
import { useEffect, useState } from "react";
import { MdOutlineWatchLater } from "react-icons/md";
const Card = ({ course, handleStatus }) => {
    const [status, setStatus] = useState(false);
    useEffect(() => {
        if (course.status === 'approved' || course.status === 'deny') {
            setStatus(true)
        }
    }, [course])
    return (
        <div className="card card-side card-compact bg-base-100 shadow-xl relative">
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
                    <button onClick={() => handleStatus(course._id, 'deny')} disabled={status} className="btn btn-sm btn-error">deny</button>
                    <button onClick={() => handleStatus(course._id, 'approved')} disabled={status} className="btn btn-sm btn-success">approved</button>
                    <button className="btn btn-sm btn-primary">feedback</button>
                </div>
            </div>
        </div>
    );
};

export default Card;