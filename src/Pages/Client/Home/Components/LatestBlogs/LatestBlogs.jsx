import BlogCard from "../../../../../Components/Shared/BlogCard/BlogCard";
import useBlogData from "../../../../../Hooks/useBlogData";
import { ImSpinner3 } from "react-icons/im";
import useTheme from "../../../../../Hooks/useTheme";
import { Link } from "react-router-dom";

const LatestBlogs = () => {
    const { isDarkMode } = useTheme()
    const { isLoading, blogs } = useBlogData();
    if (isLoading) {
        return <ImSpinner3 className='animate-spin text-5xl text-primary' />
    }
    return (
        <div className={`${isDarkMode ? "bg-stone-950 text-base-100" : "bg-base-100"}`}>
            <div className="container mx-auto py-5 space-y-10">
                <h2 className="titleStyle">Latest blog & articles</h2>
                <div className="grid lg:grid-cols-4 sm:grid-cols-2 xl:gap-5 lg:gap-3 md:gap-10 sm:gap-7 gap-5">
                    {
                        blogs.slice(0, 4).map(blog => <BlogCard key={blog._id} blog={blog} />)
                    }
                </div>
                <div className="text-center">
                    <Link to="blogs"><button className="btn btn-primary px-10">see more</button></Link>
                </div>
            </div>
        </div>
    );
};

export default LatestBlogs;