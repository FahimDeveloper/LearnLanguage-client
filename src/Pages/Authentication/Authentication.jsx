import { useState } from 'react';
import Lottie from "lottie-react";
import animation from "../../../public/AuthAnimation.json"
import SignUp from '../../Components/Auth/SignUp';
import SignIn from '../../Components/Auth/SignIn';
import { FcGoogle } from "react-icons/fc";
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';

const Authentication = () => {
    const { continueWithGoogle } = useAuth();
    const [isNew, setIsNew] = useState(false);
    const handleGoogleLogin = () => {
        continueWithGoogle().then((result) => {
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
        })
        // .catch(error => {
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'Oops...',
        //         text: `${error.message}`,
        //     })
        // })
    }
    return (
        <div className='container mx-auto grid grid-cols-2 gap-10 items-center h-screen'>
            <div>
                <Lottie animationData={animation} loop={true} />
            </div>
            <div className='border px-16 py-10 rounded-2xl space-y-5'>
                {
                    isNew ? <SignUp /> : <SignIn />
                }
                <div onClick={handleGoogleLogin} className='flex gap-2 items-center cursor-pointer border rounded-full justify-center py-1'>
                    Continue With Google <FcGoogle className='text-3xl' />
                </div>
                <div className='text-center'>
                    {
                        isNew ? <p>Already Have an account? please <span className='cursor-pointer underline text-blue-400' onClick={() => setIsNew(!isNew)}>Login</span></p>
                            : <p>Do not Have an account? please <span className='cursor-pointer underline text-blue-400' onClick={() => setIsNew(!isNew)}>Register</span></p>
                    }
                </div>
            </div>
        </div>
    );
};

export default Authentication;