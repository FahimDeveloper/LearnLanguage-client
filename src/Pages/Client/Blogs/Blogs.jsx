import BlogCard from "../../../Components/Shared/BlogCard/BlogCard";
import Loader from "../../../Components/Shared/Loader/Loader";
import useBlogData from "../../../Hooks/useBlogData";
import useTheme from "../../../Hooks/useTheme";


const Blogs = () => {
    const { isLoading, blogs } = useBlogData();
    const { isDarkMode } = useTheme();
    if (isLoading) {
        return <Loader />
    }
    return (
        <div className={`${isDarkMode ? "bg-stone-950" : "bg-base-100"} py-10`}>
            <div className="container mx-auto space-y-10">
                <h2 className="titleStyle">all blogs</h2>
                <div className="grid grid-cols-4 gap-5">
                    {
                        blogs.map(blog => <BlogCard key={blog._id} blog={blog} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default Blogs;