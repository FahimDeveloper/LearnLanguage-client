import { Link, NavLink } from 'react-router-dom';
import { HiShoppingCart } from "react-icons/hi2";
import useAuth from '../../../Hooks/useAuth';
import useUser from '../../../Hooks/useUser';
import useCart from '../../../Hooks/useCart';
import { HiSun, HiMoon } from "react-icons/hi";
import { useState } from 'react';
import logo from '../../../assets/images/logo.png'
import { HiBars3CenterLeft } from "react-icons/hi2";
import useTheme from '../../../Hooks/useTheme';
import { useEffect } from 'react';

const Navbar = () => {
    const { toggleTheme, isDarkMode } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [cartData] = useCart();
    const { user, logOut } = useAuth();
    const [isUser, isLoading, refetch] = useUser();
    useEffect(() => {
        if (user?.email && !isLoading && isUser) {
            refetch();
        }
    }, [user, isUser, isLoading, refetch])
    return (
        <div className={`${isDarkMode ? ' bg-stone-950 text-base-100' : 'bg-base-100 border-b'} py-1 border-gray-300 w-full sticky top-0 z-50`}>
            <div className='container mx-auto flex items-center justify-between'>
                <div onClick={() => setIsOpen(!isOpen)} className='border rounded px-2 py-1 lg:hidden flex'>
                    <HiBars3CenterLeft className='text-2xl' />
                </div>
                <div className='flex items-center'>
                    <img className='w-16 h-16' src={logo} alt="" />
                    <h3 className='text-3xl capitalize font-bold italic sm:flex hidden'><span className='text-primary'>world</span> talk</h3>
                </div>
                <div className='text-xl font-medium lg:flex hidden items-center gap-7'>
                    <NavLink to="/" className={({ isActive }) => isActive ? 'active' : 'nonActive'}>Home</NavLink>
                    <NavLink to="/courses" className={({ isActive }) => isActive ? 'active' : 'nonActive'}>Courses</NavLink>
                    <NavLink to="/contactUs" className={({ isActive }) => isActive ? 'active' : 'nonActive'}>Contact us</NavLink>
                    <NavLink to="/blogs" className={({ isActive }) => isActive ? 'active' : 'nonActive'}>Blogs</NavLink>
                    {
                        user && !isLoading ?
                            <NavLink
                                to={
                                    isUser === "admin" ? "/dashboard/admin/manageClasses" : isUser === "instructor" ? "/dashboard/instructor/addClass" : '/dashboard/enrolledClasses'
                                } className={({ isActive }) => isActive ? 'active' : 'nonActive'}>
                                Dashboard
                            </NavLink>
                            : ''
                    }
                    {
                        isUser === "student" ?
                            <div className="indicator">
                                <Link to="/dashboard/selectedClasses"><HiShoppingCart className='text-3xl' /></Link>
                                {
                                    cartData.length > 0 && <span className="badge badge-sm badge-primary indicator-item">{cartData.length}</span>
                                }
                            </div>
                            : ''
                    }
                </div>
                <div className='flex items-center gap-3'>
                    <div onClick={toggleTheme} className='cursor-pointer'>{isDarkMode ? <HiMoon className='text-2xl border rounded-full w-10 h-10 p-2' /> : <HiSun className='text-2xl border rounded-full w-10 h-10 p-2' />}</div>
                    {
                        user ?
                            <div className='flex items-center gap-2'>
                                <div className="dropdown dropdown-end">
                                    <label tabIndex={0} className="avatar">
                                        <div className="w-14 rounded-full">
                                            <img className='rounded-full object-cover cursor-pointer' src={user?.photoURL ? user?.photoURL : 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?cs=srgb&dl=pexels-italo-melo-2379005.jpg&fm=jpg'} alt="user image" />
                                        </div>
                                    </label>
                                    <div tabIndex={0} className={`dropdown-content card py-5 mt-3 p-2 shadow bg-base-100 rounded-box w-80 ${isDarkMode ? 'bg-stone-800' : 'bg-base-100'}`}>
                                        <img className='rounded-full h-24 w-24 object-cover mx-auto cursor-pointer' src={user?.photoURL ? user?.photoURL : 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?cs=srgb&dl=pexels-italo-melo-2379005.jpg&fm=jpg'} alt="user image" />
                                        <div className='text-center space-y-1'>
                                            <h3 className='text-xl font-medium'>{user.displayName}</h3>
                                            <p className='text-sm'>{user.email}</p>
                                            <button onClick={logOut} className='btn btn-primary w-24 btn-sm'>Logout</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : <Link to="/authentication">
                                <button className='btn btn-primary px-10'>login</button>
                            </Link>
                    }
                </div>
            </div>
            {
                isOpen ? <div onClick={() => setIsOpen(!isOpen)} className={`${isDarkMode ? 'bg-stone-950' : "bg-base-100"} text-xl font-medium lg:hidden flex flex-col items-center gap-5 py-6 absolute w-full`}>
                    <NavLink to="/" className={({ isActive }) => isActive ? 'active' : 'nonActive'}>Home</NavLink>
                    <NavLink to="/courses" className={({ isActive }) => isActive ? 'active' : 'nonActive'}>Courses</NavLink>
                    {
                        user && !isLoading ?
                            <NavLink
                                to={
                                    isUser === "admin" ? "/dashboard/admin/manageClasses" : isUser === "instructor" ? "/dashboard/instructor/addClass" : '/dashboard/enrolledClasses'
                                }>
                                Dashboard
                            </NavLink>
                            : ''
                    }
                    <NavLink to="/contactUs" className={({ isActive }) => isActive ? 'active' : 'nonActive'}>Contact us</NavLink>
                    <NavLink to="/blogs" className={({ isActive }) => isActive ? 'active' : 'nonActive'}>Blogs</NavLink>
                    {
                        isUser === "student" ?
                            <div className="indicator">
                                <Link to="/dashboard/selectedClasses"><HiShoppingCart className='text-3xl' /></Link>
                                {
                                    cartData.length > 0 && <span className="badge badge-sm badge-primary indicator-item">{cartData.length}</span>
                                }
                            </div>
                            : ''
                    }
                </div> : ''
            }
        </div>
    );
};

export default Navbar;