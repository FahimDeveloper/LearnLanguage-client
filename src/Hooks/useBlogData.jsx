import axios from 'axios';
import { useQuery } from 'react-query';

const useBlogData = () => {
    const { data: blogs = [], isLoading } = useQuery({
        queryKey: ['blogData'],
        queryFn: async () => {
            const res = await axios('https://assignment-12-server-chi-wheat.vercel.app/allBlogs');
            return res.data
        }
    });
    return { isLoading, blogs }
};

export default useBlogData;