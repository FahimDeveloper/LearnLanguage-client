import useAuth from "../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";
import Loader from "../../../Components/Shared/Loader/Loader";


const AddClass = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const [axiosSecure] = useAxiosSecure();
    const onSubmit = data => {
        setLoading(true)
        const uploadkey = import.meta.env.VITE_IMAGE_UPLOAD_KEY;
        const formData = new FormData();
        formData.append('image', data.courseBanner[0]);
        fetch(`https://api.imgbb.com/1/upload?key=${uploadkey}`, {
            method: 'POST',
            body: formData
        }).then(res => res.json()).then(imgResponse => {
            const imgURL = imgResponse.data.display_url;
            data.courseBanner = imgURL;
            data.price = parseFloat(data.price);
            data.courseDuration = parseFloat(data.courseDuration);
            data.availableSeat = parseInt(data.availableSeat);
            data.date = new Date();
            data.status = 'pending';
            data.feedback = '';
            data.students = 0;
            axiosSecure.post(`/addCourse/${user.email}`, data)
                .then(data => {
                    if (data.data.insertedId) {
                        setLoading(false)
                        Swal.fire({
                            icon: 'info',
                            title: 'success',
                            text: 'Your course successfully added, now waiting for approved',
                        })
                        reset();
                    }
                })
        })
    };
    if (loading) {
        return <Loader />
    }
    return (
        <div className="h-screen flex items-center">
            <form onSubmit={handleSubmit(onSubmit)} className="border border-primary p-10 rounded-xl">
                <h2 className="text-4xl font-medium text-center">Add New Class</h2>
                <div className="space-y-2">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-base">Class Name</span>
                        </label>
                        <input type="text" placeholder="Type here" {...register('courseName')} className="input input-bordered w-full my-0" required />
                    </div>
                    <div className="w-full flex gap-1">
                        <div>
                            <label className="label">
                                <span className="label-text text-base">Class image</span>
                            </label>
                            <input type="file" {...register('courseBanner')} className="file-input file-input-bordered w-96 my-0" required />
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text text-base">Course Price</span>
                            </label>
                            <input type="text" placeholder="Type here" {...register('price')} className="input input-bordered w-96 my-0" required />
                        </div>
                    </div>
                    <div className="w-full flex gap-1">
                        <div>
                            <label className="label">
                                <span className="label-text text-base">Instructor Name</span>
                            </label>
                            <input type="text" defaultValue={user?.displayName} {...register('instructorName')} readOnly placeholder="Type here" className="input input-bordered w-96 my-0" required />
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text text-base">Instructor email</span>
                            </label>
                            <input type="email" defaultValue={user?.email} {...register('instructorEmail')} readOnly placeholder="Type here" className="input input-bordered w-96 my-0" required />
                        </div>
                    </div>
                    <div className="w-full flex gap-1">
                        <div>
                            <label className="label">
                                <span className="label-text text-base">Available Seat</span>
                            </label>
                            <select {...register('availableSeat')} defaultValue="50" className="select select-bordered w-96 my-0">
                                <option>50</option>
                                <option>100</option>
                                <option>300</option>
                                <option>500</option>
                                <option>1000</option>
                            </select>
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text text-base">Total Hour</span>
                            </label>
                            <input type="text" placeholder="Type here" {...register('courseDuration')} className="input input-bordered w-96 my-0" required />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-base">Course Description</span>
                        </label>
                        <textarea className="textarea textarea-bordered" {...register('description')} placeholder="Type here" required></textarea>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary w-full mt-4">Add Corse</button>
            </form>
        </div>
    );
};

export default AddClass;