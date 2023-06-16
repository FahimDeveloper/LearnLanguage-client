import { Link, NavLink } from 'react-router-dom';
import { HiShoppingCart } from "react-icons/hi2";
import useAuth from '../../../Hooks/useAuth';
import useUser from '../../../Hooks/useUser';
import useCart from '../../../Hooks/useCart';
import { HiSun, HiMoon } from "react-icons/hi";
import { useState } from 'react';

const Navbar = () => {
    const [cartData] = useCart();
    const [isMoon, isSetMoon] = useState(true);
    const { user, logOut } = useAuth();
    const [isUser, isLoading] = useUser();
    return (
        <div className='bg-base-100 py-1 border-b border-gray-300 w-full sticky top-0 z-50'>
            <div className='container mx-auto flex items-center justify-between'>
                <div>
                    <h3 className='text-3xl uppercase font-bold italic'>learn language</h3>
                </div>
                <div className='text-xl font-medium flex items-center gap-5'>
                    <NavLink to="/" className={({ isActive }) => isActive ? 'active' : 'nonActive'}>Home</NavLink>
                    <NavLink to="/instructors" className={({ isActive }) => isActive ? 'active' : 'nonActive'}>Instructors</NavLink>
                    <NavLink to="/allClasses" className={({ isActive }) => isActive ? 'active' : 'nonActive'}>Classes</NavLink>
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
                    <div onClick={() => isSetMoon(!isMoon)} className='cursor-pointer'>{isMoon ? <HiSun className='text-3xl border rounded-full w-12 h-12 p-2' /> : <HiMoon className='text-3xl border rounded-full w-12 h-12 p-2' />}</div>
                    {
                        user ?
                            <div className='flex items-center gap-2'>
                                <div className="dropdown dropdown-end">
                                    <label tabIndex={0} className="avatar">
                                        <div className="w-14 rounded-full">
                                            <img className='rounded-full object-cover cursor-pointer' src={user?.photoURL ? user?.photoURL : 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?cs=srgb&dl=pexels-italo-melo-2379005.jpg&fm=jpg'} alt="user image" />
                                        </div>
                                    </label>
                                    <div tabIndex={0} className="dropdown-content card py-5 mt-3 p-2 shadow bg-base-100 rounded-box w-80">
                                        <img className='rounded-full h-24 w-24 object-contain mx-auto cursor-pointer' src={user?.photoURL ? user?.photoURL : 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?cs=srgb&dl=pexels-italo-melo-2379005.jpg&fm=jpg'} alt="user image" />
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
        </div>
    );
};

export default Navbar;