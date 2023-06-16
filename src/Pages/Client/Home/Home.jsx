import { useEffect, useState } from 'react';
import BannerSection from './Components/BannerSection/BannerSection';
import axios from 'axios';
import PopulerCourse from './Components/PopulerCourse/PopulerCourse';
import PopulerInstructor from './Components/PopulerInstructor/PopulerInstructor';
import TestimonialSection from './Components/TestimonialSection/TestimonialSection';

const Home = () => {
    const [instructors, setInstructors] = useState([])
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true);
        axios('https://assignment-12-server-chi-wheat.vercel.app/topInstructors')
            .then(data => {
                setInstructors(data.data)
            });
        axios('https://assignment-12-server-chi-wheat.vercel.app/topCourses')
            .then(data => {
                setLoading(false)
                setCourses(data.data)
            });
    }, [])
    return (
        <>
            <BannerSection />
            <PopulerCourse courses={courses} loading={loading} />
            <PopulerInstructor instructors={instructors} loading={loading} />
            <TestimonialSection />
        </>
    );
};

export default Home;