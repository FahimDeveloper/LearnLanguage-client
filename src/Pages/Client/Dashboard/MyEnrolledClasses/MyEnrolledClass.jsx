import { useQuery } from "react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";


const MyEnrolledClass = () => {
    const [axiosSecure] = useAxiosSecure();
    const { user, loading } = useAuth();
    const { data: accessCourse = [], isLoading } = useQuery({
        queryKey: ["studentEmail", user?.email],
        enabled: !loading && !!user && !!localStorage.getItem('access-token'),
        queryFn: async () => {
            const res = axiosSecure(`/accessCourse/${user?.email}`);
            return res.data
        }
    })
    return (
        <div>
            my enrolled class
        </div>
    );
};

export default MyEnrolledClass;