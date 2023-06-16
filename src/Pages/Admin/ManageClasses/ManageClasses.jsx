import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Card from "./Card";
import Swal from "sweetalert2";
import { useQuery } from "react-query";
import Loader from "../../../Components/Shared/Loader/Loader";
import { useState } from "react";
import useTheme from "../../../Hooks/useTheme";

const ManageClasses = () => {
    const { isDarkMode } = useTheme();
    const [selectedId, setSelectedId] = useState('');
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: allCourse = [], isLoading, refetch } = useQuery({
        queryKey: ['allCourseData', user.email],
        queryFn: async () => {
            const res = await axiosSecure(`/allCourse/${user.email}`)
            return res.data
        }
    })
    const handleStatus = (id, status) => {
        axiosSecure.patch(`/changeStatus/${user.email}/${id}`, { status })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `The Course successfully ${status}`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }
    const handleModalFeedback = (e) => {
        e.preventDefault();
        const form = e.target;
        const feedback = form.feedback.value
        axiosSecure.put(`/giveFeedback/${user.email}/${selectedId}`, { feedback })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'feedback send successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    form.reset();
                }
            })
    }
    if (isLoading) {
        return <Loader />
    }
    return (
        <div className="py-10 space-y-16">
            <h2 className="text-4xl font-medium text-center">Manage All Course</h2>
            <div className="grid grid-cols-2 gap-3">
                {
                    allCourse.map(course => <Card key={course._id} course={course} handleStatus={handleStatus} setSelectedId={setSelectedId} />)
                }
            </div>
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <form onSubmit={handleModalFeedback} className='modal modalMargin'>
                <div className={`modal-box space-y-6 ${isDarkMode ? 'bg-stone-800 text-white' : 'bg-base-100'}`}>
                    <label htmlFor="my_modal_6" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</label>
                    <div>
                        <textarea className={`textarea textarea-bordered w-full ${isDarkMode ? 'bg-stone-900' : ''}`} name="feedback" placeholder="Enter your feedback"></textarea>
                        <button className="btn btn-primary btn-sm">send feedback</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ManageClasses;