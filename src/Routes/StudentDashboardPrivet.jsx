import { Navigate } from "react-router-dom";
import Loader from "../Components/Shared/Loader/Loader";
import useAuth from "../Hooks/useAuth";
import useUser from "../Hooks/useUser";


const StudentDashboardPrivet = ({ children }) => {
    const { user, loading, logOut } = useAuth()
    const [isUser] = useUser();
    if (loading || !isUser) {
        return <Loader />
    }
    if (user && isUser === 'student') {
        return children
    } else {
        logOut();
        if (!user) {
            return <Navigate to="/authentication" replace={true} />
        }
    }
};

export default StudentDashboardPrivet;