import Card from "../../../../../Components/Shared/Card/Card";


const SingleLanguage = ({ courses }) => {
    return (
        <div className="grid grid-cols-4 gap-5">
            {
                courses.map(course => <Card key={course._id} course={course} />)
            }
        </div>
    );
};

export default SingleLanguage;