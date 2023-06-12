import { } from 'react';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';

const SignUp = () => {
    const { register, handleSubmit } = useForm();
    const { signUp } = useAuth()
    const onSubmit = data => {
        if (data.password === data.confirmPassword) {
            signUp(data.userEmail, data.password).then((result) => {
                const user = result.user;
                if (user) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Successfully create an account',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            }).catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.message}`,
                })
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Password doesn't match",
            })
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
            <h2 className='text-3xl font-medium text-center mb-5'>Create new account</h2>
            <input type="text" placeholder="Enter your name" {...register("userName")} className="input input-bordered w-full" required />
            <input type="email" placeholder="Enter your email" {...register("userEmail")} className="input input-bordered w-full" required />
            <input type="password" placeholder="Enter your password" {...register("password")} className="input input-bordered w-full" required />
            <input type="password" placeholder="Confirm password" {...register("confirmPassword")} className="input input-bordered w-full" required />
            <input type="url" placeholder="image url" {...register("image")} className="input input-bordered w-full" required />
            <button className='btn btn-primary px-16 rounded-full' type='submit'>Sign up</button>
        </form>
    );
};

export default SignUp;