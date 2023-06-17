import { Link, NavLink, Outlet, ScrollRestoration } from 'react-router-dom';
import useUser from '../Hooks/useUser';
import Loader from '../Components/Shared/Loader/Loader';
import { FaHome, FaUserGraduate, FaHistory } from "react-icons/fa";
import { IoBookSharp } from "react-icons/io5";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { ImBooks } from "react-icons/im";
import useAuth from '../Hooks/useAuth';
import useTheme from '../Hooks/useTheme';

const Dashboard = () => {
    const { isDarkMode } = useTheme();
    const { user, logOut } = useAuth();
    const [isUser, isLoading] = useUser();
    if (isLoading) {
        return <Loader />
    }
    return (
        <div className={`${isDarkMode ? 'bg-stone-950 text-base-100' : 'bg-base-100'}`}>
            <div className='container mx-auto'>
                <div className="drawer lg:drawer-open">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        <div className='flex justify-center'>
                            <Outlet />
                            <ScrollRestoration />
                        </div>
                        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                        <div className={`p-4 w-80 h-full text-base-content text-lg flex flex-col gap-5 ${isDarkMode ? 'bg-stone-800 text-zinc-100' : 'bg-blue-100'}`}>
                            <div className='text-center space-y-5'>
                                <h3 className='text-2xl capitalize font-medium'>{isUser} Dashboard</h3>
                                <div className={`${isDarkMode ? 'bg-stone-700' : 'bg-slate-50'} card card-compact py-5 w-72 bg-slate-50 shadow-xl`}>
                                    <div className="text-center space-y-1">
                                        <img src={user?.photoURL} className='w-24 h-24 object-cover rounded-full mx-auto' alt="user image" />
                                        <h2 className="text-lg">{user?.displayName}</h2>
                                        <p className='text-sm'>{user?.email}</p>
                                        <button onClick={logOut} className="btn btn-primary btn-sm w-24">log out</button>
                                    </div>
                                </div>
                            </div>
                            <div className='space-y-1'>
                                {
                                    isUser === "admin" ?
                                        <>
                                            <NavLink to="/dashboard/admin/manageClasses" className={({ isActive }) => isActive ? 'activeDash' : 'disActive'}>Manage Classes</NavLink>
                                            <NavLink to="/dashboard/admin/manageUsers" className={({ isActive }) => isActive ? 'activeDash' : 'disActive'}>Manage Users</NavLink>
                                        </>
                                        : isUser === "instructor" ?
                                            <>
                                                <NavLink to="/dashboard/instructor/addClass" className={({ isActive }) => isActive ? 'activeDash' : 'disActive'}>Add Class</NavLink>
                                                <NavLink to="/dashboard/instructor/myClasses" className={({ isActive }) => isActive ? 'activeDash' : 'disActive'}>My Class</NavLink>
                                            </>
                                            :
                                            <>
                                                <NavLink to="/dashboard/enrolledClasses" className={({ isActive }) => isActive ? 'activeDash' : 'disActive'}><BsBookmarkCheckFill /> My Enrolled Class</NavLink>
                                                <NavLink to="/dashboard/selectedClasses" className={({ isActive }) => isActive ? 'activeDash' : 'disActive'}><ImBooks /> My Selected Class</NavLink>
                                                <NavLink to="/dashboard/paymentHistory" className={({ isActive }) => isActive ? 'activeDash' : 'disActive'}><FaHistory /> Payment History</NavLink>
                                            </>
                                }
                            </div>
                            <hr className='border border-gray-500' />
                            <div className='space-y-1'>
                                <Link to="/" className='disActive'><FaHome /> Home</Link>
                                <Link to="/instructors" className='disActive'><FaUserGraduate /> Instructors</Link>
                                <Link to="/allClasses" className='disActive'> <IoBookSharp /> Classes</Link >
                            </div >
                        </div >
                    </div >
                </div >
            </div >
        </div>
    );
};

export default Dashboard;