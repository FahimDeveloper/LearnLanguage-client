import { useQuery } from "react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useCart = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: cartData = [], refetch } = useQuery({
        queryKey: ['userEmail', user?.email],
        enabled: !loading && !!user && !!localStorage.getItem('access-token'),
        queryFn: async () => {
            const res = await axiosSecure.get(`http://localhost:5000/cartData/${user.email}`)
            return res.data
        }
    })
    return [cartData, refetch];
};

export default useCart;