import { useState } from 'react';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import { updateProfile } from 'firebase/auth';
import axios from 'axios';
import useTheme from '../../Hooks/useTheme';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useTitlle from '../../Hooks/useTitlle';

const SignUp = ({ setLoading }) => {
    const [showPass, setShowPass] = useState(false)
    const [showCmPass, setShowCmPass] = useState(false);
    const { isDarkMode } = useTheme();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signUp, showError } = useAuth()
    const onSubmit = data => {
        if (data.password === data.confirmPassword) {
            setLoading(true)
            signUp(data.userEmail, data.password).then((result) => {
                const user = result.user;
                if (user) {
                    updateProfile(user, {
                        displayName: data.userName, photoURL: data.image
                    }).then(() => {
                        const userData = {
                            userName: data.userName,
                            userEmail: data.userEmail,
                            image: data.image,
                            role: 'student',
                            user: user,
                        }
                        axios.post(`https://assignment-12-server-chi-wheat.vercel.app/addUser/`, userData)
                            .then(data => {
                                if (data.data.insertedId) {
                                    setLoading(false)
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: 'Successfully create an account',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                }
                            }).catch(error => {
                                setLoading(false)
                                showError(error.message)
                            })
                    }).catch(error => {
                        setLoading(false)
                        showError(error.message)
                    })
                }
            }).catch(error => {
                setLoading(false)
                showError(error.message)
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Password doesn't match",
            })
        }
    }
    useTitlle('Register')
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
            <h2 className='text-3xl font-medium text-center mb-5'>Create new account</h2>
            <input type="text" placeholder="Enter your name" {...register("userName")} className={`${isDarkMode ? 'text-stone-600' : ''} input input-bordered w-full`} required />
            <input type="email" placeholder="Enter your email" {...register("userEmail")} className={`${isDarkMode ? 'text-stone-600' : ''} input input-bordered w-full`} required />
            <div className="relative">
                <input type={`${showPass ? 'text' : 'password'}`} placeholder="Enter your password" {...register("password", { pattern: /^(?=.*[A-Z])(?=.*[!@#$&*]).{6,}$/ })} className={`${isDarkMode ? 'text-stone-600' : ''} input input-bordered w-full z-10`} />
                {errors.password && <span className="text-red-600">This password should be 6 character. At least one uppercase and one special charecter</span>}
                <div className="absolute top-4 right-2 z-50 text-black text-xl" onClick={() => setShowPass(!showPass)}>
                    {
                        showPass ?
                            <FaEye />
                            : <FaEyeSlash />
                    }
                </div>
            </div>
            <div className="relative">
                <input type={`${showCmPass ? 'text' : 'password'}`} placeholder="Enter your password" {...register("confirmPassword")} className={`${isDarkMode ? 'text-stone-600' : ''} input input-bordered w-full z-10`} />
                <div className="absolute top-4 right-2 z-50 text-black text-xl" onClick={() => setShowCmPass(!showCmPass)}>
                    {
                        showCmPass ?
                            <FaEye />
                            : <FaEyeSlash />
                    }
                </div>
            </div>
            <input type="url" placeholder="image url" {...register("image")} className={`${isDarkMode ? 'text-stone-600' : ''} input input-bordered w-full`} required />
            <button className='btn btn-primary px-16 rounded-full w-full' type='submit'>Sign up</button>
        </form >
    );
};

export default SignUp;