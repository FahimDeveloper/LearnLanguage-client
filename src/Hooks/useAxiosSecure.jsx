import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: 'https://assignment-12-server-chi-wheat.vercel.app'
})
const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        axiosSecure.interceptors.request.use(config => {
            const token = localStorage.getItem('access-token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
        })
        axiosSecure.interceptors.response.use(res => res, async (error) => {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                await logOut()
                navigate('/authentication');
            }
            return Promise.reject(error)
        })
    }, [logOut, navigate])
    return [axiosSecure]
};

export default useAxiosSecure;