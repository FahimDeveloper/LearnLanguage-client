import { Navigate } from "react-router-dom";
import Loader from "../Components/Shared/Loader/Loader";
import useAuth from "../Hooks/useAuth";
import useUser from "../Hooks/useUser";


const AdminDashboardPrivet = ({ children }) => {
    const { user, loading, logOut } = useAuth()
    const [isUser, isLoading] = useUser();
    if (loading || isLoading) {
        return <Loader />
    }
    if (user && isUser === 'admin') {
        return children
    } else {
        console.log('hello')
        logOut();
        if (!user) {
            return <Navigate to="/authentication" replace={true} />
        }
    }
};

export default AdminDashboardPrivet;