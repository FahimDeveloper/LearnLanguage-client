import useAuth from "./useAuth";
import { useQuery } from "react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUser = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: isUser, isLoading, refetch } = useQuery({
        queryKey: ['userEmail', user?.email],
        enabled: !loading && !!user && !!localStorage.getItem('access-token'),
        queryFn: async () => {
            const res = await axiosSecure(`/users/${user?.email}`)
            return res.data.role
        }
    })
    // if (!loading && !!user && !!localStorage.getItem('access-token') && !isUser) {
    //     refetch()
    // }
    return [isUser, isLoading, refetch]
};

export default useUser;