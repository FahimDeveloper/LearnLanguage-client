import { useEffect, useState } from 'react';
import BannerSection from './Components/BannerSection/BannerSection';
import axios from 'axios';
import PopulerCourse from './Components/PopulerCourse/PopulerCourse';
import PopulerInstructor from './Components/PopulerInstructor/PopulerInstructor';
import TestimonialSection from './Components/TestimonialSection/TestimonialSection';

const Home = () => {
    const [instructors, setInstructors] = useState([])
    const [courses, setCourses] = useState([])
    useEffect(() => {
        axios('https://assignment-12-server-chi-wheat.vercel.app/topInstructors')
            .then(data => {
                setInstructors(data.data)
            });
        axios('https://assignment-12-server-chi-wheat.vercel.app/topCourses')
            .then(data => {
                setCourses(data.data)
            });
    }, [])
    return (
        <>
            <BannerSection />
            <PopulerCourse courses={courses} />
            <PopulerInstructor instructors={instructors} />
            <TestimonialSection />
        </>
    );
};

export default Home;