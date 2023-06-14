import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Card from "./Card";
import Swal from "sweetalert2";
import { useQuery } from "react-query";
import Loader from "../../../Components/Shared/Loader/Loader";

const ManageClasses = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: allCourse = [], isLoading, refetch } = useQuery({
        queryKey: ['allCourseData', user.email],
        queryFn: async () => {
            const res = await axiosSecure(`/allCourse/${user.email}`)
            return res.data
        }
    })
    const handleStatus = (id, status) => {
        axiosSecure.patch(`/changeStatus/${user.email}/${id}`, { status })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `The Course successfully ${status}`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }
    if (isLoading) {
        return <Loader />
    }
    return (
        <div className="py-10 space-y-16">
            <h2 className="text-4xl font-medium text-center">Manage All Course</h2>
            <div className="grid grid-cols-2 gap-3">
                {
                    allCourse.map(course => <Card key={course._id} course={course} handleStatus={handleStatus} />)
                }
            </div>
        </div>
    );
};

export default ManageClasses;