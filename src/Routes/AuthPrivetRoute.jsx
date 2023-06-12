import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";


const AuthPrivetRoute = ({ children }) => {
    const { user } = useAuth();
    if (!user) {
        return children
    } else {
        return <Navigate to="/" replace={true} />
    }
};

export default AuthPrivetRoute;