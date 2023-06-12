import { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { app } from '../Firebase/firebase.config';
import Swal from 'sweetalert2';
import axios from 'axios';

export const AuthContext = createContext(null)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = () => {
        return signOut(auth)
    }
    const continueWithGoogle = () => {
        return signInWithPopup(auth, googleProvider)
    }
    const showError = (props) => {
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${props}`,
        })
    }
    const authInfo = {
        user,
        loading,
        signUp,
        signIn,
        logOut,
        continueWithGoogle,
        showError
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setUser(user)
            if (user) {
                axios.post('http://localhost:5000/jwt', { email: user.email })
                    .then(data => {
                        localStorage.setItem('access-token', data.data)
                        setLoading(false)
                    })
            } else {
                localStorage.removeItem('access-token')
                setLoading(false)
            }
        })
        return () => {
            return unsubscribe();
        }
    }, [auth])
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;