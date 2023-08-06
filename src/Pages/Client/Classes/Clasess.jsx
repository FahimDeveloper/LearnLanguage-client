import Card from '../../../Components/Shared/Card/Card';
import Loader from '../../../Components/Shared/Loader/Loader';
import useTheme from '../../../Hooks/useTheme';
import useTitlle from '../../../Hooks/useTitlle';
import useAllCourse from '../../../Hooks/useAllCourse';

const Clasess = () => {
    const { isDarkMode } = useTheme();
    const { isLoading, courses } = useAllCourse()
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