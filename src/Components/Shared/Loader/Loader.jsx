import { FaSpinner } from "react-icons/fa";
import useTheme from "../../../Hooks/useTheme";

const Loader = () => {
    const { isDarkMode } = useTheme();
    return (
        <div className={`${isDarkMode ? 'bg-stone-950 text-base-100' : 'bg-base-100'}`}>
            <div className="h-screen flex justify-center items-center">
                <div className="flex justify-center items-end text-6xl italic space-x-1 font-medium">
                    <p>L</p>
                    <FaSpinner className="animate-spin text-5xl text-primary" />
                    <p>ading...</p>
                </div>
            </div>
        </div>
    );
};

export default Loader;