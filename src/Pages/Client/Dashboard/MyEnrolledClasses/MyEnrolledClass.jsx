import { useQuery } from "react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loader from "../../../../Components/Shared/Loader/Loader";
import { FaUsers } from "react-icons/fa";
import { MdOutlineWatchLater } from "react-icons/md";
import useTheme from "../../../../Hooks/useTheme";


const MyEnrolledClass = () => {
    const { isDarkMode } = useTheme();
    const [axiosSecure] = useAxiosSecure();
    const { user, loading } = useAuth();
    const { data: accessCourse = [], isLoading } = useQuery({
        queryKey: ["studentEmail", user?.email],
        enabled: !loading && !!user && !!localStorage.getItem('access-token'),
        queryFn: async () => {
            const res = await axiosSecure(`/accessCourse/${user?.email}`);
            return res.data
        }
    })
    if (isLoading) {
        return <Loader />
    }
    return (
        <div className="space-y-10 py-10">
            <h2 className="text-4xl font-medium text-center">You Enrolled Classes</h2>
            <div className="grid grid-cols-3 gap-5">
                {
                    accessCourse.map(course => {
                        return (
                            <div key={course._id} className={`${isDarkMode ? 'bg-stone-800' : 'bg-base-100'} card card-compact w-96 bg-base-100 shadow-xl`}>
                                <figure><img className="w-full h-80" src={course.courseBanner} alt="course banner" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{course.courseName}</h2>
                                    <p>{course.description}</p>
                                    <div className="flex justify-between">
                                        <div className="text-base flex gap-2">
                                            <MdOutlineWatchLater className="text-2xl" /> {course.courseDuration}
                                        </div>
                                        <div className="text-base flex gap-2">
                                            <FaUsers className="text-2xl" /> {course.students}
                                        </div>
                                    </div>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary px-5">start class</button>
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

export default MyEnrolledClass;