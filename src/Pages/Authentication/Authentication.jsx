import { useState } from 'react';
import Lottie from "lottie-react";
import animation from "../../assets/AuthAnimation.json"
import SignUp from '../../Components/Auth/SignUp';
import SignIn from '../../Components/Auth/SignIn';
import { FcGoogle } from "react-icons/fc";
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import axios from 'axios';
import useTheme from '../../Hooks/useTheme';
import Loader from '../../Components/Shared/Loader/Loader';

const Authentication = () => {
    const { isDarkMode } = useTheme();
    const [loading, setLoading] = useState(false)
    const { continueWithGoogle, showError } = useAuth();
    const [isNew, setIsNew] = useState(false);
    const handleGoogleLogin = () => {
        continueWithGoogle().then((result) => {
            const user = result.user;
            if (user) {
                const userData = {
                    userName: user.displayName,
                    userEmail: user.email,
                    image: user.photoURL,
                    role: 'student'
                }
                axios.post(`https://assignment-12-server-chi-wheat.vercel.app/addUser/`, userData)
                    .then(data => {
                        if (data.data.insertedId || data.data.available) {
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Successfully Login',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }
                    }).catch(error => {
                        showError(error.message)
                    })
            }
        })
            .catch(error => {
                showError(error.message)
            })
    }
    if (loading) {
        return <Loader />
    }
    return (
        <div className={`${isDarkMode ? 'bg-stone-950 text-base-100' : 'bg-base-100'}`}>
            <div className='container mx-auto grid grid-cols-5 gap-10 items-center h-screen'>
                <div className='col-span-3'>
                    <Lottie animationData={animation} loop={true} />
                </div>
                <div className={`border border-primary px-16 py-10 rounded-2xl space-y-5 col-span-2 ${isDarkMode ? 'bg-stone-800' : 'bg-base-100'}`}>
                    {
                        isNew ? <SignUp setLoading={setLoading} /> : <SignIn setLoading={setLoading} />
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
        </div>
    );
};

export default Authentication;