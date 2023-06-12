import axios from "axios";
import useAuth from "./useAuth";
import { useQuery } from "react-query";

const useUser = () => {
    const { user, loading } = useAuth();
    const { data: isUser } = useQuery({
        queryKey: ['userEmail', user.email],
        enabled: !loading && !!user,
        queryFn: async () => {
            const res = await axios(`http://localhost:5000/users/${user.email}`)
            return res.data.role
        }
    })
    return [isUser]
};

export default useUser;