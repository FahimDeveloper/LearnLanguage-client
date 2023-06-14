import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import moment from "moment";


const MyClass = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const [myClassData, setMyClassData] = useState([])
    useEffect(() => {
        axiosSecure(`/instructorCourse/${user.email}`)
            .then(res => {
                setMyClassData(res.data)
            })
    }, [axiosSecure, user])
    return (
        <div>
            <h2 className="text-4xl font-medium text-center">My Course</h2>
            <div className="overflow-x-auto">
                <table className="table text-lg">
                    {/* head */}
                    <thead className="text-center">
                        <tr className="text-base bg-primary text-base-100">
                            <th>#</th>
                            <th>Course</th>
                            <th>Course Name</th>
                            <th>Available Seat</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Feedback</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {
                            myClassData?.map((course, index) => {
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
                                        <td>{course.availableSeat}</td>
                                        <td>{course.courseDuration} h</td>
                                        <td>{moment(course.date).format("dd, MMM Do YY")}</td>
                                        <td>${course.price}</td>
                                        <td><button className="btn btn-xs" onClick={() => window.my_modal_3.showModal()}>see feedback</button></td>
                                        <td>
                                            <p
                                                className={
                                                    `border px-2 rounded-full capitalize text-center ${course.status === "pending" ? 'border-warning text-warning' : course.status === "approved" ? "border-success text-success" : 'border-error text-error'}`}>
                                                {course.status}
                                            </p>
                                        </td>
                                        <td><button className="btn btn-primary btn-sm">update</button></td>
                                        <dialog id="my_modal_3" className="modal">
                                            <form method="dialog" className="modal-box">
                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                <h3 className="font-bold text-lg">Feedback From Admin</h3>
                                                <p className="py-4">{course.feedback !== "" ? course.feedback : "You have no feedback for this course"}</p>
                                            </form>
                                        </dialog>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyClass;