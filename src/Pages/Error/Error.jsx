import Lottie from "lottie-react";
import errorJson from "../../assets/error.json"
import { Link } from "react-router-dom";

const Error = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <Lottie animationData={errorJson} loop={true} className="w-1/3 mx-auto" />
            <Link to="/" className="btn btn-secondary">Go Back</Link>
        </div>
    );
};

export default Error;