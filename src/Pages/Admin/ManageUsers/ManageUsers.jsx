import { useQuery } from "react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loader from "../../../Components/Shared/Loader/Loader";
import Swal from "sweetalert2";
import useTheme from "../../../Hooks/useTheme";


const ManageUsers = () => {
    const { isDarkMode } = useTheme();
    const [axiosSecure] = useAxiosSecure();
    const { user, loading } = useAuth();
    const { data: allUsers = [], isLoading, refetch } = useQuery({
        queryKey: ['allUserInformation', user?.email],
        enabled: !loading && !!user && !!localStorage.getItem('access-token'),
        queryFn: async () => {
            const res = await axiosSecure(`/allUsers/${user.email}`)
            return res.data
        }
    });
    const handleMakeRole = (id, role) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You want to make this user ${role}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, change it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/changeRole/${user.email}`, { id, role })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Successfully changed role',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }
                    })
            }
        })
    }
    if (isLoading) {
        return <Loader />
    }
    return (
        <div className="p-10 space-y-10 w-full">
            <h2 className="text-3xl font-medium text-center">Manage All Users</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead className="text-center text-sm bg-primary text-base-100">
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Role</th>
                            <th>Make Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-center text-base">
                        {
                            allUsers.map((user, index) => {
                                return (
                                    <tr key={user._id}>
                                        <th>{index + 1}</th>
                                        <td>
                                            <div className="avatar">
                                                <div className="mask rounded-full w-14 h-14">
                                                    <img src={user.image} alt="user image" />
                                                </div>
                                            </div>
                                        </td>
                                        <td>{user.userName}</td>
                                        <td>{user.userEmail}</td>
                                        <td>{user.role}</td>
                                        <td className="space-x-3">
                                            <button onClick={() => handleMakeRole(user._id, 'instructor')} disabled={user.role === "instructor"} className={`btn btn-primary btn-sm ${user.role === "instructor" ? `disabled ${isDarkMode ? 'disabled:bg-stone-700 disabled:text-base-100' : 'disabled:bg-stone-200 disabled:text-stone-900'}` : ''}`}>Instructor</button>
                                            <button onClick={() => handleMakeRole(user._id, 'admin')} disabled={user.role === "admin"} className={`btn btn-primary btn-sm ${user.role === "admin" ? `disabled ${isDarkMode ? 'disabled:bg-stone-700 disabled:text-base-100' : 'disabled:bg-stone-200 disabled:text-stone-900'}` : ''}`}>Admin</button>
                                        </td>
                                        <th>
                                            <button className="btn btn-error rounded-full btn-sm">delte user</button>
                                        </th>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;