import { FaUsers, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import useTheme from "../../../../../Hooks/useTheme";
import { ImSpinner3 } from "react-icons/im";
import { Slide, Zoom } from "react-awesome-reveal";
import { Link } from "react-router-dom";

const PopulerInstructor = ({ instructors, loading }) => {
    const { isDarkMode } = useTheme();
    return (
        <div className={`${isDarkMode ? 'bg-stone-950 text-base-100' : 'bg-base-100'} sm:py-10 py-5`}>
            <div className="container mx-auto sm:space-y-10 space-y-6">
                <Slide><h2 className='titleStyle'>populer instructor</h2></Slide>
                {
                    loading ? <div className={`${isDarkMode ? 'bg-stone-950' : ''} h-96 flex justify-center items-center`}>
                        <ImSpinner3 className='animate-spin text-5xl text-primary' />
                    </div>
                        : <div className='grid md:grid-cols-2 gap-5'>
                            {
                                instructors.slice(0, 4).map(instructor => {
                                    return (
                                        <div key={instructor._id} className={`${isDarkMode ? 'bg-stone-800 text-base-100' : 'bg-base-100'} card flex lg:flex-row md:flex-col sm:flex-row flex-col bg-base-100 shadow-xl rounded-xl`}>
                                            <figure className="xl:w-2/5 lg:w-1/3 md:w-full sm:w-2/5 w-full"><img src={instructor.image} className="sm:w-96 w-full object-cover sm:h-72 h-96 rounded-s-xl" alt="Movie" /></figure>
                                            <div className="card-body xl:w-3/5 lg:w-2/3 md:w-full sm:w-3/5 w-full">
                                                <Zoom><h2 className="text-3xl font-medium">{instructor.userName}</h2></Zoom>
                                                <p className="text-sm">{instructor.description}</p>
                                                <div className="flex justify-between text-sm xl:text-base">
                                                    <div className="flex gap-2">
                                                        <FaUsers className="text-2xl" />
                                                        <p>Students : {instructor.totalStudents}</p>
                                                    </div>
                                                    <div>Available Course : {instructor.availableCourse}</div>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <div className="flex gap-2 text-2xl xl:text-3xl">
                                                        <FaFacebook className="text-blue-500 cursor-pointer" />
                                                        <FaInstagram className="text-red-400 cursor-pointer" />
                                                        <FaTwitter className="text-sky-400 cursor-pointer" />
                                                    </div>
                                                    <button className="btn btn-primary">see courses</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                }
                <div className="text-center">
                    <Link to="/instructors"><button className="btn btn-primary px-10">sell all instructor</button></Link>
                </div>
            </div>
        </div>
    );
};

export default PopulerInstructor;