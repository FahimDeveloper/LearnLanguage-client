import { FaSpinner } from "react-icons/fa";

const Loader = () => {
    return (
        <div className="h-screen flex justify-center items-center">
            <div className="flex justify-center items-end text-6xl italic space-x-1 font-medium">
                <p>L</p>
                <FaSpinner className="animate-spin text-5xl text-primary" />
                <p>ading...</p>
            </div>
        </div>
    );
};

export default Loader;