import Card from "../../../../../Components/Shared/Card/Card";


const SingleLanguage = ({ courses }) => {
    return (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 xl:gap-5 lg:gap-3 md:gap-10 sm:gap-7 gap-5">
            {
                courses.slice(0, 4).map(course => <Card key={course._id} course={course} />)
            }
        </div>
    );
};

export default SingleLanguage;