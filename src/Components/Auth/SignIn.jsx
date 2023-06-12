import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';

const SignIn = () => {
    const { signIn } = useAuth()
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        signIn(data.userEmail, data.password).then((result) => {
            const user = result.user;
            if (user) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Successfully login',
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
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
            <h2 className='text-3xl font-medium text-center mb-5'>Sign In</h2>
            <input type="email" placeholder="Enter your email" {...register("userEmail")} className="input input-bordered w-full" />
            <input type="password" placeholder="Enter your password" {...register("password")} className="input input-bordered w-full" />
            <div className="flex justify-end">
                <p className='underline cursor-pointer'>Forgot Password</p>
            </div>
            <button className='btn btn-primary px-16 rounded-full w-full' type='submit'>Login</button>
        </form>
    );
};

export default SignIn;