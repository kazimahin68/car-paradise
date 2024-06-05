import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase.config";
import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext(null)
const auth = getAuth(app)


const AuthProvider = ({children}) => {

    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState(" ");
    const [loading, setLoading] = useState(false);
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    };

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    };

    const UserLogin = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () =>{
        return signOut(auth);
    }

    const updateUserProfile = (name, photo) =>{
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if(currentUser){
                axios.post("http://localhost:5000/jwt", {email: currentUser.email})
                .then(data => {
                    localStorage.setItem("access-token", data.data.token)
                    setLoading(false)
                })
            }
            else{
                localStorage.removeItem("access-token")
            }
        })
        return () => {
            return unsubscribe;
        }
    }, [])
    const authInfo = {
        user,
        createUser,
        UserLogin,
        loading,
        googleLogin,
        updateUserProfile,
        logOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default AuthProvider;