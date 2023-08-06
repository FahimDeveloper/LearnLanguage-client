import axios from "axios";
import { useQuery } from "react-query";


const useAllCourse = () => {
    const { data: courses = [], isLoading } = useQuery({
        queryKey: ['courseData'],
        queryFn: async () => {
            const res = await axios('https://assignment-12-server-chi-wheat.vercel.app/courses');
            return res.data
        }
    });
    return { isLoading, courses }
};

export default useAllCourse;