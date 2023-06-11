import { FaUsers } from "react-icons/fa";

const PopulerCourse = ({ courses }) => {
    return (
        <div className='container mx-auto py-16 space-y-10'>
            <h2 className='titleStyle'>Populer Courses</h2>
            <div className='grid grid-cols-3 gap-5'>
                {
                    courses.slice(0, 6).map(course => {
                        return (
                            <div key={course._id} className="card bg-base-100 shadow-xl relative">
                                <figure><img src={course.courseBanner} className='h-96 w-full' alt="Shoes" /></figure>
                                <div className="card-body space-y-2">
                                    <h2 className="card-title text-2xl">{course.courseName}</h2>
                                    <div className="badge badge-warning absolute top-4 right-4">Populer</div>
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

export default PopulerCourse;