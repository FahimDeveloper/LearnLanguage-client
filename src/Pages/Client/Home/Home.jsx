import { useEffect, useState } from 'react';
import BannerSection from './Components/BannerSection/BannerSection';
import axios from 'axios';

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
        </>
    );
};

export default Home;