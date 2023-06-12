import { Navigate } from "react-router-dom";
import Loader from "../Components/Shared/Loader/Loader";
import useAuth from "../Hooks/useAuth";


const PrivetRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) {
        <Loader />
    }
    if (user) {
        return children
    } else {
        return <Navigate to="/authentication" replace={true} />
    }
};

export default PrivetRoute;