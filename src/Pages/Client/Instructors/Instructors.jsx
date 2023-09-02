import axios from "axios";
import { FaUsers } from "react-icons/fa";
import { useQuery } from "react-query";
import Loader from "../../../Components/Shared/Loader/Loader";
import useTheme from "../../../Hooks/useTheme";
import useTitlle from "../../../Hooks/useTitlle";

const Instructors = () => {
    const { isDarkMode } = useTheme();
    const { data: instructors = [], isLoading } = useQuery({
        queryKey: ['instructorData'],
        queryFn: async () => {
            const res = await axios('https://assignment-12-server-chi-wheat.vercel.app/instructors');
            return res.data
        }
    });
    useTitlle('Instructors')
    if (isLoading) {
        return <Loader />
    }
    return (
        <div className={`${isDarkMode ? 'bg-stone-950 text-base-100' : 'bg-base-100'}`}>
            <div className='container mx-auto py-10 space-y-10'>
                <h2 className='titleStyle'>all instructors</h2>
                <div className='grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-5'>
                    {
                        instructors.map(instructor => {
                            return (
                                <div key={instructor._id} className={`${isDarkMode ? 'bg-stone-800' : 'bg-base-100'} card card-compact bg-base-100 shadow-xl`}>
                                    <figure><img src={instructor.image} className="w-full h-96 object-cover" alt="intructor image" /></figure>
                                    <div className="card-body">
                                        <h2 className="card-title">{instructor.userName}</h2>
                                        <p>{instructor.description}</p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-lg">
                                                <FaUsers className="text-2xl" />
                                                {instructor.totalStudents}
                                            </div>
                                            <div className="font-medium">
                                                <p>Available course :  {instructor.availableCourse}</p>
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
        </div>
    );
};

export default Instructors;