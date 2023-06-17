import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import Rating from "react-rating";
import { FaRegStar, FaStar } from "react-icons/fa";
import useTheme from "../../../../../Hooks/useTheme";
import { ImSpinner3 } from "react-icons/im";
import { Zoom } from "react-awesome-reveal";

const TestimonialSection = () => {
    const { isDarkMode } = useTheme();
    const [loading, setLoading] = useState(false)
    const [testimonial, setTestimonial] = useState([]);
    useEffect(() => {
        setLoading(true)
        fetch('/feedback.json')
            .then(res => res.json())
            .then(data => {
                setTestimonial(data);
                setLoading(false)
            })
    }, [])
    return (
        <div className={`${isDarkMode ? 'bg-stone-950 text-base-100' : 'bg-base-100'} sm:py-10 py-5`}>
            <div className="container mx-auto sm:space-y-10 space-y-6">
                <Zoom><h2 className="titleStyle">students feedback</h2></Zoom>
                {
                    loading ? <div className={`${isDarkMode ? 'bg-stone-950' : ''} h-96 flex justify-center items-center`}>
                        <ImSpinner3 className='animate-spin text-5xl text-primary' />
                    </div>
                        : <Marquee>
                            {
                                testimonial.map((feedback, index) => {
                                    return (
                                        <div key={index} className={`${isDarkMode ? 'bg-stone-800' : 'bg-base-100'} card card-compact sm:w-96 w-80 lg:w-[800px] h-full lg:card-side bg-base-100 mx-3 shadow-xl`}>
                                            <figure className="lg:w-2/5"><img className="lg:w-80 w-full lg:h-72 sm:h-96 h-80 object-cover" src={feedback.image} alt="feedback image" /></figure>
                                            <div className="card-body lg:w-3/5">
                                                <h2 className="card-title">{feedback.name}</h2>
                                                <p>{feedback.email}</p>
                                                <p>{feedback.feedback}</p>
                                                <div>
                                                    <Rating
                                                        className="text-2xl"
                                                        placeholderRating={feedback.rating}
                                                        emptySymbol={<FaRegStar className="text-warning" />}
                                                        placeholderSymbol={<FaStar className="text-warning" />}
                                                        fullSymbol={<FaStar className="text-warning" />}
                                                        readonly
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </Marquee >
                }
            </div>
        </div >
    );
};

export default TestimonialSection;