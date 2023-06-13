import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import moment from "moment";

const ManageClasses = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const [allCourse, setAllCourse] = useState([])
    useEffect(() => {
        axiosSecure(`/allCourse/${user.email}`)
            .then(res => {
                setAllCourse(res.data)
            })
    }, [axiosSecure, user])
    return (
        <div className="py-10 space-y-16">
            <h2 className="text-4xl font-medium text-center">Manage All Course</h2>
            <div className="overflow-x-auto">
                <table className="table text-base">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Course Name</th>
                            <th>Instructor Name</th>
                            <th>Instructor Email</th>
                            <th>Available Seat</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Feadback</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allCourse.map((course, index) => {
                                return (
                                    <tr key={course._id}>
                                        <th>{index + 1}</th>
                                        <td>{course.courseName}</td>
                                        <td>{course.instructorName}</td>
                                        <td>{course.instructorEmail}</td>
                                        <td>{course.availableSeat}</td>
                                        <td>{course.courseDuration}</td>
                                        <td>{moment(course.date).format("dd, MMM Do YY")}</td>
                                        <td>${course.price}</td>
                                        <td>{course.status}</td>
                                        <td><button className="btn btn-primary">Feadback</button></td>
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

export default ManageClasses;