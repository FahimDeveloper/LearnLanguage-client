import { FaUsers } from "react-icons/fa";
import { useLoaderData } from 'react-router-dom';

const Instructors = () => {
    const instructors = useLoaderData();
    return (
        <div className='container mx-auto py-10 space-y-16'>
            <h2 className='titleStyle'>all instructors</h2>
            <div className='grid grid-cols-4 gap-5'>
                {
                    instructors.map(course => {
                        return (
                            <div key={course._id} className="card bg-base-100 shadow-xl">
                                <figure><img src={course.image} className="w-full h-96 object-cover" alt="Shoes" /></figure>
                                <div className="card-body space-y-1">
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