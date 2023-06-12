import { } from 'react';
import { NavLink } from 'react-router-dom';
import useUser from '../Hooks/useUser';

const Dashboard = () => {
    const [isUser] = useUser();
    return (
        <div className='container mx-auto'>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <div className="p-4 w-80 h-full bg-blue-100 text-base-content text-xl flex flex-col gap-2">
                        {
                            isUser === "admin" ?
                                <>
                                    <NavLink className="p-2 rounded-lg bg-zinc-50">Manage Classes</NavLink>
                                    <NavLink className="p-2 rounded-lg bg-zinc-50">Manage Users</NavLink>
                                </>
                                : isUser === "instructor" ?
                                    <>
                                        <NavLink className="p-2 rounded-lg bg-zinc-50">Add Class</NavLink>
                                        <NavLink className="p-2 rounded-lg bg-zinc-50">My Class</NavLink>
                                    </>
                                    :
                                    <>
                                        <NavLink className="p-2 rounded-lg bg-zinc-50">My Selected Class</NavLink>
                                        <NavLink className="p-2 rounded-lg bg-zinc-50">My Enrolled Class</NavLink>
                                        <NavLink className="p-2 rounded-lg bg-zinc-50">Payment History</NavLink>
                                    </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;