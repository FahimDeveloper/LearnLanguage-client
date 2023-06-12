import useCart from "../../../../Hooks/useCart";


const MySelectedClass = () => {
    const [cartData] = useCart();
    return (
        <div className="py-16">
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
                                        <td><button className="btn btn-error">delete</button></td>
                                        <td><button className="btn btn-info">pay</button></td>
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

export default MySelectedClass;