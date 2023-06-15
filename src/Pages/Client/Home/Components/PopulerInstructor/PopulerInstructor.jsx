import { FaUsers, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const PopulerInstructor = ({ instructors }) => {
    return (
        <div className='container mx-auto py-10 space-y-10'>
            <h2 className='titleStyle'>populer instructor</h2>
            <div className='grid grid-cols-2 gap-5'>
                {
                    instructors.slice(0, 6).map(instructor => {
                        return (
                            <div key={instructor._id} className="grid grid-cols-3 bg-base-100 shadow-xl rounded-xl">
                                <figure><img src={instructor.image} className="w-96 object-cover h-72 rounded-s-xl" alt="Movie" /></figure>
                                <div className="card-body col-span-2">
                                    <h2 className="text-3xl font-medium">{instructor.userName}</h2>
                                    <p className="text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore sint maxime eum temporibus voluptates cumque aliquid sunt nihil eos blanditiis.</p>
                                    <div className="flex justify-between">
                                        <div className="flex gap-2">
                                            <FaUsers className="text-2xl" />
                                            <p>Students : {instructor.totalStudents}</p>
                                        </div>
                                        <div>Available Course : {instructor.availableCourse}</div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-2 text-3xl">
                                            <FaFacebook className="text-blue-500 cursor-pointer" />
                                            <FaInstagram className="text-red-400 cursor-pointer" />
                                            <FaTwitter className="text-sky-400 cursor-pointer" />
                                        </div>
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