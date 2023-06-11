import { useLoaderData } from 'react-router-dom';
import { FaUsers } from "react-icons/fa";

const Clasess = () => {
    const courses = useLoaderData();
    return (
        <div className='container mx-auto py-10 space-y-16'>
            <h2 className='titleStyle'>All Courses</h2>
            <div className='grid grid-cols-4 gap-5'>
                {
                    courses.map(course => {
                        return (
                            <div key={course._id} className="card bg-base-100 shadow-xl">
                                <figure><img src={course.courseBanner} className='w-full' alt="Shoes" /></figure>
                                <div className="card-body space-y-1">
                                    <h2 className="card-title text-2xl">{course.courseName}</h2>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit minus excepturi ut quod, sit magni.</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-lg">
                                            <FaUsers className="text-3xl" />
                                            {course.students}
                                        </div>
                                        <div className="text-lg font-medium">
                                            <p>Available Seats :  {course.availableSeat}</p>
                                        </div>
                                    </div>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary">add to cart</button>
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

export default Clasess;