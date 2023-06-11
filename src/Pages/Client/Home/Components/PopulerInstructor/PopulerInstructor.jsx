import { FaUsers } from "react-icons/fa";

const PopulerInstructor = ({ instructor }) => {
    return (
        <div className='container mx-auto py-16 space-y-10'>
            <h2 className='text-center text-5xl font-bold uppercase italic'>populer instructor</h2>
            <div className='grid grid-cols-3 gap-5'>
                {
                    instructor.slice(0, 6).map(course => {
                        return (
                            <div key={course._id} className="card bg-base-100 shadow-xl">
                                <figure><img src={course.image} className="w-full h-[500px] object-cover" alt="Shoes" /></figure>
                                <div className="card-body space-y-2">
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

export default PopulerInstructor;