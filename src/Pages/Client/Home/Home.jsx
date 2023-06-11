import { useEffect, useState } from 'react';
import BannerSection from './Components/BannerSection/BannerSection';
import axios from 'axios';
import PopulerCourse from './Components/PopulerCourse/PopulerCourse';
import PopulerInstructor from './Components/PopulerInstructor/PopulerInstructor';

const Home = () => {
    const [instructors, setInstructors] = useState([])
    const [courses, setCourses] = useState([])
    useEffect(() => {
        axios('http://localhost:5000/topInstructors')
            .then(data => {
                setInstructors(data.data)
            });
        axios('http://localhost:5000/topCourses')
            .then(data => {
                setCourses(data.data)
            });
    }, [])
    return (
        <>
            <BannerSection />
            <PopulerCourse courses={courses} />
            <PopulerInstructor instructors={instructors} />
        </>
    );
};

export default Home;