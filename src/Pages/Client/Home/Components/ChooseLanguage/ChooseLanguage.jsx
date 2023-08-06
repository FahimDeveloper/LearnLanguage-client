import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import SingleLanguage from './SingleLanguage';

const ChooseLanguage = ({ languages }) => {
    const english = languages.filter(course => course.languageName === "English")
    const spanish = languages.filter(course => course.languageName === "Spanish")
    const german = languages.filter(course => course.languageName === "German")
    const chinese = languages.filter(course => course.languageName === "Chinese")
    const arabic = languages.filter(course => course.languageName === "Arabic")
    const russian = languages.filter(course => course.languageName === "Russian")
    return (
        <div className='container mx-auto py-5 space-y-10'>
            <h2 className='titleStyle'>Choose your best language</h2>
            <div>
                <Tabs>
                    <TabList className="react-tabs__tab-list text-center">
                        <Tab>English</Tab>
                        <Tab>Spanish</Tab>
                        <Tab>German</Tab>
                        <Tab>Chinese</Tab>
                        <Tab>Arabic</Tab>
                        <Tab>Russian</Tab>
                    </TabList>
                    <TabPanel><SingleLanguage courses={english} /></TabPanel>
                    <TabPanel><SingleLanguage courses={spanish} /></TabPanel>
                    <TabPanel><SingleLanguage courses={german} /></TabPanel>
                    <TabPanel><SingleLanguage courses={chinese} /></TabPanel>
                    <TabPanel><SingleLanguage courses={arabic} /></TabPanel>
                    <TabPanel><SingleLanguage courses={russian} /></TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default ChooseLanguage;