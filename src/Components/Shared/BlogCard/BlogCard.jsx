import useTheme from "../../../Hooks/useTheme";


const BlogCard = ({ blog }) => {
    const { isDarkMode } = useTheme();
    return (
        <div className={`${isDarkMode ? "bg-stone-800" : "bg-base-100"} card shadow-xl`}>
            <figure><img src={blog?.blogImage} className="h-72 w-full object-cover" alt="blog image" /></figure>
            <div className="card-body">
                <h2 className="card-title">{blog.blogTitle}</h2>
                <p className="text-base">{blog.description.slice(0, 100)}...</p>
                <div className="card-actions justify-end">
                    <a className="text-primary cursor-pointer duration-100 hover:tracking-wider">Read more</a>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;