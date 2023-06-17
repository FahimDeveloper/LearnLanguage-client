import { Link } from "react-router-dom";
import useTheme from "../../../Hooks/useTheme";
import logo from "../../../assets/images/logo.png"
import { FaFacebook, FaTwitter, FaYoutube, FaInstagram, FaRegCopyright } from "react-icons/fa";


const Footer = () => {
    const { isDarkMode } = useTheme();
    return (
        <div className={`${isDarkMode ? 'bg-stone-800 text-base-100' : 'bg-base-200 text-base-content'}`}>
            <footer className='footer grid-flow-row lg:grid-cols-6 sm:grid-cols-2 gap-5 items-center container mx-auto px-10 pt-10'>
                <div className="lg:col-span-2">
                    <div className="flex items-center">
                        <img src={logo} alt="logo" className='w-20 object-cover' />
                        <h3 className='text-3xl font-bold italic'>World <span className='text-primary'>Talk</span></h3>
                    </div>
                    <p>Sit amet conse ctetur adipisicing elit, sed doe eiusmod tempor incididunt ut laborea aaaeht dolore magna aliqua.</p>
                    <div className="flex items-center gap-3 text-3xl">
                        <FaFacebook />
                        <FaTwitter />
                        <FaInstagram />
                        <FaYoutube />
                    </div>
                </div>
                <div>
                    <span className="footer-title">Quick Links</span>
                    <Link to="/" className="link link-hover">Home</Link>
                    <Link to="/instructors" className="link link-hover">Instructors</Link>
                    <Link to="/allClasses" className="link link-hover">All Classes</Link>
                    <Link to="/blog" className="link link-hover">Blog</Link>
                </div>
                <div>
                    <span className="footer-title">Legal</span>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </div>
                <div className="lg:col-span-2">
                    <span className="footer-title">Newsletter</span>
                    <div className="form-control">
                        <label className="label">
                            <span className={`${isDarkMode ? 'text-base-100' : 'text-black'} label-text`}>Enter your email address</span>
                        </label>
                        <div className="space-y-2">
                            <input type="text" placeholder="username@site.com" className="input input-bordered w-full" />
                            <button className="btn btn-primary btn-sm capitalize">Subscribe</button>
                        </div>
                    </div>
                </div>
            </footer >
            <div className="flex justify-center gap-2 py-5">
                <FaRegCopyright className="text-xl" />
                Tuohidul Islam Fahim @2023
            </div>
        </div>
    );
};

export default Footer;