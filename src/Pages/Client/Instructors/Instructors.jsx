import axios from "axios";
import { FaUsers } from "react-icons/fa";
import { useQuery } from "react-query";
import Loader from "../../../Components/Shared/Loader/Loader";

const Instructors = () => {
    const { data: instructors = [], isLoading } = useQuery({
        queryKey: ['instructorData'],
        queryFn: async () => {
            const res = await axios('https://assignment-12-server-chi-wheat.vercel.app/instructors');
            return res.data
        }
    })
    if (isLoading) {
        return <Loader />
    }
    return (
        <div className='container mx-auto py-10 space-y-10'>
            <h2 className='titleStyle'>all instructors</h2>
            <div className='grid grid-cols-4 gap-5'>
                {
                    instructors.map(course => {
                        return (
                            <div key={course._id} className="card card-compact bg-base-100 shadow-xl">
                                <figure><img src={course.image} className="w-full h-96 object-cover" alt="intructor image" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{course.userName}</h2>
                                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde nisi voluptates ex consequuntur veniam nihil?</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-lg">
                                            <FaUsers className="text-3xl" />
                                            {course.totalStudents}
                                        </div>
                                        <div className="text-lg font-medium">
                                            <p>Available course :  {course.availableCourse}</p>
                                        </div>
                                    </div>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary">see all course</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Instructors;