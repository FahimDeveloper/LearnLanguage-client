import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import moment from "moment";
import useTheme from "../../../Hooks/useTheme";


const MyClass = () => {
    const { isDarkMode } = useTheme();
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
        <>
            {
                myClassData.length > 0 ?
                    <div className="p-10 w-full space-y-10">
                        <h2 className="text-4xl font-medium text-center">My Course</h2>
                        <div className="overflow-x-auto">
                            <table className="table text-lg">
                                {/* head */}
                                <thead className="text-center">
                                    <tr className="text-base bg-primary text-base-100">
                                        <th>#</th>
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
                                                    <td>{course.courseName}</td>
                                                    <td>{course.availableSeat}</td>
                                                    <td>{course.courseDuration} h</td>
                                                    <td>{moment(course.date).format("dd, MMM Do YY")}</td>
                                                    <td>${course.price}</td>
                                                    <td><button className="btn btn-xs btn-info capitalize" onClick={() => window.my_modal_3.showModal()}>see feedback</button></td>
                                                    <td>
                                                        <p
                                                            className={
                                                                `px-2 text-sm rounded-full capitalize text-center ${course.status === "pending" ? 'bg-warning text-base-100' : course.status === "approved" ? "bg-success text-base-100" : 'bg-error text-base-100'}`}>
                                                            {course.status}
                                                        </p>
                                                    </td>
                                                    <td><button className="btn btn-primary btn-sm">update</button></td>
                                                    <dialog id="my_modal_3" className="modal">
                                                        <form method="dialog" className={`modal-box ${isDarkMode ? 'bg-stone-800 text-base-100' : 'bg-base-100'}`}>
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
                    </div> :
                    <p className="h-screen flex items-center text-3xl font-bold">You have no publied course</p>
            }
        </>
    );
};

export default MyClass;