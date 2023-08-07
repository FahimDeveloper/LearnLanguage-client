import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import SingleLanguage from './SingleLanguage';
import useAllCourse from '../../../../../Hooks/useAllCourse';
import { ImSpinner3 } from "react-icons/im";
import useTheme from '../../../../../Hooks/useTheme';
import { Link } from 'react-router-dom';

const ChooseLanguage = () => {
    const { isLoading, courses } = useAllCourse();
    const { isDarkMode } = useTheme();
    const beginner = courses.filter(course => course.courseFor === "Beginner")
    const intermediate = courses.filter(course => course.courseFor === "Intermediate")
    if (isLoading) {
        return <ImSpinner3 className='animate-spin text-5xl text-primary' />
    }
    return (
        <div className={`${isDarkMode ? "bg-stone-950 text-base-100" : "bg-base-100"}`}>
            <div className='container mx-auto py-5 space-y-10'>
                <h2 className='titleStyle'>Choose your best language</h2>
                <div>
                    <Tabs>
                        <TabList className="react-tabs__tab-list text-center">
                            <Tab>Beginner</Tab>
                            <Tab>Intermediate</Tab>
                        </TabList>
                        <TabPanel><SingleLanguage courses={beginner} /></TabPanel>
                        <TabPanel><SingleLanguage courses={intermediate} /></TabPanel>
                    </Tabs>
                </div>
                <div className='text-center'>
                    <Link to="/courses"><button className='btn btn-primary px-10'>see all course</button></Link>
                </div>
            </div>
        </div>
    );
};

export default ChooseLanguage;