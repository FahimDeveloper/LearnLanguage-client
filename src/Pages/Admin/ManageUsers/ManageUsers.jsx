import { useQuery } from "react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loader from "../../../Components/Shared/Loader/Loader";


const ManageUsers = () => {
    const [axiosSecure] = useAxiosSecure();
    const { user, loading } = useAuth();
    const { data: allUsers = [], isLoading } = useQuery({
        queryKey: ['allUserInformation', user?.email],
        enabled: !loading && !!user && !!localStorage.getItem('access-token'),
        queryFn: async () => {
            const res = await axiosSecure(`/allUsers/${user.email}`)
            return res.data
        }
    })
    if (isLoading) {
        return <Loader />
    }
    return (
        <div className="py-10 space-y-10">
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
                                            <button disabled={user.role === "instructor"} className="btn btn-primary btn-sm">Instructor</button>
                                            <button disabled={user.role === "admin"} className="btn btn-primary btn-sm">Admin</button>
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