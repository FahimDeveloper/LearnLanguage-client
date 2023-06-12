import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Loader from "../Components/Shared/Loader/Loader";


const AuthPrivetRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) {
        <Loader />
    }
    if (!user) {
        return children
    } else {
        return <Navigate to="/" replace={true} />
    }
};

export default AuthPrivetRoute;