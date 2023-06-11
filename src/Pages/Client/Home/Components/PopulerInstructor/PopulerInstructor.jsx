import { FaUsers } from "react-icons/fa";

const PopulerInstructor = ({ instructors }) => {
    return (
        <div className='container mx-auto py-16 space-y-10'>
            <h2 className='titleStyle'>populer instructor</h2>
            <div className='grid grid-cols-3 gap-5'>
                {
                    instructors.slice(0, 6).map(instructor => {
                        return (
                            <div key={instructor._id} className="card bg-base-100 shadow-xl">
                                <figure><img src={instructor.image} className="w-full h-[500px] object-cover" alt="Shoes" /></figure>
                                <div className="card-body space-y-2">
                                    <h2 className="card-title">{instructor.userName}</h2>
                                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde nisi voluptates ex consequuntur veniam nihil?</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-lg">
                                            <FaUsers className="text-3xl" />
                                            {instructor.totalStudents}
                                        </div>
                                        <div className="text-lg font-medium">
                                            <p>Available instructor :  {instructor.availableinstructor}</p>
                                        </div>
                                    </div>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary">see all instructor</button>
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