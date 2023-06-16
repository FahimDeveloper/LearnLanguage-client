import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import Rating from "react-rating";
import { FaRegStar, FaStar } from "react-icons/fa";

const TestimonialSection = () => {
    const [testimonial, setTestimonial] = useState([]);
    useEffect(() => {
        fetch('/feedback.json')
            .then(res => res.json())
            .then(data => setTestimonial(data))
    }, [])
    return (
        <div className="container mx-auto py-10 space-y-14">
            <h2 className="titleStyle">students feedback</h2>
            <Marquee>
                {
                    testimonial.map((feedback, index) => {
                        return (
                            <div key={index} className="card card-compact w-96 lg:w-[800px] h-full lg:card-side bg-base-100 mx-3 shadow-xl">
                                <figure className="lg:w-2/5"><img className="lg:w-80 w-full lg:h-72 h-96 object-cover" src={feedback.image} alt="feedback image" /></figure>
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
            </Marquee>
        </div>
    );
};

export default TestimonialSection;