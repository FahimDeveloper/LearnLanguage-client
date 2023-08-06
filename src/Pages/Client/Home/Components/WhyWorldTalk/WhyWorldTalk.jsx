import useTheme from "../../../../../Hooks/useTheme";
import Lottie from "lottie-react";
import animation from "../../../../../assets/ChooseUsAnimation.json"
import { PiCertificateLight, PiStarThin } from 'react-icons/pi';
import { MdSupportAgent } from 'react-icons/md';
import { IoNewspaperOutline } from 'react-icons/io5';

const WhyWorldTalk = () => {
    const { isDarkMode } = useTheme();
    return (
        <div className={`${isDarkMode ? 'bg-stone-950 text-base-100' : 'bg-base-100'} py-5 space-y-10`}>
            <h2 className="titleStyle">Why people choose us</h2>
            <div className="container mx-auto grid grid-cols-2 gap-5 items-center">
                <div>
                    <Lottie animationData={animation} loop={true} />
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <div className={`${isDarkMode ? 'bg-stone-800 text-base-100' : 'bg-base-100'} chooseCard mt-5`}>
                        <div className="card-body text-center">
                            <div className="chooseLogo">
                                <PiCertificateLight className="text-6xl" />
                            </div>
                            <h2 className="text-3xl">Certification</h2>
                            <p>Get certification from a respected organization</p>
                        </div>
                    </div>
                    <div className={`${isDarkMode ? 'bg-stone-800 text-base-100' : 'bg-base-100'} chooseCard`}>
                        <div className="card-body text-center">
                            <div className="chooseLogo">
                                <IoNewspaperOutline className="text-6xl" />
                            </div>
                            <h2 className="text-3xl">Teaching Materials</h2>
                            <p>Use modern learning materials for over 15 language courses</p>
                        </div>
                    </div>
                    <div className={`${isDarkMode ? 'bg-stone-800 text-base-100' : 'bg-base-100'} chooseCard`}>
                        <div className="card-body text-center">
                            <div className="chooseLogo">
                                <PiStarThin className="text-6xl" />
                            </div>
                            <h2 className="text-3xl">Career Upgrade</h2>
                            <p>Enhance your professional and academic CV as you travel the world</p>
                        </div>
                    </div>
                    <div className={`${isDarkMode ? 'bg-stone-800 text-base-100' : 'bg-base-100'} chooseCard -mt-5`}>
                        <div className="card-body text-center">
                            <div className="chooseLogo">
                                <MdSupportAgent className="text-6xl" />
                            </div>
                            <h2 className="text-3xl">support</h2>
                            <p>24/7 we given support our every students for better learning</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default WhyWorldTalk;