import { PiStudentLight, PiChalkboardTeacherLight } from "react-icons/pi";
import { GoVideo } from "react-icons/go";
import { BsFlag } from "react-icons/bs";
import ScrollTrigger from "react-scroll-trigger";
import { useState } from "react";
import CountUp from "react-countup";


const MoreInfo = () => {
    const [counterOn, setCounterOn] = useState(false)
    return (
        <div className="container mx-auto">
            <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
                <div className="grid grid-cols-4 py-5 rounded-lg">
                    <div className="text-center space-y-2 border-x-2 border-warning">
                        <PiStudentLight className="md:text-6xl text-4xl mx-auto" />
                        <h3 className="md:text-xl text-base font-semibold">Students</h3>
                        <p className="md:text-3xl text-xl font-medium">
                            {counterOn && <CountUp start={0} end={2000} duration={2} delay={0} />}
                            +
                        </p>
                    </div>
                    <div className="text-center space-y-2 border-r-2 border-warning">
                        <PiChalkboardTeacherLight className="md:text-6xl text-4xl mx-auto" />
                        <h3 className="md:text-xl text-base font-semibold">Teachers</h3>
                        <p className="md:text-3xl text-xl font-medium">
                            {counterOn && <CountUp start={0} end={100} duration={2} delay={0} />}
                            +
                        </p>
                    </div>
                    <div className="text-center space-y-2 border-r-2 border-warning">
                        <GoVideo className="md:text-6xl text-4xl mx-auto" />
                        <h3 className="md:text-xl text-base font-semibold">Course</h3>
                        <p className="md:text-3xl text-xl font-medium">
                            {counterOn && <CountUp start={0} end={50} duration={2} delay={0} />}
                            +
                        </p>
                    </div>
                    <div className="text-center space-y-2 border-r-2 border-warning">
                        <BsFlag className="md:text-6xl text-4xl mx-auto" />
                        <h3 className="md:text-xl text-base font-semibold">Language</h3>
                        <p className="md:text-3xl text-xl font-medium">
                            {counterOn && <CountUp start={0} end={50} duration={2} delay={0} />}
                            +
                        </p>
                    </div>
                </div>
            </ScrollTrigger>
        </div>
    );
};

export default MoreInfo;