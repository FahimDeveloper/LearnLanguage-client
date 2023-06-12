import { Link, NavLink } from 'react-router-dom';
import { HiShoppingCart } from "react-icons/hi2";
import useAuth from '../../../Hooks/useAuth';
import useUser from '../../../Hooks/useUser';
import useCart from '../../../Hooks/useCart';

const Navbar = () => {
    const [cartData] = useCart();
    const { user, logOut } = useAuth();
    const [isUser, isLoading] = useUser();
    return (
        <div className='bg-base-100 py-5'>
            <div className='container mx-auto flex items-center justify-between'>
                <div>
                    <h3 className='text-3xl uppercase font-bold italic'>learn language</h3>
                </div>
                <div className='text-xl font-medium flex items-center gap-5'>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/instructors">Instructors</NavLink>
                    <NavLink to="/allClasses">Classes</NavLink>
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
                    <div className="indicator">
                        <NavLink to="/allClasses"><HiShoppingCart className='text-3xl' /></NavLink>
                        <span className="badge badge-sm badge-primary indicator-item">{cartData.length}</span>
                    </div>
                </div>
                <div>
                    {
                        user ?
                            <div className='flex items-center gap-2'>
                                <button onClick={logOut} className='btn btn-primary px-5'>Logout</button>
                                <img className='w-16 h-16 rounded-full object-cover' src={user?.photoURL ? user?.photoURL : 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?cs=srgb&dl=pexels-italo-melo-2379005.jpg&fm=jpg'} alt="user image" />
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