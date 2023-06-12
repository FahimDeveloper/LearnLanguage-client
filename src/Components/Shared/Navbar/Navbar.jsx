import { Link, NavLink } from 'react-router-dom';
import { HiShoppingCart } from "react-icons/hi2";

const Navbar = () => {
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
                    <NavLink to="/allClasses"><HiShoppingCart className='text-3xl' /></NavLink>
                </div>
                <div>
                    <Link to="/authentication">
                        <button className='btn btn-primary px-10'>login</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;