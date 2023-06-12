import useAuth from "./useAuth";
import { useQuery } from "react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUser = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: isUser, isLoading } = useQuery({
        queryKey: ['userEmail', user?.email],
        enabled: !loading && !!user && !!localStorage.getItem('access-token'),
        queryFn: async () => {
            const res = await axiosSecure(`http://localhost:5000/users/${user.email}`)
            return res.data.role
        }
    })
    return [isUser, isLoading]
};

export default useUser;