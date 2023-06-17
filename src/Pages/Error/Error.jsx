import Lottie from "lottie-react";
import errorJson from "../../assets/error.json"
import { Link } from "react-router-dom";
import useTheme from "../../Hooks/useTheme";

const Error = () => {
    const { isDarkMode } = useTheme();
    return (
        <div className={`flex flex-col justify-center items-center h-screen w-full ${isDarkMode ? 'bg-stone-950' : 'bg-base-100'}`}>
            <Lottie animationData={errorJson} loop={true} className="w-1/3 mx-auto" />
            <Link to="/" className={`btn ${isDarkMode ? 'bg-base-100' : 'btn'}`}>Go Back</Link>
        </div>
    );
};

export default Error;