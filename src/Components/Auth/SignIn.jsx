import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import useTheme from "../../Hooks/useTheme";
import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import useTitlle from "../../Hooks/useTitlle";

const SignIn = ({ setLoading }) => {
    const [showPass, setShowPass] = useState(false);
    const { isDarkMode } = useTheme();
    const { signIn, showError } = useAuth()
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        setLoading(true)
        signIn(data.userEmail, data.password).then((result) => {
            const user = result.user;
            if (user) {
                setLoading(false)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Successfully login',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }).catch(error => {
            setLoading(false)
            showError(error.message)
        })
    }
    useTitlle('Login');
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
            <h2 className='text-3xl font-medium text-center mb-5'>Sign In</h2>
            <input type="email" placeholder="Enter your email" {...register("userEmail")} className={`${isDarkMode ? 'text-stone-600' : ''} input input-bordered w-full`} />
            <div className="relative">
                <input type={`${showPass ? 'text' : 'password'}`} placeholder="Enter your password" {...register("password")} className={`${isDarkMode ? 'text-stone-600' : ''} input input-bordered w-full z-10`} />
                <div className="absolute top-4 right-2 z-50 text-black text-xl" onClick={() => setShowPass(!showPass)}>
                    {
                        showPass ?
                            <FaEye />
                            : <FaEyeSlash />
                    }
                </div>
            </div>
            <div className="flex justify-end">
                <p className='underline cursor-pointer'>Forgot Password</p>
            </div>
            <button className='btn btn-primary px-16 rounded-full w-full' type='submit'>Login</button>
        </form>
    );
};

export default SignIn;