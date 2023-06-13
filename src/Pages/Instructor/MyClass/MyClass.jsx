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
                    <thead>
                        <tr className="text-base bg-primary text-base-100">
                            <th>#</th>
                            <th>Course</th>
                            <th>Course Name</th>
                            <th>Available Seat</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
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
                                        <td>{moment(course.date).format("dd, MMM Do YY")}</td>
                                        <td>${course.price}</td>
                                        <td><p
                                            className={
                                                `border px-2 py-1 rounded-lg capitalize text-center ${course.status === "pending" ? 'border-warning text-warning' : course.status === "approved" ? "border-success text-success" : 'border-error text-error'}`}>{course.status}</p></td>
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