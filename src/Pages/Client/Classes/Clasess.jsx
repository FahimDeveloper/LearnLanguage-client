import Card from '../../../Components/Shared/Card/Card';
import { useQuery } from 'react-query';
import axios from 'axios';
import Loader from '../../../Components/Shared/Loader/Loader';
import useTheme from '../../../Hooks/useTheme';
import useTitlle from '../../../Hooks/useTitlle';

const Clasess = () => {
    const { isDarkMode } = useTheme();
    const { data: courses = [], isLoading } = useQuery({
        queryKey: ['instructorData'],
        queryFn: async () => {
            const res = await axios('https://assignment-12-server-chi-wheat.vercel.app/courses');
            return res.data
        }
    })
    useTitlle('All Class');
    if (isLoading) {
        return <Loader />
    }
    return (
        <div className={`${isDarkMode ? 'bg-stone-950 text-base-100' : 'bg-base-100'}`}>
            <div className='container mx-auto py-10 space-y-16'>
                <h2 className='titleStyle'>All Courses</h2>
                <div className='grid grid-cols-4 gap-5'>
                    {
                        courses.map(course => <Card key={course._id} course={course} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default Clasess;