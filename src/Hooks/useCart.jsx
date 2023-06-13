import { useQuery } from "react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useCart = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: cartData = [], refetch, isLoading } = useQuery({
        queryKey: ['email', user?.email],
        enabled: !loading && !!user && !!localStorage.getItem('access-token'),
        queryFn: async () => {
            const res = await axiosSecure(`/cartData/${user.email}`)
            return res.data
        }
    })
    return [cartData, refetch, isLoading];
};

export default useCart;