import useTheme from "../../../Hooks/useTheme";


const BlogCard = ({ blog }) => {
    const { isDarkMode } = useTheme();
    return (
        <div className={`${isDarkMode ? "bg-stone-800" : "bg-base-100"} card card-compact shadow-xl`}>
            <figure><img src={blog?.blogImage} alt="blog image" /></figure>
            <div className="card-body">
                <h2 className="card-title">{blog.blogTitle}</h2>
                <p className="text-base">{blog.description.slice(0, 100)}...</p>
                <div className="card-actions justify-end">
                    <a href="#" className="text-primary duration-100 hover:tracking-wider">Read more</a>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;