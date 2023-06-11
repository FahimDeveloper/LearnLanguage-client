import { useEffect, useState } from 'react';
import BannerSection from './Components/BannerSection/BannerSection';
import axios from 'axios';
import PopulerCourse from './Components/PopulerCourse/PopulerCourse';
import PopulerInstructor from './Components/PopulerInstructor/PopulerInstructor';

const Home = () => {
    const [instructor, setInstructor] = useState([])
    const [courses, setCourses] = useState([])
    useEffect(() => {
        axios('http://localhost:5000/users')
            .then(data => {
                setInstructor(data.data)
            });
        axios('http://localhost:5000/courses')
            .then(data => {
                setCourses(data.data)
            });
    }, [])
    return (
        <>
            <BannerSection />
            <PopulerCourse courses={courses} />
            <PopulerInstructor instructor={instructor} />
        </>
    );
};

export default Home;